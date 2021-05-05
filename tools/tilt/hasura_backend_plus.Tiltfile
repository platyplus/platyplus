
# * Load extensions
load('ext://helm_remote', 'helm_remote')


def hasura_backend_plus(release_name='',
                        path=None,
                        dockerfile=None,
                        resource_name='hasura-backend-plus',
                        port=9000,
                        tag='latest',
                        hasura_endpoint='http://hasura:8080/v1/graphql',
                        # ? change hbp helm chart so we can set an existing secret path in values.yaml ?
                        hasura_secret='hasura-dev-secret',
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
                    repo_url='https://charts.platy.dev',
                    release_name=release_name,
                    set=['image={}'.format(hbp_image),
                         'hasura.enabled=false',
                         'hasura.endpoint={}'.format(
                        hasura_endpoint),
                        'hasura.adminSecret={}'.format(
                        hasura_secret),
                        'minio.enabled=false',  # TODO enable storage
                        'storage.enabled=false'  # TODO enable minio
                    ]
                    )
