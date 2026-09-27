# ============================================================
# ETAPA 1
# Construir la aplicación
# ============================================================

FROM node:22-alpine AS builder

WORKDIR /app


# Dependencias
COPY package.json ./

RUN npm install


# Código
COPY index.html ./
COPY src ./src


# Construir aplicación
RUN npm run build



# ============================================================
# ETAPA 2
# Servidor final
# ============================================================

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
