// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// export const prisma = 
//   globalForPrisma.prisma || 
//   new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// 1. Safety Check for the URL
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("🚨 DATABASE_URL is missing! Check your .env file.");
}

// 2. Set up the Database Pool
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// 3. Connect Prisma
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = 
  globalForPrisma.prisma || 
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;