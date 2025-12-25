param(
    [string]$Output = "$(Split-Path -Leaf (Get-Location)).zip",
    [int]$MaxSizeMB = 5,
    [string[]]$ExcludeDirs = @('node_modules', '.git', 'dist', 'build', '.cache', 'vendor', '.parcel-cache', 'coverage', '.vscode'),
    [string[]]$ExcludePatterns = @('*.log','*.mp4','*.mov','*.iso','*.exe','*.dll','*.zip','*.tar','*.tar.gz','*.psd'),
    [switch]$IncludeHidden
)

try {
    $ErrorActionPreference = 'Stop'

    $rootPath = (Get-Location).Path.TrimEnd('\','/')
    $maxBytes = $MaxSizeMB * 1MB

    Write-Host "Zipping project at: $rootPath"
    Write-Host "Output file: $Output"
    Write-Host "Excluding files larger than: $MaxSizeMB MB ($maxBytes bytes)"
    Write-Host "Excluding directories: $($ExcludeDirs -join ', ')"

    $outFull = Join-Path -Path $rootPath -ChildPath $Output
    if (Test-Path $outFull) {
        Write-Host "Removing existing zip: $outFull"
        Remove-Item -LiteralPath $outFull -Force
    }

    # Try to load the System.IO.Compression.FileSystem assembly in a robust way.
    try {
        Add-Type -AssemblyName System.IO.Compression.FileSystem -ErrorAction Stop | Out-Null
    }
    catch {
        try {
            [System.Reflection.Assembly]::LoadWithPartialName("System.IO.Compression.FileSystem") | Out-Null
        }
        catch {
            Write-Error "Failed to load System.IO.Compression.FileSystem assembly. Ensure .NET Framework 4.5+ is available or run in PowerShell Core. Original error: $_"
            exit 1
        }
    }

    # Try also to load System.IO.Compression assembly if available
    try {
        Add-Type -AssemblyName System.IO.Compression -ErrorAction Stop | Out-Null
    }
    catch {
        try { [System.Reflection.Assembly]::LoadWithPartialName("System.IO.Compression") | Out-Null }
        catch { }
    }

    # Proceed to create the zip; any missing types will be caught when attempting to create the ZipArchive

    $files = Get-ChildItem -Path $rootPath -Recurse -File -Force | Where-Object {
        # skip if hidden and not requested
        if (-not $IncludeHidden) {
            if ($_.Attributes -band [IO.FileAttributes]::Hidden) { return $false }
        }

        # get relative path
        $rel = $_.FullName.Substring($rootPath.Length + 1)
        $firstSegment = ($rel -split '[\\/]')[0]

        if ($ExcludeDirs -contains $firstSegment) { return $false }

        foreach ($pat in $ExcludePatterns) {
            if ($_.Name -like $pat) { return $false }
        }

        if ($_.Length -gt $maxBytes) { return $false }

        return $true
    }

    if (-not $files) {
        Write-Host "No files matched inclusion criteria. Aborting."
        exit 1
    }

    # Create the zip using FileStream + ZipArchive to avoid relying on extension methods
    $fileMode = [System.IO.FileMode]::Create
    $zipStream = [System.IO.File]::Open($outFull, $fileMode)
    try {
        # Use numeric enum value (1 = Create) to avoid dependency on the ZipArchiveMode type name
        $zipArchive = New-Object System.IO.Compression.ZipArchive($zipStream, 1, $false)
        try {
            foreach ($f in $files) {
                $relPath = $f.FullName.Substring($rootPath.Length + 1) -replace '\\','/'
                Write-Host "Adding: $relPath"
                $entry = $zipArchive.CreateEntry($relPath)
                $entryStream = $entry.Open()
                $fs = [System.IO.File]::OpenRead($f.FullName)
                try { $fs.CopyTo($entryStream) }
                finally { $fs.Close(); $entryStream.Close() }
            }
        }
        finally { $zipArchive.Dispose() }
    }
    finally { if ($zipStream) { $zipStream.Close() } }

    Write-Host "Zip created successfully: $outFull"
}
catch {
    Write-Error "An error occurred: $_"
    exit 1
}
