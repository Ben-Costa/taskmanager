PRAGMA foreign_keys = ON;

-- ============================
-- NOTES
-- ============================
INSERT INTO notes (id, title, content, created_date, modified_date)
VALUES
    (1, 'Learn Node.js', 'Study event loop, async patterns, and module system', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'Design DB Schema', 'Draft schema for notes, tags, tasks, and relations', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Build Frontend UI', 'Implement SPA layout, components, and interactions', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 'Refactor Backend', 'Improve routing, controllers, and error handling', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 'Write Tests', 'Add unit, integration, and E2E tests', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (6, 'Research SQLite', 'Learn indexing, triggers, and performance tuning', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, 'Plan Features', 'Outline roadmap for v1.0 release', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (8, 'Fix Bugs', 'Resolve issues found during QA testing', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (9, 'Optimize Queries', 'Improve SQL performance for large datasets', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (10, 'Write Documentation', 'Document API, schema, and architecture', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (11, 'Design Landing Page', 'Create marketing page for the app', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (12, 'User Feedback Review', 'Analyze feedback and prioritize improvements', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ============================
-- TAGS
-- ============================
INSERT INTO tags (id, name, created_date)
VALUES
    (1, 'urgent', CURRENT_TIMESTAMP),
    (2, 'frontend', CURRENT_TIMESTAMP),
    (3, 'backend', CURRENT_TIMESTAMP),
    (4, 'learning', CURRENT_TIMESTAMP),
    (5, 'testing', CURRENT_TIMESTAMP),
    (6, 'refactor', CURRENT_TIMESTAMP),
    (7, 'performance', CURRENT_TIMESTAMP),
    (8, 'planning', CURRENT_TIMESTAMP),
    (9, 'bugfix', CURRENT_TIMESTAMP),
    (10, 'documentation', CURRENT_TIMESTAMP);

-- ============================
-- TASKS
-- ============================
INSERT INTO tasks (id, title, description, due_date, priority, status, created_date, modified_date)
VALUES
    (1, 'Set up project structure', 'Create backend and frontend folders', NULL, 1, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'Implement notes API', 'CRUD endpoints for notes', NULL, 2, 'in_progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Build UI mockups', 'Sketch layout for SPA', NULL, 3, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 'Write documentation', 'Document API and DB schema', NULL, 2, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 'Add Jest tests', 'Write unit tests for backend logic', NULL, 1, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (6, 'Refactor controllers', 'Improve structure of backend controllers', NULL, 2, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, 'Fix login bug', 'Resolve authentication issue', NULL, 1, 'in_progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (8, 'Optimize SQL queries', 'Improve performance of heavy queries', NULL, 3, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (9, 'Add dark mode', 'Implement theme switching', NULL, 2, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (10, 'Create landing page', 'Design and implement marketing page', NULL, 3, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (11, 'Write E2E tests', 'Add Playwright tests', NULL, 2, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (12, 'Add search feature', 'Implement full-text search for notes', NULL, 2, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (13, 'Review user feedback', 'Analyze and categorize feedback items', NULL, 3, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (14, 'Improve error messages', 'Add better error handling and messages', NULL, 2, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ============================
-- NOTE ↔ TAG RELATIONSHIPS
-- ============================
INSERT INTO note_tags (note_id, tag_id)
VALUES
    (1, 4), (1, 1),
    (2, 3), (2, 4),
    (3, 2),
    (4, 6), (4, 3),
    (5, 5),
    (6, 4),
    (7, 8),
    (8, 9),
    (9, 7),
    (10, 10),
    (11, 2),
    (12, 8), (12, 10);

-- ============================
-- NOTE ↔ TASK RELATIONSHIPS
-- ============================
INSERT INTO note_tasks (note_id, task_id)
VALUES
    (1, 1),
    (2, 2), (2, 4),
    (3, 3),
    (4, 6),
    (5, 5), (5, 11),
    (6, 8),
    (7, 13),
    (8, 7),
    (9, 8), (9, 14),
    (10, 4),
    (11, 10),
    (12, 13);