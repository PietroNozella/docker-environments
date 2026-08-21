# Docker Environments

Ambientes Docker progressivos para estudar conceitos fundamentais, serviços isolados, desenvolvimento com hot reload e stacks com múltiplos containers.

## Status

Projeto educacional e em evolução. Cada ambiente é independente e possui instruções próprias.

## Pré-requisitos

- Docker;
- Docker Compose v2.

## Índice dos ambientes

| Pasta | Conceito principal | Comando |
|---|---|---|
| `01-conceitos/hello-world` | Comandos básicos do Docker | `docker run hello-world` |
| `01-conceitos/volumes` | Named volume e bind mount | `docker compose up -d` |
| `01-conceitos/networks` | DNS interno entre containers | `docker compose up -d` |
| `02-servicos/postgres` | PostgreSQL e pgAdmin | `docker compose up -d` |
| `02-servicos/redis` | Redis e RedisInsight | `docker compose up -d` |
| `03-dev-environments/node-ts` | Node.js, TypeScript e hot reload | `docker compose up -d dev` |
| `03-dev-environments/python` | Python, Flask e hot reload | `docker compose up -d dev` |
| `04-stacks/node-postgres` | Aplicação, banco e cache | `docker compose up -d --build` |
| `04-stacks/nginx-static` | Nginx servindo site estático | `docker compose up -d` |

## Ordem sugerida

1. `01-conceitos`: imagens, containers, volumes e redes.
2. `02-servicos`: banco e cache isolados.
3. `03-dev-environments`: ambientes de desenvolvimento reproduzíveis.
4. `04-stacks`: aplicações com múltiplos serviços.

## Uso

Entre na pasta do ambiente escolhido e execute o comando documentado no README local. Exemplo:

```bash
cd 02-servicos/postgres
docker compose up -d
docker compose ps
```

Para encerrar sem remover os dados persistidos:

```bash
docker compose down
```

## Validação

Antes de subir um ambiente, valide o arquivo Compose:

```bash
docker compose config
```

Depois de iniciar os serviços:

```bash
docker compose ps
docker compose logs
```

## Comandos úteis

```bash
docker compose up -d
docker compose up -d --build
docker compose down
docker compose logs -f <serviço>
docker compose exec <serviço> sh
docker ps -a
docker images
```

`docker compose down -v` remove também os volumes do ambiente e apaga os dados persistidos.

## Boas práticas demonstradas

- named volumes para dados persistentes;
- bind mounts para código durante desenvolvimento;
- health checks para controlar dependências;
- imagens multi-stage quando há etapa de build;
- comunicação por nomes de serviço, sem IPs fixos;
- configuração por variáveis de ambiente, sem segredos no código.


