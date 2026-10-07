import { createClient } from "redis";

// Conexão única reaproveitada entre requisições na mesma instância da
// função serverless. REDIS_URL é injetada automaticamente pela integração
// Redis conectada ao projeto na Vercel.
let client: ReturnType<typeof createClient> | undefined;

export async function getRedis() {
  if (!client) {
    client = createClient({ url: process.env.REDIS_URL });
    client.on("error", (err) => console.error("Redis client error", err));
  }
  if (!client.isOpen) {
    await client.connect();
  }
  return client;
}
