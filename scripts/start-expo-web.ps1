$project = Split-Path -Parent $PSScriptRoot
Set-Location $project

$env:__UNSAFE_EXPO_HOME_DIRECTORY = Join-Path $project ".expo-home"
$env:npm_config_cache = Join-Path $project ".npm-cache"
$env:EXPO_NO_TELEMETRY = "1"

& "C:\Program Files\nodejs\npm.cmd" run web -- --host localhost --port 8081 *> (Join-Path $project "expo-web.combined.log")

