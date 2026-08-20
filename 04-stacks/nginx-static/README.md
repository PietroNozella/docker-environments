# Nginx + site estático — guia de estudo

## Subir

```bash
docker compose up -d
```

Abra http://localhost:8080. Agora **edite `www/index.html`** e recarregue a página —
o Nginx serve o arquivo do host na hora (bind mount).

## O que estudar aqui

1. **Nginx como servidor web**: o container tem só o Nginx; nenhum Node/Python envolvido.
   É o deploy mais leve possível para front-end estático (Tailwind/HTML).
2. **`:ro` (read-only)**: o container pode ler os arquivos, mas não pode alterá-los —
   boa prática de segurança: só o host escreve.
3. **Cache e gzip**: config de produção no `nginx.conf` — comprime o HTML/CSS/JS e manda
   `Cache-Control` para o navegador. Teste com o DevTools aberto na aba Network.
4. **SPA fallback**: `try_files $uri $uri/ /index.html` — se seu app React/Vue tiver rotas
   tipo `/sobre`, o Nginx devolve o index.html e o JS cuida da navegação.

## Comandos de inspeção

```bash
docker compose exec web sh -c "ls /usr/share/nginx/html"  # arquivos dentro do container
docker compose logs -f web                                 # logs de acesso do Nginx
docker compose exec web nginx -t                           # valida a config (sem recarregar)
```

## Onde isso aparece no mundo real

- É exatamente o que o **Vercel** faz com seu site estático (só que com edge network).
- É o padrão de produção com Docker: build do front → copiar os arquivos para a imagem
  `nginx:alpine` → servir. O bind mount aqui é só para estudo; em produção os arquivos
  são copiados DENTRO da imagem (multi-stage) para o container rodar sozinho.