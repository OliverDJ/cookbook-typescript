import sys
import subprocess
import re
import datetime
from datetime import date
import json
import os
from os.path import dirname, abspath
subprocess.check_call([sys.executable, "-m", "pip", "install", "pydriller"])
from pydriller import RepositoryMining

master_branch = sys.argv[1]
dev_branch = sys.argv[2]
commit_message = sys.argv[3]

subprocess.call(["git", "config", "user.email", "sterling.mallory.archer@if.no"], shell=True)
subprocess.call(["git", "config", "user.name", "Sterling Archer"], shell=True)

def bump_version():
    version_type = "patch"
    if "patch" in commit_message:
        version_type = "patch"
    elif "minor" in commit_message:
        version_type = "minor"
    elif "major" in commit_message:
        version_type = "major"
    else:
        print("Merge commit into master does not include SemVer version value [patch|minor|major]!")
        print("Defaulting to patch")

    subprocess.call(["git", "checkout", master_branch, "-f"], shell=True)  
    subprocess.call(["npm", "version", version_type, "--no-commit-hooks", "-m", "chore: bump version to %s [skip ci]", "--force"], shell=True)  
    subprocess.call(["git", "push", "--tags"], shell=True)  
    subprocess.call(["git", "push", "-f"], shell=True)  

def get_version_from_package_json():
    with open(dirname(dirname(abspath(__file__))) + "\\package.json") as f:
        data = json.load(f)
        if data is not None:
            if "version" in data:
                return data["version"]
    f.close()
    return None

def retrieve_devOps_tag_from_commit_message(message):
    devOpsUrl = "https://dev.azure.com/waypoint-azure/HealthHub/_workitems/edit/"
    tasks = re.findall("#(\d+)", message)
    if not tasks:
        return message

    tasks = set(tasks)
    for task in tasks:
        devOpsUrlWithTask = devOpsUrl + task
        message = re.sub("(#{})\\b".format(task), "[#{task}]({url})", message)
        message = message.format(task = task, url = devOpsUrlWithTask)

    return message 
    
def build_commit_list():
    bump_message = "chore: bump version to"
    changelog_message = "chore: add changelog for"
 
    commits = []
    for commit in RepositoryMining(
        "", only_no_merge=True, order="reverse"
    ).traverse_commits():
        if bump_message in commit.msg or changelog_message in commit.msg:
            break

        commit_dump = (
            commit.committer_date.strftime("%d/%m/%Y")
            + " - "
            + commit.committer.name 
            + " - "
            + retrieve_devOps_tag_from_commit_message(commit.msg)
        )
        commits.append(commit_dump)
    
    return commits

def build_and_publish_changelog(commits):
    if not os.path.exists("./changelogs"):
        os.makedirs("./changelogs")

    version = get_version_from_package_json()
    if version is not None:
        file = open("./changelogs/{}.md".format(version), "w+")
        file.write("Version: **{}** <br/>Date: **{}**<br/> ------------------------------------------- <br/>".format(version, date.today().strftime("%d/%m/%Y")))
        for commit in commits:
            file.write(commit + "<br/>")
        file.close()

        os.system("git checkout " + master_branch)
        os.system("git add changelogs/*")
        subprocess.call(["git", "commit", "-m", "chore: add changelog for {} [skip ci]".format(version), "--no-verify"], shell=True)
        os.system("git push")

def merge_master_to_dev():
    subprocess.call(["git", "checkout", dev_branch], shell=True)  
    subprocess.call(["git", "merge", "--no-verify", master_branch], shell=True)  
    subprocess.call(["git", "push"], shell=True)

commits = build_commit_list()
bump_version()
build_and_publish_changelog(commits)
merge_master_to_dev()