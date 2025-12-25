
# PowerShell script to zip project for supervisor review

try {
    # Get the current directory name for the zip file
    $currentPath = Get-Location
    $projectName = Split-Path -Leaf $currentPath
    $timestamp = Get-Date -Format 'yyyy-MM-dd_HH-mm-ss'
    $zipFileName = "${projectName}_${timestamp}.zip"

    Write-Host "Starting project zip creation..." -ForegroundColor Green
    Write-Host "Project: $projectName" -ForegroundColor Cyan
    Write-Host "Zip file: $zipFileName" -ForegroundColor Cyan

    # Define files and folders to exclude
    $excludeItems = @(
        "target"
        "build" 
        "node_modules"
        ".git"
        ".idea"
        ".vscode"
        "logs"
        "temp"
        "out"
        "bin"
        ".gradle"
        "temp_project_copy"
    )

    $excludeExtensions = @("*.class", "*.log", "*.tmp", "*.jar", "*.war", "*.ear", "*.iml")

    Write-Host "Excluded folders: $($excludeItems -join ', ')" -ForegroundColor Yellow
    Write-Host "Excluded file types: $($excludeExtensions -join ', ')" -ForegroundColor Yellow

    # Create temp directory
    $tempDir = "temp_project_copy"
    if (Test-Path $tempDir) {
        Remove-Item $tempDir -Recurse -Force -ErrorAction SilentlyContinue
    }
    New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

    Write-Host "Copying project files..." -ForegroundColor Blue

    # Copy files with filtering
    Get-ChildItem -Path . -Recurse -Force | Where-Object {
        $item = $_
        $shouldInclude = $true
        
        # Skip if it's in temp directory
        if ($item.FullName -like "*$tempDir*") {
            return $false
        }
        
        # Check excluded folders
        foreach ($excludeItem in $excludeItems) {
            if ($item.FullName -like "*\$excludeItem" -or $item.FullName -like "*\$excludeItem\*" -or $item.Name -eq $excludeItem) {
                $shouldInclude = $false
                break
            }
        }
        
        # Check excluded extensions
        if ($shouldInclude) {
            foreach ($ext in $excludeExtensions) {
                if ($item.Name -like $ext) {
                    $shouldInclude = $false
                    break
                }
            }
        }
        
        return $shouldInclude
    } | ForEach-Object {
        $sourcePath = $_.FullName
        $relativePath = $sourcePath.Substring($currentPath.Path.Length).TrimStart('\')
        $destPath = Join-Path $tempDir $relativePath
        
        if ($_.PSIsContainer) {
            # Create directory
            if (-not (Test-Path $destPath)) {
                New-Item -ItemType Directory -Path $destPath -Force | Out-Null
            }
        } else {
            # Create parent directory if needed
            $parentDir = Split-Path $destPath -Parent
            if (-not (Test-Path $parentDir)) {
                New-Item -ItemType Directory -Path $parentDir -Force | Out-Null
            }
            # Copy file
            Copy-Item $sourcePath $destPath -Force
        }
    }

    Write-Host "Creating zip archive..." -ForegroundColor Blue
    
    # Remove existing zip if present
    if (Test-Path $zipFileName) {
        Remove-Item $zipFileName -Force
    }
    
    # Create zip
    Compress-Archive -Path "$tempDir\*" -DestinationPath $zipFileName -CompressionLevel Optimal

    # Clean up
    Remove-Item $tempDir -Recurse -Force

    # Show results
    if (Test-Path $zipFileName) {
        $zipFile = Get-Item $zipFileName
        $sizeInMB = [math]::Round($zipFile.Length / 1MB, 2)
        
        Write-Host ""
        Write-Host "SUCCESS!" -ForegroundColor Green
        Write-Host "File: $($zipFile.Name)" -ForegroundColor White
        Write-Host "Size: ${sizeInMB} MB" -ForegroundColor White
        Write-Host "Path: $($zipFile.FullName)" -ForegroundColor White
        
        # Open folder
        $response = Read-Host "`nOpen containing folder? (y/n)"
        if ($response -match '^[Yy]') {
            Start-Process "explorer.exe" -ArgumentList "/select,`"$($zipFile.FullName)`""
        }
        
        Write-Host "`nProject ready for supervisor!" -ForegroundColor Cyan
    } else {
        Write-Host "ERROR: Zip file was not created!" -ForegroundColor Red
    }

} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Line: $($_.InvocationInfo.ScriptLineNumber)" -ForegroundColor Red
    
    # Clean up on error
    if (Test-Path "temp_project_copy") {
        Remove-Item "temp_project_copy" -Recurse -Force -ErrorAction SilentlyContinue
    }
}

# Pause to see results
Read-Host "`nPress Enter to exit"