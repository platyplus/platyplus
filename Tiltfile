load('ext://git_resource', 'git_checkout')
git_checkout('git@github.com:platyplus/tilt-modules.git')
load('.git-sources/tilt-modules/platyplus/Tiltfile', 'platyplus')

apps_path = './apps'

config.define_string("hasura")
config.define_string("frontend")

cfg = config.parse()

hasura_app = cfg.get('hasura', 'hasura')
frontend_app = cfg.get('frontend', 'platyplus')
entrypoint = 'yarn nx run {}:serve'.format(frontend_app) if frontend_app else 'yarn start'

platyplus(release_name='platyplus' if hasura_app == 'hasura' else hasura_app,
    hasura_path=os.path.join(apps_path, hasura_app), 
    frontend_path='.',
    entrypoint=entrypoint)

