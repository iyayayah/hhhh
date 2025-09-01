# ENDAGAME: DNA Education Game

## Overview

ENDAGAME (Exploring Nucleic acids through DNA Analysis & Genetic Modification Exercises) is an interactive educational web application designed to teach genetics concepts through gamified learning. The application provides a comprehensive learning journey covering DNA structure, protein synthesis, genetics, and genetic engineering through interactive lessons, assessments, and hands-on activities.

The system features a complete learning management structure with pre/post assessments, progressive lesson modules, interactive DNA manipulation tools, and progress tracking. Students can explore genetic concepts through 3D visualizations, drag-and-drop exercises, and simulation-based learning experiences.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing with protected route patterns
- **UI Framework**: Shadcn/ui components built on Radix UI primitives for accessible, customizable interface elements
- **Styling**: Tailwind CSS with CSS variables for consistent theming and responsive design
- **State Management**: TanStack Query for server state management with optimistic updates and caching
- **Forms**: React Hook Form with Zod validation for type-safe form handling

### Backend Architecture
- **Server Framework**: Express.js with TypeScript for API development and middleware handling
- **Database ORM**: Drizzle ORM for type-safe database operations and schema management
- **Authentication**: Replit-integrated OAuth with session management using PostgreSQL session store
- **API Design**: RESTful endpoints with structured error handling and logging middleware
- **Development Setup**: Vite for fast development builds with HMR and development-specific tooling

### Data Storage Solutions
- **Primary Database**: PostgreSQL with connection pooling via Neon serverless driver
- **Schema Design**: Normalized tables for users, game progress, test responses, classes, and session management
- **Session Storage**: PostgreSQL-backed session store for authentication persistence
- **Data Validation**: Zod schemas for runtime type checking and API validation
- **Migrations**: Drizzle Kit for database schema versioning and deployment

### Authentication and Authorization
- **OAuth Provider**: Replit OAuth integration with OpenID Connect discovery
- **Session Management**: Express-session with PostgreSQL store for secure session persistence
- **Route Protection**: Middleware-based authentication checks on protected API endpoints
- **User Management**: Automatic user provisioning and profile management through OAuth claims

### Game Architecture Components
- **Progress Tracking**: Comprehensive progress system tracking lesson completion, scores, and achievements
- **Assessment System**: Pre/post-test functionality with immediate feedback and score calculation
- **Interactive Components**: Custom React components for DNA building, 3D visualizations, and quiz interfaces
- **Lesson Management**: Structured lesson content with embedded activities and assessments
- **Score Management**: Point-based progression system with leaderboards and achievement tracking

### External Dependencies
- **Database Hosting**: Neon PostgreSQL for managed database services with serverless scaling
- **Authentication**: Replit OAuth system for seamless user authentication and profile management
- **Development Tools**: Replit-specific plugins for error handling and development environment integration
- **UI Components**: Radix UI primitives for accessible foundation components
- **Real-time Features**: WebSocket support through Neon for potential real-time collaboration features

The architecture prioritizes educational effectiveness through interactive learning components while maintaining scalability and type safety throughout the full-stack application. The design supports both individual learning and potential classroom management features through the class system.