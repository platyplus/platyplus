load('ext://hasura', 'hasura')
load('ext://hasura', 'hasura_console')
load('ext://uibutton', 'cmd_button')
load('ext://helm_remote', 'helm_remote')
load('./tools/tilt/hasura_backend_plus.Tiltfile', 'hasura_backend_plus')

hasura(path='./apps/hasura', tag='v2.0.8', console=False)
hasura_backend_plus()
hasura_console(path='./apps/hasura', wait_for_services=['http://localhost:9000/healthz'])


config.define_bool("production")
cfg = config.parse()
if cfg.get('production', False):
    local_resource('web', serve_cmd='yarn build:local && yarn start:local', links=[
               link('http://localhost:8088/', 'Frontend')],)
    cmd_button('build-production',
                argv=['sh', '-c', 'yarn build:local'],
                resource='web',
                icon_name='build',
                text='Rebuild',
    )
else:
    # local_resource('web', serve_cmd='nx serve', links=[
    #     link('http://localhost:4200/', 'Frontend')])


    # Dev mode through helm/docker
    docker_build(
    'local.tilt.dev/nx',
    '.',
    build_args={'node_env': 'development'},
    dockerfile='Dockerfile.nx',
    entrypoint='yarn start',
        live_update=[
            sync('.', '/app'),
            run('cd /app && yarn install', trigger=['./package.json', './yarn.lock'])
            # TODO webpack
            # if all that changed was start-time.txt, make sure the server
            # reloads so that it will reflect the new startup time
            # run('touch /app/index.js', trigger='./start-time.txt'),

            # add a congrats message!
            # run('sed -i "s/Hello cats!/{}/g" /app/views/index.mustache'.
            #     format(congrats))
        ])
    helm_remote('standard-service',
                repo_url='https://charts.platy.plus',
                set=['imageConfig.repository=local.tilt.dev/nx',
                    'targetPort=4200',
                    'imageConfig.tag=latest']
                )

    k8s_resource('standard-service',
                    new_name='frontend',
                    port_forwards='4200:4200',
                    links=[link('http://localhost:4200/', 'App')])


