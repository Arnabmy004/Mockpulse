import { pgTable, serial, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("MockInterview", {
  id: serial("id").primaryKey(), // Auto-incremented primary key
  jsonMockResp: text("jsonMockResp").notNull(), // JSON response placeholder
  jobPosition: varchar("jobPosition", 255).notNull(), // Job position
  jobDesc: varchar("jobDesc", 255).notNull(), // Job description
  jobExperience: integer("jobExperience").notNull(), // Years of experience
  createdBy: varchar("createdBy", 255).notNull(), // Creator
  createdAt: varchar("createdAt").notNull(), // Creation timestamp
  mockId: varchar("mockId", 255).unique().notNull(), // Unique identifier for mock
});
