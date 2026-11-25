# Dockerfile ÚNICO para shell y mf1.  Contexto de build: carpeta frontend/
#   docker build -f frontend/Dockerfile --build-arg APP=bbog-frontend-portal-mf1 frontend
ARG APP=bbog-frontend-portal-shell-main

# ---------- Etapa 1: compilar libs + app ----------
FROM node:20-alpine AS build
ARG APP
WORKDIR /work

# Las apps dependen de librerías locales ("file:../lib"), por eso se copian juntas
COPY bbog-commons-lib-secure-web-storage ./bbog-commons-lib-secure-web-storage
COPY bbog-commons-lib-frontend-event-bus ./bbog-commons-lib-frontend-event-bus
COPY ${APP} ./${APP}

RUN cd bbog-commons-lib-secure-web-storage && npm ci && npm run build
RUN cd bbog-commons-lib-frontend-event-bus && npm ci && npm run build
RUN cd ${APP} && npm ci && npx ng build --configuration production

# ---------- Etapa 2: nginx sin root (compatible con OpenShift) ----------
FROM nginxinc/nginx-unprivileged:1.27-alpine
ARG APP
COPY --from=build /work/${APP}/dist/${APP} /usr/share/nginx/html
# *.template se procesa con envsubst al arrancar (ej. ${MF1_URL})
COPY nginx/${APP}.conf.template /etc/nginx/templates/default.conf.template
EXPOSE 8080
