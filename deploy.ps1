$username = Read-Host "Enter your GitHub Username"
$repoName = "palak-portfolio"

# Clean up any old remote if it exists
git remote remove origin 2>$null

Write-Host "--- Linking to GitHub ---" -ForegroundColor Cyan
git remote add origin "https://github.com/$username/$repoName.git"
git branch -M main

Write-Host "--- Pushing to GitHub ---" -ForegroundColor Yellow
Write-Host "Note: If a window pops up, please log in to your GitHub account." -ForegroundColor Cyan
git push -u origin main

Write-Host "--- DONE! ---" -ForegroundColor Green
Write-Host "Your site is being deployed!" -ForegroundColor Cyan
Write-Host "Final Step: Go to https://github.com/$username/$repoName/settings/pages"
Write-Host "Under 'Branch', select 'main' and click Save."
