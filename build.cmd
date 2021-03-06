REM set FAKE_DETAILED_ERRORS=true
REM rem dotnet tool install fake-cli -g --version 5.1.0*
REM dotnet new tool-manifest --force
REM dotnet tool install fake-cli --configfile deploy\NuGet-OfficialOnly.config

REM dotnet fake run deploy\build.fsx -t Artifact
REM rem dotnet fake -v run deploy\build.fsx -t Artifact


@set FAKE_DETAILED_ERRORS=true
@SET scriptPath=%~dp0

dotnet new tool-manifest --force
@IF %ERRORLEVEL% NEQ 0 call :error "Tool manifest failed"

dotnet tool install fake-cli --configfile %scriptPath%\deploy\NuGet-OfficialOnly.config
@IF %ERRORLEVEL% NEQ 0 call :error "Fake-cli installation failed"

dotnet fake run %scriptPath%\deploy\build.fsx -t Artifact 
@IF %ERRORLEVEL% NEQ 0 call :error "Build failed"

@goto :end
:error 
@echo %~1
@if %CMDER_CONFIGURED% EQ 1 goto :end
@exit %ERRORLEVEL%
:end
@echo "Ended"