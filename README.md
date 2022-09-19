## Mini blog app with microservices

Installation

###### 1) Clone repository

###### 2) Install [minikube](https://minikube.sigs.k8s.io/docs/start/)

###### 3) Run _minikube addons enable ingress_ to enable ingress-nginx

###### 4) Install [skaffold](https://skaffold.dev/docs/install/)

###### 5) Create a bash file named _kubectl_ in _usr/local/bin_ and add this contnent:

```bash
#!/bin/sh
exec minikube kubectl -- "$@"
```

###### 6) Run _chmod 755 kubectl_ to change file permissions

###### 7) Run _skaffold dev_ to start the project.

###### 8) Enter [project domain](http://posts.com/)

## The project contains:

1 - Post/comments/query/moderation services (Node JS apps).

2 - An event bus to handle all events (Node JS app).

3 - A minimalist client app (React)

4 - All containers runs with docker

5 - An infrastructure folder for Deployment/Service/Ingress (k8s)

6 - A Skaffold for change detection in infrastructure folder and project files
