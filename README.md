## Mini blog app with microservices

Installation

###### 1) Clone repository
###### 2) Install [minicube](https://minikube.sigs.k8s.io/docs/start/)
###### 3) Run *minikube addons enable ingress* to enable ingress-nginx
###### 4) Install [skaffold](https://skaffold.dev/docs/install/)
###### 5) Create a bash file named *kubectl* in *usr/local/bin* and add this contnent:
```bash
#!/bin/sh
exec minikube kubectl -- "$@"
```
###### 6) Run *chmod 755 kubectl* to change file permissions
###### 7) Run *skaffold dev* to start the project.
###### 8) Enter [project domain](http://posts.com/)

## The project contains:

1 - Post/comments/query/moderation services (Node JS apps).

2 - An event bus to handle all events (Node JS app). 

3 - A minimalist client app (React)

4 - All containers runs with docker

5 - An infrastructure folder for Deployment/Service/Ingress (k8s)

6 - A Skaffold for change detection in infrastructure folder and project files
