# TODO

- [ ] use traeffik with Skaffold (use xyz.localhost domains)
- [ ] how to manage 'system' helm charts e.g. traefik, cert-manager...
- [ ] Vetur errors -> monitor the new Vetur releases
- [ ] vite template -> serviceTypeConfig.command = "yarn create {{xyz}}"
- [ ] dev: use patches. Method patch(source, path, value) => if something in path then op=update else op=add (or something like that)
- [ ] hasura docker, helm & template
      -> listen to events through the skaffold http API
      -> serviceTypeConfig.hooks.ready/start [name of the event] = hasura console...
      -> `hasura console --admin-secret "<long complicated admin key>" --endpoint http://localhost:8080 --skip-update-check`
- [ ] hbp docker, helm & template
      -> problem: nested services, two distinct folders
- [ ] postgres docker, helm & template
- [ ] rabbitmq docker, helm & template?
- [ ] optimise generated dockerfiles - use common layers?
- [ ] move templates to the root folder
- [ ] rename config.yaml to platy.yaml (or .platy.yaml?)
