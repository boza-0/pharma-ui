# TREE SNAPSHOT (positive selection, tolerant)
# - All folders and files listed when accessible
# - File contents shown only when explicitly selected
# - Folder contents shown only when explicitly selected (recursive)
# - Selection may occur by exact folder name, exact file name, or file extension
# - Non-selected folders are listed but not expanded
# - Non-selected files are listed but contents are not shown
# - Unreadable folders/files are marked, never crash traversal
# - Reparse points (symlinks/junctions) are shown but not expanded
# - Prevents infinite recursion via visited-directory tracking

$root = '.'

# Folders whose CONTENTS should be included (recursive)
$IncludeFolders = @(

)

# Files whose CONTENTS should be included
$IncludeFiles = @(
  'api.servic'
)

# File extensions whose CONTENTS should be included (case-insensitive)
$IncludeFileExtensions = @(
  '.js'
)

# Track visited directories to prevent loops
$VisitedDirs = New-Object 'System.Collections.Generic.HashSet[string]' ([System.StringComparer]::OrdinalIgnoreCase)

function Get-SafeLineCount {
  param([string]$filePath)

  $count = 0
  try {
    Get-Content -LiteralPath $filePath -ErrorAction Stop -ReadCount 2000 |
      ForEach-Object { $count += $_.Count }
    return $count
  }
  catch {
    return 0
  }
}

function Show-Tree {
  param(
    [string]$path,
    [string]$indent = '',
    [bool]$InsideIncludedFolder = $false
  )

  $fullPath = $null
  try {
    $fullPath = (Resolve-Path -LiteralPath $path -ErrorAction Stop).Path
  }
  catch {
    $fullPath = $path
  }

  if (-not $VisitedDirs.Add($fullPath)) {
    Write-Output ("{0}  | <REVISIT SKIPPED>" -f $indent)
    return
  }

  $items = $null
  try {
    $items = Get-ChildItem -LiteralPath $path -ErrorAction Stop
  }
  catch {
    $msg = $_.Exception.Message
    Write-Output ("{0}  | <UNABLE TO ACCESS DIRECTORY: {1}>" -f $indent, $msg)
    return
  }

  $items |
    Sort-Object @{Expression={$_.PSIsContainer};Descending=$true}, Name |
    ForEach-Object {

      if ($_.PSIsContainer) {
        Write-Output ("{0}{1}/" -f $indent, $_.Name)

        if (($_.Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0) {
          Write-Output ("{0}  | <REPARSE POINT: NOT EXPANDED>" -f $indent)
          return
        }

        $isIncludedFolder = $InsideIncludedFolder -or ($IncludeFolders -contains $_.Name)

        if (-not $isIncludedFolder) {
          Write-Output ("{0}  | <NOT SELECTED: FOLDER>" -f $indent)
          return
        }

        Show-Tree -path $_.FullName -indent ($indent + '  ') -InsideIncludedFolder $true
      }
      else {
        $lineCount = Get-SafeLineCount -filePath $_.FullName
        Write-Output ("{0}{1} (lines: {2})" -f $indent, $_.Name, $lineCount)

        $extension = [IO.Path]::GetExtension($_.Name)

        $isIncludedFile =
          $InsideIncludedFolder -or
          ($IncludeFiles -contains $_.Name) -or
          ($IncludeFileExtensions -contains $extension)

        if (-not $isIncludedFile) {
          Write-Output ("{0}  | <NOT SELECTED: FILE>" -f $indent)
          return
        }

        try {
          Write-Output ("{0}  | <BEGIN FILE CONTENT>" -f $indent)

          Get-Content -LiteralPath $_.FullName -ErrorAction Stop |
            ForEach-Object {
              Write-Output ("{0}  | {1}" -f $indent, $_)
            }

          Write-Output ("{0}  | <END FILE CONTENT>" -f $indent)
        }
        catch {
          $msg = $_.Exception.Message
          Write-Output ("{0}  | <UNABLE TO READ FILE: {1}>" -f $indent, $msg)
        }
      }
    }
}

Write-Output ($root + '/')
Show-Tree -path $root
