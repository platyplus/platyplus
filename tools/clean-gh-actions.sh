# * Depending on how many runs you have you’ll have to execute the delete step multiple times
# * because the GH API endpoints are paginated.
OWNER=platyplus
REPO=platydev

# list workflows
gh api -X GET /repos/$OWNER/$REPO/actions/workflows | jq '.workflows[] | .name,.id'

# copy the ID of the workflow you want to clear and set it
WORKFLOW_ID=8226728

# list runs
# gh api -X GET /repos/$OWNER/$REPO/actions/workflows/$WORKFLOW_ID/runs | jq '.workflow_runs[] | .id'

# delete all runs
gh api -X GET /repos/$OWNER/$REPO/actions/workflows/$WORKFLOW_ID/runs | jq '.workflow_runs[] | .id' | xargs -I{} gh api -X DELETE /repos/$OWNER/$REPO/actions/runs/{}