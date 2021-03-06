Param(
    [parameter(mandatory=$true)][string]$ApplicationName,
    [parameter(mandatory=$true)][string]$HostName,
    [parameter(mandatory=$true)][string]$PfxFilePath,
    [parameter(mandatory=$true)][string]$PfxPassword,
    [parameter(mandatory=$true)][string]$ResourceGroup
)


function addHostName([string]$webappname, [string]$hostname, [string]$rgroup) {
    write-host "`nAdding hostname: $hostname to application: $webappname`n"
    Set-AzureRmWebApp -HostNames $hostname -ResourceGroupName $rgroup -Name $webappname
}

function uploadAndBindCertificate([string]$webappname,[string]$hostname, [string]$pfxFile, [string]$pfxPassword, [string]$rgroup ){
    Write-Host "`nBinding $webappname to $hostname with $pfxFile`n"
    New-AzureRmWebAppSSLBinding `
        -WebAppName $webappname `
        -Name $hostname `
        -CertificateFilePath $pfxFile `
        -CertificatePassword $pfxPassword `
        -ResourceGroupName $rgroup `
        -SslState SniEnabled 
}

$t1 = addHostName $ApplicationName $HostName $ResourceGroup
$t2 = uploadAndBindCertificate $ApplicationName $HostName $PfxFilePath $PfxPassword $ResourceGroup