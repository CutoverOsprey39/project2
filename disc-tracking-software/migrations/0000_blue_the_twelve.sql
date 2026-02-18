CREATE TABLE "users_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" text NOT NULL,
	"phone" varchar(20) DEFAULT '' NOT NULL,
	"password" text NOT NULL,
	"last_activity_date" date DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_table_id_unique" UNIQUE("id"),
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
