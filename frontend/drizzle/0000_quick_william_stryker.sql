CREATE TYPE "public"."project_status" AS ENUM('In Progress', 'Complete', 'Planning', 'On Hold');--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"long_description" text,
	"technologies" json DEFAULT '[]'::json NOT NULL,
	"status" "project_status" DEFAULT 'In Progress' NOT NULL,
	"category" varchar(100) NOT NULL,
	"demo_url" varchar(500),
	"github_url" varchar(500),
	"image_url" varchar(500),
	"thumbnail_url" varchar(500),
	"screenshots" json DEFAULT '[]'::json NOT NULL,
	"start_date" timestamp with time zone DEFAULT now() NOT NULL,
	"end_date" timestamp with time zone,
	"featured" boolean DEFAULT false NOT NULL,
	"priority" integer DEFAULT 0 NOT NULL,
	"slug" varchar(255) NOT NULL,
	"tags" json DEFAULT '[]'::json NOT NULL,
	"challenges" text,
	"learnings" text,
	"updated_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE INDEX "projects_status_idx" ON "projects" USING btree ("status");--> statement-breakpoint
CREATE INDEX "projects_featured_idx" ON "projects" USING btree ("featured");--> statement-breakpoint
CREATE INDEX "projects_priority_idx" ON "projects" USING btree ("priority");--> statement-breakpoint
CREATE INDEX "projects_category_idx" ON "projects" USING btree ("category");--> statement-breakpoint
CREATE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "projects_deleted_at_idx" ON "projects" USING btree ("deleted_at");