// Servidor HTTP mínimo (sem framework): só para provar que o container responde.
import http from "node:http";

// Cria o servidor e responde JSON com a hora — útil para testar hot reload
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      mensagem: "Hello do Docker!",
      hora: new Date().toISOString(),
    })
  );
});

const PORT = Number(process.env.PORT ?? 3000);
server.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));