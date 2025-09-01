import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Game progress routes
  app.get('/api/game/progress', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const progress = await storage.getGameProgress(userId);
      res.json(progress || {
        userId,
        pretestScore: 0,
        posttestScore: 0,
        totalScore: 0,
        completedLessons: [],
        achievements: [],
        currentLesson: 1,
        lessonScores: {},
        isCompleted: false,
      });
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  app.post('/api/game/progress', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const progressData = { ...req.body, userId };
      const progress = await storage.upsertGameProgress(progressData);
      res.json(progress);
    } catch (error) {
      console.error("Error saving progress:", error);
      res.status(500).json({ message: "Failed to save progress" });
    }
  });

  // Test response routes
  app.post('/api/test/response', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const responseSchema = z.object({
        testType: z.string(),
        questionId: z.number(),
        selectedAnswer: z.string(),
        isCorrect: z.boolean(),
        timeSpent: z.number().optional(),
      });
      
      const responseData = responseSchema.parse(req.body);
      const response = await storage.saveTestResponse({
        ...responseData,
        userId,
      });
      res.json(response);
    } catch (error) {
      console.error("Error saving test response:", error);
      res.status(500).json({ message: "Failed to save test response" });
    }
  });

  app.get('/api/test/responses/:testType', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { testType } = req.params;
      const responses = await storage.getTestResponses(userId, testType);
      res.json(responses);
    } catch (error) {
      console.error("Error fetching test responses:", error);
      res.status(500).json({ message: "Failed to fetch test responses" });
    }
  });

  // Leaderboard routes
  app.get('/api/leaderboard', isAuthenticated, async (req: any, res) => {
    try {
      const { classId } = req.query;
      const leaderboard = await storage.getLeaderboard(classId as string);
      res.json(leaderboard);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ message: "Failed to fetch leaderboard" });
    }
  });

  // Class routes
  app.post('/api/class', isAuthenticated, async (req: any, res) => {
    try {
      const teacherId = req.user.claims.sub;
      const classSchema = z.object({
        name: z.string(),
        code: z.string(),
      });
      
      const classData = classSchema.parse(req.body);
      const newClass = await storage.createClass({
        ...classData,
        teacherId,
      });
      res.json(newClass);
    } catch (error) {
      console.error("Error creating class:", error);
      res.status(500).json({ message: "Failed to create class" });
    }
  });

  app.post('/api/class/join', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { classCode } = req.body;
      
      const foundClass = await storage.getClassByCode(classCode);
      if (!foundClass) {
        return res.status(404).json({ message: "Class not found" });
      }
      
      await storage.joinClass(foundClass.id, userId);
      res.json({ message: "Successfully joined class" });
    } catch (error) {
      console.error("Error joining class:", error);
      res.status(500).json({ message: "Failed to join class" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
