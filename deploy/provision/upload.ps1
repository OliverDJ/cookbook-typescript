Param(
    [parameter(mandatory=$true)][string]$appname,
    [parameter(mandatory=$true)][string]$pathtozip,
    [parameter(mandatory=$true)][string]$resourcegroup,
    [parameter(mandatory=$true)][string]$subscription
)

    
Write-Host "Deploying $zip"
$deploy = az webapp deployment source config-zip -n $appname --src $pathtozip -g $resourcegroup --subscription $subscription --query "status"
# status 4 = success - status 3 = failed
if ([string]$deploy -ne '4') 
{ 
    Write-Error "Deployment Failed, see https://$appname.scm.azurewebsites.net/zipdeploy for details"; 
    EXIT 1 
} 

Write-Host "Successfully deployed $appname"