Param(
    [parameter(mandatory=$true)][string]$Output,
    [parameter(mandatory=$true)][string]$Artifact,
    [parameter(mandatory=$true)][string]$ResourceGroup,
    [parameter(mandatory=$true)][string]$Subscription
)

function Is-Numeric ($Value) {
    return $Value -match "^[\d\.]+$"
}

function tryAddToZip([string]$ZIPFileName, [string]$NewFileToAdd ){
    try {
    $path = Get-Location
    [Reflection.Assembly]::LoadWithPartialName('System.IO.Compression.FileSystem') | Out-Null
    $zip = [System.IO.Compression.ZipFile]::Open("$ZIPFileName","Update")
    $FileName = [System.IO.Path]::GetFileName($NewFileToAdd)
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, "$NewFileToAdd",$FileName,"Optimal") | Out-Null
    $Zip.Dispose()
    Write-Host "Successfully added $NewFileToAdd to $ZIPFileName "
    } catch {
    Write-Warning "Failed to add $NewFileToAdd to $ZIPFileName . Details : $_"
    }
}

function getInstrumentationKey([string]$rgroup, [string]$sub){
    $type = "Microsoft.Insights/components"
    $li = az resource list -g $rgroup --subscription $sub --resource-type $type | ConvertFrom-Json
    $ai = $li[0]
    $appInsightName = ($ai).name
    $r = az resource show -n $appInsightName -g $rgroup --subscription $sub --resource-type $type | ConvertFrom-Json
    $InstrumentationKey = ($r).properties.InstrumentationKey
    return $InstrumentationKey
}

function addValueToString([string]$acc, [string]$key, [object]$value ){
    if(Is-Numeric $value){$acc += "`t `"$key`" : $value,`n"}
    else{$acc += "`t `"$key`" : `"$value`",`n"}
    return $acc
}

function generateJavaScriptCode(){ #[string]$instrumentationKey){
    $PREPREFIX="REACT_"
    $PREFIX = "$PREPREFIX*"
    $secrets = Get-ChildItem env:${PREFIX}
    $string = "var configuration = { `n"
    foreach ($item in ${secrets}) {
        $newkey = $item.Key.Replace($PREPREFIX, "")
        $value =  $item.Value
        $string = addValueToString $string $newkey $value 
    }
    # $string += "`t `"INSTRUMENTATION_KEY`" : `"$instrumentationKey`" "
    $string += "`n}"
    return $string
}



# $ik = getInstrumentationKey $resourcegroup $subscription
$javaScript = generateJavaScriptCode #$ik

write-host "$javaScript"
$javaScript | Set-Content -Path $output 
tryAddToZip $artifact $output 