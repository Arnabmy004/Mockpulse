
      /** @type{import ("drizzle-kit").Config}   */

      import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials:{
    url:'postgresql://DATABASE_owner:TNAtjLPgV1y2@ep-dark-brook-a17vgury-pooler.ap-southeast-1.aws.neon.tech/DATABASE?sslmode=require'
  }
});
