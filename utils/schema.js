import { pgTable, serial, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("MockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition", 255).notNull(),
  jobDesc: varchar("jobDesc", 255).notNull(),
  jobExperience: integer("jobExperience").notNull(),
  createdBy: varchar("createdBy", 255).notNull(),
  createdAt: timestamp("createdAt").notNull(),
  mockId: varchar("mockId", 255).notNull(),
});

