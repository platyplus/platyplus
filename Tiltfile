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

# config.define_bool("production")
# cfg = config.parse()
# if cfg.get('production', False):
#     local_resource('web', serve_cmd='DEBUG=true yarn build:local && yarn start:local', links=[
#                link('http://localhost:8088/', 'Frontend')],)
#     cmd_button('build-production',
#                 argv=['sh', '-c', 'DEBUG=true yarn build:local'],
#                 resource='web',
#                 icon_name='build',
#                 text='Rebuild',
#     )
# else:
