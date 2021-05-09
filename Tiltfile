load('./tools/tilt/hasura.Tiltfile', 'hasura')
load('./tools/tilt/hasura_backend_plus.Tiltfile', 'hasura_backend_plus')
load('./tools/tilt/node.Tiltfile', 'node')

hasura(path='./hasura', tag='v1.3.3')
hasura_backend_plus()
# node(name='frontend',
#      env={
#          'NEXT_PUBLIC_HBP_ENDPOINT': 'http://localhost:9000',
#          'NEXT_PUBLIC_HASURA_ENDPOINT': 'http://localhost:8080/v1/graphql'
#      },
#      global_packages=['@nrwl/cli'],
#      ignore=['hasura']
#      )
local_resource('nx', serve_cmd='nx serve',
               env={
                   'NEXT_PUBLIC_HBP_ENDPOINT': 'http://localhost:9000',
                   'NEXT_PUBLIC_HASURA_ENDPOINT': 'http://localhost:8080/v1/graphql'
               },

               links=[
                   link('http://localhost:4200/', 'Frontend')],)
