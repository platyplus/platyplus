
# * Load extensions
load('ext://helm_remote', 'helm_remote')


def hasura_backend_plus(release_name='',
                        path=None,
                        dockerfile=None,
                        resource_name='hasura-backend-plus',
                        hasura_service='hasura',
                        port=9000,
#  TODO to be sure to fetch last HBP image
                        tag='v2.6.1',
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
                         'connect.hasura.enabled=true',
                         'connect.hasura.configMap={}'.format(hasura_service),
                         'connect.hasura.secret={}'.format(hasura_service),
                         #  TODO to be sure to fetch last HBP image
                         'imageConfig.pullPolicy=Always',
                         # TODO https://github.com/nhost/hasura-backend-plus/issues/606
                         'auth.providers.redirect.success=BIDON',
                         'auth.providers.redirect.error=BIDON',
                         #  TODO https://github.com/nhost/hasura-backend-plus/issues/614
                         'serverUrl=http://localhost:4200',
                         # TODO update HBP Helm Chart
                         'extraEnv[0].name=DATABASE_URL',
                         'extraEnv[0].valueFrom.secretKeyRef.name=hasura-postgresql',
                         'extraEnv[0].valueFrom.secretKeyRef.key=databaseUrl',
                         #  TODO https://github.com/nhost/hasura-backend-plus/issues/609
                         'extraEnv[1].name=S3_ENDPOINT',
                         'extraEnv[1].value=bidon',
                         'extraEnv[2].name=S3_BUCKET',
                         'extraEnv[2].value=bidon',
                         'extraEnv[3].name=S3_ACCESS_KEY_ID',
                         'extraEnv[3].value=bidon',
                         'extraEnv[4].name=S3_SECRET_ACCESS_KEY',
                         'extraEnv[4].value=bidon',
                         # TODO update HBP Helm chart - anyway, bug in HBP, GRAVATAR_ENABLED is always true...
                         #  'extraEnv[5].name=GRAVATAR_ENABLED',
                         #  'extraEnv[5].value=false',
                         'minio.enabled=false',  # TODO enable storage
                         'storage.enabled=false'  # TODO enable minio
                         ]
                    )
