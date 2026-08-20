// API da stack: prova a comunicação entre os 3 serviços
import express from "express";
import { Pool } from "pg"; // cliente do Postgres
import Redis from "ioredis"; // cliente do Redis

const app = express();

// Os hosts "postgres" e "redis" são resolvidos pelo DNS interno da rede do compose
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const redis = new Redis(process.env.REDIS_URL);

app.get("/", async (_req, res) => {
  try {
    // 1) Consulta o Postgres (banco relacional)
    const db = await pool.query("SELECT NOW() AS agora");

    // 2) Conta visitas no Redis (contador atômico em memória)
    const atuais = Number((await redis.get("visitas")) ?? "0");
    const visitas = atuais + 1;
    await redis.set("visitas", String(visitas));

    // 3) Responde provando que os dois serviços responderam
    res.json({
      mensagem: "Stack funcionando: app + postgres + redis",
      hora_do_banco: db.rows[0].agora,
      visitas_total: visitas,
    });
  } catch (erro) {
    res.status(500).json({ erro: String(erro) });
  }
});

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.listen(3000, () => console.log("Stack rodando em http://localhost:3000"));