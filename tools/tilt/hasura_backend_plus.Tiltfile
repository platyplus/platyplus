
# * Load extensions
load('ext://helm_remote', 'helm_remote')


def hasura_backend_plus(release_name='',
                        path=None,
                        dockerfile=None,
                        resource_name='hasura-backend-plus',
                        hasura_service='hasura',
                        port=9000,
                        tag='2.7.1',
                        yaml=''
                        ):
    hbp_resource = '{}-{}'.format(release_name,
                                  resource_name) if release_name else resource_name
    if (path):
        hbp_image = '{}/hasura-backend-plus'.format(release_name)
        build_kwargs = {'dockerfile': dockerfile} if dockerfile else {
            'dockerfile_contents': 'FROM nhost/hasura-backend-plus:{}'.format(tag)}
        docker_build(hbp_image, '.',
                     live_update=[
                         sync(path,
                              '/app/custom')
                     ],
                     **build_kwargs)
    else:
        hbp_image = 'nhost/hasura-backend-plus:{}'.format(tag)

    k8s_resource(hbp_resource,
                 port_forwards='{}:3000'.format(port))

    # * Deploy Hasura-Backend-Plus Helm Chart
    if yaml:
        k8s_yaml(yaml)
    else:
        helm_remote('hasura-backend-plus',
                    repo_url='https://charts.platy.plus',
                    release_name=release_name,
                    set=['image={}'.format(hbp_image),
                         'hasura.enabled=false',
                         'storage.enabled=false',
                         'minio.enabled=false',  
                         'connect.hasura.enabled=true',
                         'connect.hasura.configMap={}'.format(hasura_service),
                         'connect.hasura.secret={}'.format(hasura_service),
                         'connect.hasura.postgresql.secret={}-postgresql'.format(hasura_service)
                         ]
                    )
