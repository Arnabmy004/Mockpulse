CREATE TABLE "Interview" (
	"id" serial PRIMARY KEY NOT NULL,
	"jsonMockResp" text NOT NULL,
	"jobPosition" varchar NOT NULL,
	"jobDesc" varchar NOT NULL,
	"jobExperience" integer NOT NULL,
	"createdBy" varchar NOT NULL,
	"createdAt" timestamp NOT NULL,
	"mockId" varchar NOT NULL
);
