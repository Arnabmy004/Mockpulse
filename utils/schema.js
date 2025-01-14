
import { pgTable } from "drizzle-orm/pg-core";
import { serial, text, varchar } from "drizzle-orm/pg-core";


console.log("Defining table columns...");
const columns = {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition", 255).notNull(),
  jobDesc: varchar("jobDesc", 255).notNull(),
  jobExperience: varchar("jobExperience", 255).notNull(),
  createdBy: varchar("createdBy", 255).notNull(),
  createdAt: varchar("createdAt", 255).notNull(),
  mockId: varchar("mockId", 255).notNull(),
};
console.log(columns);

export const MockInterview = pgTable("MockInterview", columns);
console.log("Table defined successfully.");
