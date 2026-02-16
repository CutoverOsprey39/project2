import { uuid, varchar, pgTable, text, timestamp, pgEnum, date, boolean, jsonb, index, serial, integer } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

//Main entry-point for defining database schema using Drizzle ORM with PostgreSQL
//Schema definitions for users, disc, stats

//<-------------------------------------------------------------->//

//ASSOCIATIONS BETWEEN USER TABLE and DISC TABLE
    //USER to DISC
    //One-to-Many
    //A user can have many discs
    //One disc can have only one owner/user

//ASSOCIATIONS BETWEEN USER and STATS
    //USER to STATS
    //One-to-Many
    //A user can have many stats
    //Stats can belong to one user

//ASSOCIATIONS BETWEEN DISC and STATS
    //DISC to STATS
    //Many-to-Many
    //A disc can have many stats
    //Stats can belong to many discs

//<-------------------------------------------------------------->//

export const usersTable = pgTable('users_table', 
{
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  full_name: varchar('full_name', {length: 255}).notNull(),
  email: text('email').notNull().unique(),
  phone: varchar('phone', {length: 20}).notNull().default(''),
  password: text('password').notNull(),
  last_activity_date: date('last_activity_date').notNull().defaultNow(),
  created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
