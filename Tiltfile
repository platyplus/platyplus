load('ext://hasura', 'hasura')
load('ext://hasura', 'hasura_console')
load('./tools/tilt/hasura_backend_plus.Tiltfile', 'hasura_backend_plus')

hasura(path='./apps/hasura', tag='v2.0.8', console=False)
hasura_backend_plus()
hasura_console(path='./apps/hasura', wait_for_services=['http://localhost:9000/healthz'])
local_resource('nx', serve_cmd='nx serve', links=[
               link('http://localhost:4200/', 'Frontend')],)

