WORKING_DIR=dist/libs/$1

PACKAGE_NAME=$(jq -r '.name // "" | select(. != "") // ""' $WORKING_DIR/package.json)
LAST_VERSION=$(npm view $PACKAGE_NAME .version --silent || echo '0.0.0')
CURRENT_VERSION=$(jq -r '.version // "" | select(. != "") // ""' $WORKING_DIR/package.json)

if [ "$LAST_VERSION" != "$CURRENT_VERSION" ]; then
    npm publish --access public $WORKING_DIR
else
    echo "$PACKAGE_NAME@$CURRENT_VERSION has been already published. will do nothing."
fi
