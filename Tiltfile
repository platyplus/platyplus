load('ext://hasura', 'hasura')
load('./tools/tilt/hasura_backend_plus.Tiltfile', 'hasura_backend_plus')

hasura(path='./hasura', tag='v2.0.8')
hasura_backend_plus()
local_resource('nx', serve_cmd='nx serve', links=[
               link('http://localhost:4200/', 'Frontend')],)
