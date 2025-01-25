import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http'; 

// Optional: Enable connection pooling for Neon 
neonConfig.fetchConnectionCache = true;

// Initialize the Neon SQL client
const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);

// Initialize Drizzle ORM

export const db = drizzle(sql); // No need to pass schema here
