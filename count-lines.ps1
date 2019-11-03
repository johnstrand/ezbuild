Get-ChildItem *.ts* -Recurse -Path src | ForEach-Object { [PSCustomObject]@{ 
        lines = (get-content $_.FullName | measure-object -line).lines
        file  = $_ 
    } } | Sort-Object -Property lines -Descending
