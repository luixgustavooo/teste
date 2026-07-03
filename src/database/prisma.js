require('dotenv').config({ quiet: true }); // Carrega a senha e URL do seu arquivo .env
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Erro Crítico: DATABASE_URL não foi encontrada. Verifique seu arquivo .env!");
}

// Cria o adaptador do Postgres usando a sua URL
const adapter = new PrismaPg({ connectionString });

// Inicia o Prisma passando o adaptador (Isso resolve o seu erro!)
const prisma = new PrismaClient({ adapter });

module.exports = prisma;