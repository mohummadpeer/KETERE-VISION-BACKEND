# -------- build stage --------
FROM node:18-alpine AS builder

# variables (modifiable si besoin)
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# outils nécessaires pour construire (git utile si des deps installées depuis git)
RUN apk add --no-cache python3 make g++ git

WORKDIR /app

# copy lockfiles first for better caching
COPY package.json yarn.lock ./

# installer dépendances (installe tout pour build)
RUN yarn install --frozen-lockfile

# copy source
COPY tsconfig.json ./ 
COPY src ./src

RUN yarn add -D typescript ts-node @types/node

# build TypeScript -> dist
RUN yarn build

# -------- runtime stage --------
FROM node:18-alpine AS runner

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV PORT=4000

# create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# copy only production files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

# use non-root
USER appuser

EXPOSE ${PORT}

# healthcheck (optional)
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s CMD [ "node", "-e", "require('./dist/index.js'); console.log('health ok'); process.exit(0)" ] || exit 1

# launch app
CMD ["node", "dist/index.js"]
