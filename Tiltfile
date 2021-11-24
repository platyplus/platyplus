# load('ext://git_resource', 'git_checkout')
# git_checkout('git@github.com:platyplus/tilt-modules.git')
# load('.git-sources/tilt-modules/platyplus/Tiltfile', 'platyplus')
load('../tilt-modules/platyplus/Tiltfile', 'platyplus')
load('../tilt-modules/platyplus/Tiltfile', 'frontend_image')

apps_path = './apps'

config.define_string("hasura")
config.define_string("frontend")
config.define_bool("production")

cfg = config.parse()

hasura_app = cfg.get('hasura', 'hasura')
frontend_app = cfg.get('frontend', 'platyplus')
production = cfg.get('production', False)

if (production):
    # TODO make it work for other frontend projects
    # 'yarn run build:local'
    # TODO change how to build. It seems tilt won't live update when the dist dir is removed and recreated
    local('CONFIG_FILE=local DEBUG=true yarn nx run {}:build-webpack'.format(frontend_app))
    platyplus(release_name='platyplus' if hasura_app == 'hasura' else hasura_app,
        hasura_path=os.path.join(apps_path, hasura_app), 
        frontend_build=True,
        frontend_path=None)
    docker_build(
        frontend_image,
        '.',
        dockerfile='apps/platyplus/Dockerfile',
        live_update=[
            sync('./dist/apps/{}'.format(frontend_app), '/usr/share/nginx/html')
        ])
else:
    entrypoint = 'yarn nx run {}:serve'.format(frontend_app) if frontend_app else 'yarn start'
    platyplus(release_name='platyplus' if hasura_app == 'hasura' else hasura_app,
        hasura_path=os.path.join(apps_path, hasura_app), 
        frontend_build=True,
        frontend_path='.',
        entrypoint=entrypoint)

