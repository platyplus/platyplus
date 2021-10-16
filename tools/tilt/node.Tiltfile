
# * Load extensions
load('ext://helm_remote', 'helm_remote')

# TODO either helm_remote or helm local e.g. chart_path='' (if empty, then go for helm_remote)


def extraEnvValues(envs):
    result = []
    index = 0
    for (key, value) in envs.items():
        result.append('extraEnv[{}].name={}'.format(index, key))
        result.append('extraEnv[{}].value={}'.format(index, value))
        index += 1
    return result


def node(release_name='',
         path='.',
         name='node',
         dockerfile=None,
         host_port=4200,
         container_port=4200,
         env={},
         global_packages=[],
         install_command='yarn',
         entrypoint='yarn start',
         yaml='',
         ignore=[],
         only=[]
         ):
    image = '{}/{}'.format(release_name, name) if release_name else name
    dockerfile_kwarg = {}

    if dockerfile:
        dockerfile_kwarg['dockerfile'] = dockerfile
    else:
        docker_build(
            'local.tilt.dev/{}-deps'.format(name),
            '.',
            dockerfile_contents='\n'.join(['FROM node:14-alpine',
                                          'WORKDIR /app',
                                           '' if len(global_packages) == 0 else 'RUN npm i -g {}'.format(
                                               ' '.join(global_packages)),
                                           'COPY package.json yarn.lock* package-lock.json* ./',
                                           'RUN {}'.format(install_command)]),
            live_update=[sync(os.path.join(path, 'package.json'), '/app/package.json'),
                         sync(os.path.join(path, 'yarn.lock'), '/app/yarn.lock'),
                         sync(os.path.join(path, 'package-lock.json'),
                              '/app/package-lock.json'),
                         run('cd /app && {}'.format(install_command), trigger=[
                             './package.json', './yarn.lock', './package-lock.json']), ],
            ignore=ignore + ['node_modules', 'dist'],
            only=only
        )
        dockerfile_kwarg['dockerfile_contents'] = 'FROM local.tilt.dev/{}-deps\nCOPY . ./'.format(
            name)
    docker_build(image, '.',
                 entrypoint=entrypoint,
                 live_update=[
                     sync('.', '/app'),
                     # run('cd /app && {}'.format(install_command), trigger=[
                     #     './package.json', './yarn.lock', './package-lock.json']),
                 ],
                 ignore=ignore + ['node_modules', 'dist'],
                 only=only,
                 **dockerfile_kwarg)

    resource_name = '{}-{}'.format(release_name,
                                   name) if release_name else name
    if yaml:
        k8s_yaml(yaml)
    else:
        helm_remote('standard-service',
                    repo_url='https://charts.platy.plus',
                    release_name=release_name,
                    set=['fullnameOverride={}'.format(resource_name),
                         'targetPort={}'.format(container_port),
                         'image={}'.format(image)
                         ] + extraEnvValues(env)
                    )

    k8s_resource(resource_name,
                 port_forwards='{}:{}'.format(host_port, container_port))
