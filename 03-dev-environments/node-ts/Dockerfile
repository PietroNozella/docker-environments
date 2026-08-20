# Dockerfile multi-stage para Node + TypeScript
#
# Estágio 1 (deps): instala dependências uma única vez
# Estágio 2 (build): compila TypeScript -> JavaScript (dist/)
# Estágio 3 (runtime): imagem FINAL enxuta, só com o que roda (node_modules + dist)
#
# Benefício: a imagem final não carrega TypeScript, tsx, nem o cache do npm.

# ---------- ESTÁGIO 1: dependências ----------
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci # instala exatamente o que está no package-lock.json

# ---------- ESTÁGIO 2: compilação ----------
FROM node:22-alpine AS build
WORKDIR /app
# reaproveita as deps do estágio anterior (cache do Docker: se o package.json não mudou, não reinstala)
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------- ESTÁGIO 3: runtime (imagem final) ----------
FROM node:22-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
# copia só o essencial: node_modules (produção) + código compilado
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/index.js"]