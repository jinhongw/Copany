-- To run this file, use the following command:
-- npx wrangler d1 execute copany --file=./schema.sql 

-- Create Copany table
CREATE TABLE IF NOT EXISTS Copany (
  id INTEGER PRIMARY KEY,
  github_url TEXT,
  name TEXT,
  description TEXT,
  created_by INTEGER,
  project_type TEXT,
  project_stage TEXT,

  main_language TEXT,
  license TEXT,
  created_at TEXT,   -- Use TEXT to store ISO timestamps, e.g. '2025-04-29T03:55:53.975Z'
  updated_at TEXT
);

-- INSERT INTO Copany (id, github_url, name, description, created_by, project_type, project_stage, main_language, license, created_at, updated_at)
-- VALUES
-- (0, 'https://github.com/jinhongw/Copany', 'Copany', 'Copany 的愿景是打破这个时代中公司的限制，让人们真正自由的参与合作。', 0, 'Website', '早期迭代', 'TypeScript', 'Copany license', '2025-04-27 11:37:36', '2025-04-29T03:55:53.975Z'),
-- (1, 'https://github.com/tldraw/tldraw', 'tldraw', 'Welcome to the public monorepo for tldraw. tldraw is a library for creating infinite canvas experiences in React. Its the software behind the digital whiteboard tldraw.com.', 1, 'Website', '成熟产品', 'TypeScript', 'tldraw license123', '2025-04-27 11:39:13', '2025-04-28T11:21:18.727Z'),
-- (4, 'https://github.com/jinhongw/DeskDraw', 'TouchDesk', '小时候，你是否曾在桌子上涂鸦？是否梦想过将桌面变为画板？TouchDesk 将梦想变为现实！使用 TouchDesk，你可以将桌面或墙面（任何水平或垂直面）变成无限画布，用手指直接在真实世界中自由绘画，带来前所未有的沉浸式创作体验。', 1, 'Apple Vision Pro', '打磨迭代', 'Swift', 'Copany License', '2025-04-28T09:32:18.071Z', '2025-04-28T09:32:18.071Z'),
-- (5, 'https://x.com/easybreezy982', 'Jinhonn', 'easybreezy', 1, 'Human', '早期迭代', 'English', 'Human Law', '2025-04-28T09:52:33.214Z', '2025-04-28T09:52:33.214Z'),
-- (8, 'https://www.google.com', 'newnewnew', 'text-black hover:text-gray-800', 1, 'text-black hover:text-gray-800', 'text-black hover:text-gray-800', 'text-black hover:text-gray-800', 'text-black hover:text-gray-100', '2025-04-28T11:21:52.637Z', '2025-04-28T11:32:22.061Z'),
-- (9, 'https://github.com/nathantannar4/Transmission', 'Transmission', 'Transmission aims to improve SwiftUI view presentations and transitions. It does this by bridging UIKit presentation APIs to a SwiftUI API so you can use presentation controllers, interactive transitions and more.', 1, 'Package', '打磨迭代', 'Swift', 'BSD-2-Clause license', '2025-04-28T11:36:33.708Z', '2025-04-28T11:36:33.708Z'),
-- (11, 'https://next-auth.js.org/tutorials', '1', '2', 1, '3', '4', '5', '6', '2025-04-29T03:32:02.404Z', '2025-04-29T03:32:02.404Z'),
-- (12, 'https://next-auth.js.org/tutorials', '333', '333', 1, '333', '333', '333', '333', '2025-04-29T04:05:39.854Z', '2025-04-29T04:05:39.854Z'),
-- (13, 'https://www.google.com', '4', '5', 1, '5', '5', '6', '7', '2025-04-29T14:25:50.598Z', '2025-05-04T07:25:03.194Z');


-- Create accounts table
CREATE TABLE IF NOT EXISTS "accounts" (
    "id" text NOT NULL,
    "userId" text NOT NULL DEFAULT NULL,
    "type" text NOT NULL DEFAULT NULL,
    "provider" text NOT NULL DEFAULT NULL,
    "providerAccountId" text NOT NULL DEFAULT NULL,
    "refresh_token" text DEFAULT NULL,
    "access_token" text DEFAULT NULL,
    "expires_at" number DEFAULT NULL,
    "token_type" text DEFAULT NULL,
    "scope" text DEFAULT NULL,
    "id_token" text DEFAULT NULL,
    "session_state" text DEFAULT NULL,
    "oauth_token_secret" text DEFAULT NULL,
    "oauth_token" text DEFAULT NULL,
    PRIMARY KEY (id)
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS "sessions" (
    "id" text NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL DEFAULT NULL,
    "expires" datetime NOT NULL DEFAULT NULL, 
    PRIMARY KEY (sessionToken)
);

-- Create users table
CREATE TABLE IF NOT EXISTS "users" (
    "id" text NOT NULL DEFAULT '',
    "name" text DEFAULT NULL,
    "email" text DEFAULT NULL,
    "emailVerified" datetime DEFAULT NULL,
    "image" text DEFAULT NULL, 
    PRIMARY KEY (id)
);

-- Create verification_tokens table
CREATE TABLE IF NOT EXISTS "verification_tokens" (
    "identifier" text NOT NULL,
    "token" text NOT NULL DEFAULT NULL,
    "expires" datetime NOT NULL DEFAULT NULL, 
    PRIMARY KEY (token)
);