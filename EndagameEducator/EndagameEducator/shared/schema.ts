import { sql } from 'drizzle-orm';
import {
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (required for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (required for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Game progress and scores
export const gameProgress = pgTable("game_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().unique().references(() => users.id),
  pretestScore: integer("pretest_score").default(0),
  posttestScore: integer("posttest_score").default(0),
  totalScore: integer("total_score").default(0),
  completedLessons: jsonb("completed_lessons").default('[]'),
  achievements: jsonb("achievements").default('[]'),
  currentLesson: integer("current_lesson").default(1),
  lessonScores: jsonb("lesson_scores").default('{}'),
  isCompleted: boolean("is_completed").default(false),
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Test responses for analysis
export const testResponses = pgTable("test_responses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  testType: varchar("test_type").notNull(), // 'pretest' or 'posttest'
  questionId: integer("question_id").notNull(),
  selectedAnswer: varchar("selected_answer").notNull(),
  isCorrect: boolean("is_correct").notNull(),
  timeSpent: integer("time_spent"), // seconds
  createdAt: timestamp("created_at").defaultNow(),
});

// Class management for teachers
export const classes = pgTable("classes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  code: varchar("code").notNull().unique(),
  teacherId: varchar("teacher_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const classMembers = pgTable("class_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  classId: varchar("class_id").notNull().references(() => classes.id),
  userId: varchar("user_id").notNull().references(() => users.id),
  joinedAt: timestamp("joined_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type GameProgress = typeof gameProgress.$inferSelect;
export type InsertGameProgress = typeof gameProgress.$inferInsert;
export type TestResponse = typeof testResponses.$inferSelect;
export type InsertTestResponse = typeof testResponses.$inferInsert;
export type Class = typeof classes.$inferSelect;
export type InsertClass = typeof classes.$inferInsert;

export const insertGameProgressSchema = createInsertSchema(gameProgress);
export const insertTestResponseSchema = createInsertSchema(testResponses);
export const insertClassSchema = createInsertSchema(classes);
