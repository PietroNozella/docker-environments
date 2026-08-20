# Dockerfile para Python (single stage)
#
# Nota didática: para Python, o multi-stage é menos útil do que para Node —
# o pip não "empacota" nem faz tree-shaking como o npm, então a imagem final
# carregaria as mesmas libs de qualquer forma. O que importa aqui:
# - base slim (menor imagem oficial)
# - pip com --no-cache-dir (não guarda pacotes baixados)
# - requirements.txt (dependências declaradas = ambiente reproduzível)
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt ./
# instala as dependências ANTES de copiar o código: o Docker usa cache de camadas,
# então mudanças no app.py não reinstalam as libs
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]