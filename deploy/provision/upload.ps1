Param(
    [parameter(mandatory=$true)][string]$Application,
    [parameter(mandatory=$true)][string]$PathToZip,
    [parameter(mandatory=$true)][string]$ResourceGroup,
    [parameter(mandatory=$true)][string]$Subscription
)

    
Write-Host "Deploying $zip"
$deploy = az webapp deployment source config-zip -n $Application --src $PathToZip -g $ResourceGroup --subscription $Subscription --query "status"
# status 4 = success - status 3 = failed
if ([string]$deploy -ne '4') 
{ 
    Write-Error "Deployment Failed, see https://$Application.scm.azurewebsites.net/zipdeploy for details"; 
    EXIT 1 
} 

Write-Host "Successfully deployed $Application"