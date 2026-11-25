# Portal Frontend — GitOps con GitHub Actions, Helm y ArgoCD

Repositorio del portal web basado en **Module Federation** (shell + mf1). El pipeline construye y publica las imágenes Docker en DockerHub y actualiza automáticamente los valores de despliegue en la carpeta `gitops/`.

## Estructura

```
.
├── .github/workflows/deploy.yaml   # CI/CD: build, push y actualización GitOps
├── frontend/                        # Código fuente (shell, mf1 y librerías compartidas)
├── helm/portal-mf/                  # Chart de Helm genérico reutilizable
├── gitops/
│   ├── shell/values.yaml            # Valores de despliegue del shell
│   └── mf1/values.yaml             # Valores de despliegue del microfrontend
└── argocd/                          # Manifiestos de ArgoCD (Application)
```

## Pipeline

El workflow `deploy.yaml` se dispara en cada push a `main` (excepto cambios en `gitops/`):

1. **build-and-push** — construye la imagen Docker para `shell` y `mf1` y la sube a DockerHub con el SHA del commit como tag.
2. **update-gitops** — actualiza `image.tag` en los `values.yaml` de `gitops/` y hace commit con `[skip ci]` para evitar un bucle.

## Secrets requeridos en el repositorio

| Secret | Descripción |
|---|---|
| `DOCKERHUB_USERNAME` | Usuario de DockerHub |
| `DOCKERHUB_TOKEN` | Access token de DockerHub (Read & Write) |

## Despliegue con ArgoCD

Los manifiestos en `argocd/` apuntan a este repositorio. Con un clúster Kubernetes y ArgoCD instalado:

```bash
kubectl apply -f argocd/
kubectl -n argocd get applications
```

Ambas aplicaciones deben quedar en estado `Synced` y `Healthy`.

## Requisitos locales

- Node.js 18+
- Docker
- kubectl + kind (para pruebas locales con ArgoCD)
