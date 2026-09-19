$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$logDir = Join-Path $PSScriptRoot "logs"

if (-not (Test-Path $logDir)) {
    New-Item -ItemType Directory -Path $logDir | Out-Null
}

Push-Location $repoRoot

try {
    Write-Host ""
    Write-Host "Freebot Voice AI Lab - Demo Verification"
    Write-Host "========================================"
    Write-Host ""

    if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
        throw "Node.js is not installed or not available in PATH."
    }

    if (-not (Test-Path "node_modules")) {
        Write-Host "Installing dependencies..."
        npm install
    }

    Write-Host "Node: $(node --version)"
    Write-Host "npm:  $(npm --version)"
    Write-Host ""

    $env:TWILIO_AUTH_TOKEN = "local-demo-test-token"
    $env:PUBLIC_BASE_URL = "http://127.0.0.1:3000"
    $env:ENABLE_OLLAMA = "false"

    Write-Host "Starting local test server..."
    $server = Start-Process -FilePath "npm" -ArgumentList "start" -PassThru -WindowStyle Hidden -RedirectStandardOutput (Join-Path $logDir "server-output.txt") -RedirectStandardError (Join-Path $logDir "server-error.txt")

    try {
        Start-Sleep -Seconds 3

        Write-Host ""
        Write-Host "Running application smoke tests..."
        npm test 2>&1 | Tee-Object -FilePath (Join-Path $logDir "smoke-test.txt")

        Write-Host ""
        Write-Host "Running signed webhook security tests..."
        npm run test:security 2>&1 | Tee-Object -FilePath (Join-Path $logDir "security-test.txt")

        Write-Host ""
        Write-Host "Verification complete."
        Write-Host "Saved logs:"
        Write-Host "  demo\logs\smoke-test.txt"
        Write-Host "  demo\logs\security-test.txt"
        Write-Host ""
        Write-Host "You can now capture terminal screenshots of the successful results."
    }
    finally {
        if ($server -and -not $server.HasExited) {
            Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue
        }
    }
}
finally {
    Remove-Item Env:TWILIO_AUTH_TOKEN -ErrorAction SilentlyContinue
    Remove-Item Env:PUBLIC_BASE_URL -ErrorAction SilentlyContinue
    Remove-Item Env:ENABLE_OLLAMA -ErrorAction SilentlyContinue
    Pop-Location
}
