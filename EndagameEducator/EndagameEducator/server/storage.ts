import {
  users,
  gameProgress,
  testResponses,
  classes,
  classMembers,
  type User,
  type UpsertUser,
  type GameProgress,
  type InsertGameProgress,
  type TestResponse,
  type InsertTestResponse,
  type Class,
  type InsertClass,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Game progress operations
  getGameProgress(userId: string): Promise<GameProgress | undefined>;
  upsertGameProgress(progress: InsertGameProgress): Promise<GameProgress>;
  
  // Test response operations
  saveTestResponse(response: InsertTestResponse): Promise<TestResponse>;
  getTestResponses(userId: string, testType: string): Promise<TestResponse[]>;
  
  // Leaderboard operations
  getLeaderboard(classId?: string): Promise<Array<{ user: User; progress: GameProgress }>>;
  
  // Class operations
  createClass(classData: InsertClass): Promise<Class>;
  getClassByCode(code: string): Promise<Class | undefined>;
  joinClass(classId: string, userId: string): Promise<void>;
  getClassMembers(classId: string): Promise<Array<{ user: User; progress: GameProgress }>>;
}

export class DatabaseStorage implements IStorage {
  // User operations (required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Game progress operations
  async getGameProgress(userId: string): Promise<GameProgress | undefined> {
    const [progress] = await db
      .select()
      .from(gameProgress)
      .where(eq(gameProgress.userId, userId));
    return progress;
  }

  async upsertGameProgress(progressData: InsertGameProgress): Promise<GameProgress> {
    const [progress] = await db
      .insert(gameProgress)
      .values(progressData)
      .onConflictDoUpdate({
        target: gameProgress.userId,
        set: {
          ...progressData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return progress;
  }

  // Test response operations
  async saveTestResponse(response: InsertTestResponse): Promise<TestResponse> {
    const [savedResponse] = await db
      .insert(testResponses)
      .values(response)
      .returning();
    return savedResponse;
  }

  async getTestResponses(userId: string, testType: string): Promise<TestResponse[]> {
    return await db
      .select()
      .from(testResponses)
      .where(and(
        eq(testResponses.userId, userId),
        eq(testResponses.testType, testType)
      ));
  }

  // Leaderboard operations
  async getLeaderboard(classId?: string): Promise<Array<{ user: User; progress: GameProgress }>> {
    // If classId is provided, filter by class members
    if (classId) {
      const results = await db
        .select({
          user: users,
          progress: gameProgress,
        })
        .from(users)
        .innerJoin(gameProgress, eq(users.id, gameProgress.userId))
        .innerJoin(classMembers, eq(users.id, classMembers.userId))
        .where(eq(classMembers.classId, classId))
        .orderBy(desc(gameProgress.totalScore));
      return results;
    }

    // Global leaderboard
    const results = await db
      .select({
        user: users,
        progress: gameProgress,
      })
      .from(users)
      .innerJoin(gameProgress, eq(users.id, gameProgress.userId))
      .orderBy(desc(gameProgress.totalScore));
    return results;
  }

  // Class operations
  async createClass(classData: InsertClass): Promise<Class> {
    const [newClass] = await db
      .insert(classes)
      .values(classData)
      .returning();
    return newClass;
  }

  async getClassByCode(code: string): Promise<Class | undefined> {
    const [foundClass] = await db
      .select()
      .from(classes)
      .where(eq(classes.code, code));
    return foundClass;
  }

  async joinClass(classId: string, userId: string): Promise<void> {
    await db
      .insert(classMembers)
      .values({ classId, userId })
      .onConflictDoNothing();
  }

  async getClassMembers(classId: string): Promise<Array<{ user: User; progress: GameProgress }>> {
    const results = await db
      .select({
        user: users,
        progress: gameProgress,
      })
      .from(users)
      .innerJoin(classMembers, eq(users.id, classMembers.userId))
      .leftJoin(gameProgress, eq(users.id, gameProgress.userId))
      .where(eq(classMembers.classId, classId));
    return results;
  }
}

export const storage = new DatabaseStorage();
