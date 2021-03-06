#r "paket:
nuget Fake.Core.Target 
nuget Fake.IO.FileSystem
nuget Fake.IO.Zip
 //"
#load "./.fake/build.fsx/intellisense.fsx"

open Fake.Core
open Fake.IO
open Fake.Core.TargetOperators
open Fake.IO.Globbing.Operators

// Properties
let appName = "HealthHubUser"

// root/
let deployDir = __SOURCE_DIRECTORY__
let npmDir = sprintf "%s\\..\\" deployDir

// root/upload/
let buildDir = sprintf "%s\\build" deployDir
let provDir = sprintf "%s\\provision" deployDir

// Default target 
Target.create "Clean" (fun _ -> 
    Shell.cleanDir buildDir )

Target.create "Default" (fun _ ->
    Trace.trace "Hello World from FAKE" )

Target.create "BuildNode" (fun _ -> 
    let sc = sprintf "%s\\pipeline.cmd" deployDir
    Shell.Exec( sc, sprintf "%s %s" npmDir deployDir ) |> ignore
)

Target.create "Artifact" (fun _ ->
    let preZip = sprintf "%s\\preZip" buildDir
    let artifactDir = sprintf "%s\\artifacts" buildDir
    Shell.mkdir preZip
    Shell.mkdir artifactDir
    let artifactFilename = sprintf "%s\\%s.zip" artifactDir appName
    Shell.copyDir preZip (sprintf "%s\\build/" npmDir) (fun _ -> true)
    Shell.copyFile preZip (sprintf "%s\\web.config" npmDir) 
    !! (sprintf "%s/**/*.*" preZip)
    |> Zip.zip preZip artifactFilename
    Shell.copyDir artifactDir provDir (fun _ -> true)
)


// Dependencies
open Fake.Core.TargetOperators

"Clean"
    ==> "BuildNode"
    ==> "Artifact"
    ==> "Default"

// start build
Target.runOrDefault "Default"