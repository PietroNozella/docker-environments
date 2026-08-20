# Conceito: Redes (DNS interno entre containers)

## O experimento

```bash
docker compose up -d
docker compose exec api sh -c "curl http://postgres:5432"
```

O `curl` falha (não é HTTP), mas repare: **o nome `postgres` resolveu** dentro do container
`api`. Na rede `app-net`, o Docker mantém um DNS interno que resolve o nome de cada serviço
para o IP dele.

## Três pontos-chave

1. **Nunca use IPs**: containers são recriados com IPs diferentes. Use o **nome do serviço**.
2. **Redes isolam**: o Postgres deste ambiente está acessível apenas na rede `app-net`.
   Teste: `docker exec net-api sh` e tente `curl http://localhost:5432` — falha, porque
   "localhost" dentro do container é o próprio container, não o host.
3. **Portas expostas vs rede interna**:
   - `ports:` expõe para o host (localhost:8080) — é o "portão para fora".
   - A comunicação **entre** serviços acontece pela rede interna, sem passar pelo host.

## Comandos de inspeção

```bash
docker network ls                  # redes existentes (app-net aparece aqui)
docker network inspect docker-environments_app-net   # nome completo: pasta_nome
docker exec net-postgres cat /etc/hosts              # o DNS na prática
```

## Pergunta de fixação

Em um compose com `api` e `db`, o banco precisa de exposição de porta para a API se conectar?
Resposta: **não** — ambas na mesma rede já se falam pelo nome do serviço. `ports:` só serve
para você acessar de fora (browser, clientes SQL).