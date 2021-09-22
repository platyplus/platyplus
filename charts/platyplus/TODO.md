"sed -i '' -e \"s/^\\(\\s*appVersion\\s*:\\s*\\).*/\\1 $(jq -r '.version' ./apps/platyplus/package.json)/\" charts/platyplus/Chart.yaml"
