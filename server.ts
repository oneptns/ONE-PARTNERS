import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("one_partners.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT,
    year TEXT,
    description TEXT,
    system TEXT,
    client TEXT,
    imageUrl TEXT,
    sortOrder INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    author TEXT,
    fileUrl TEXT,
    fileName TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Migration: Add sortOrder to projects if it doesn't exist
const tableInfo = db.prepare("PRAGMA table_info(projects)").all() as any[];
const hasSortOrder = tableInfo.some(col => col.name === "sortOrder");
if (!hasSortOrder) {
  db.exec("ALTER TABLE projects ADD COLUMN sortOrder INTEGER DEFAULT 0");
}

// Migration: Add fileUrl and fileName to posts if they don't exist
const postTableInfo = db.prepare("PRAGMA table_info(posts)").all() as any[];
if (!postTableInfo.some(col => col.name === "fileUrl")) {
  db.exec("ALTER TABLE posts ADD COLUMN fileUrl TEXT");
}
if (!postTableInfo.some(col => col.name === "fileName")) {
  db.exec("ALTER TABLE posts ADD COLUMN fileName TEXT");
}

// Seed Data
const projectCount = db.prepare("SELECT COUNT(*) as count FROM projects").get() as { count: number };
if (projectCount.count === 0) {
  const insertProject = db.prepare(`
    INSERT INTO projects (title, category, location, year, description, system, client, imageUrl)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertProject.run("강남 테헤란로 오피스 빌딩", "업무", "서울특별시 강남구", "2023", "신축 오피스 빌딩 구조설계", "RC조", "OO건설", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800");
  insertProject.run("한남동 고급 주거 단지", "주거", "서울특별시 용산구", "2024", "고급 빌라 단지 구조설계", "SRC조", "XX개발", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800");
}

const postCount = db.prepare("SELECT COUNT(*) as count FROM posts").get() as { count: number };
if (postCount.count === 0) {
  const insertPost = db.prepare(`
    INSERT INTO posts (title, content, category, author)
    VALUES (?, ?, ?, ?)
  `);
  insertPost.run("2024년 개정 건축구조기준(KDS) 안내", "최신 개정된 건축구조기준에 대한 요약 자료입니다.", "기술자료", "관리자");
  insertPost.run("원파트너스 홈페이지 리뉴얼 안내", "더 나은 서비스를 위해 홈페이지를 새롭게 단장하였습니다.", "공지", "관리자");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Configure Multer for file uploads
  const uploadDir = path.join(__dirname, "public/uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    }
  });

  const upload = multer({ storage });

  // Serve uploaded files
  app.use("/uploads", express.static(uploadDir));

  // Admin Credentials (Hardcoded as requested)
  const ADMIN_ID = "admin1";
  const ADMIN_PW = "adminone1";

  // API Routes
  app.post("/api/login", (req, res) => {
    const { id, password } = req.body;
    if (id === ADMIN_ID && password === ADMIN_PW) {
      res.json({ success: true, token: "admin-token-123" }); // Simple token for demo
    } else {
      res.status(401).json({ success: false, message: "아이디 또는 비밀번호가 일치하지 않습니다." });
    }
  });

  app.get("/api/projects", (req, res) => {
    const projects = db.prepare("SELECT * FROM projects ORDER BY sortOrder ASC, createdAt DESC").all();
    res.json(projects);
  });

  app.post("/api/projects", (req, res) => {
    const { title, category, location, year, description, system, client, imageUrl } = req.body;
    const info = db.prepare(`
      INSERT INTO projects (title, category, location, year, description, system, client, imageUrl)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(title, category, location, year, description, system, client, imageUrl);
    res.json({ id: info.lastInsertRowid });
  });

  app.delete("/api/projects/:id", (req, res) => {
    db.prepare("DELETE FROM projects WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.put("/api/projects/:id", (req, res) => {
    const { title, category, location, year, description, system, client, imageUrl } = req.body;
    db.prepare(`
      UPDATE projects 
      SET title = ?, category = ?, location = ?, year = ?, description = ?, system = ?, client = ?, imageUrl = ?
      WHERE id = ?
    `).run(title, category, location, year, description, system, client, imageUrl, req.params.id);
    res.json({ success: true });
  });

  app.put("/api/projects/reorder", (req, res) => {
    const { orders } = req.body; // Array of { id, sortOrder }
    const update = db.prepare("UPDATE projects SET sortOrder = ? WHERE id = ?");
    const transaction = db.transaction((items) => {
      for (const item of items) {
        update.run(item.sortOrder, item.id);
      }
    });
    transaction(orders);
    res.json({ success: true });
  });

  app.get("/api/posts", (req, res) => {
    const posts = db.prepare("SELECT * FROM posts ORDER BY createdAt DESC").all();
    res.json(posts);
  });

  app.post("/api/posts", (req, res) => {
    const { title, content, category, author, fileUrl, fileName } = req.body;
    const info = db.prepare(`
      INSERT INTO posts (title, content, category, author, fileUrl, fileName)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(title, content, category, author, fileUrl, fileName);
    res.json({ id: info.lastInsertRowid });
  });

  app.post("/api/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res.json({ 
      url: `/uploads/${req.file.filename}`,
      name: req.file.originalname 
    });
  });

  app.delete("/api/posts/:id", (req, res) => {
    db.prepare("DELETE FROM posts WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.put("/api/posts/:id", (req, res) => {
    const { title, content, category, author, fileUrl, fileName } = req.body;
    db.prepare(`
      UPDATE posts 
      SET title = ?, content = ?, category = ?, author = ?, fileUrl = ?, fileName = ?
      WHERE id = ?
    `).run(title, content, category, author, fileUrl, fileName, req.params.id);
    res.json({ success: true });
  });

  app.post("/api/contacts", (req, res) => {
    const { name, company, email, message } = req.body;
    const info = db.prepare(`
      INSERT INTO contacts (name, company, email, message)
      VALUES (?, ?, ?, ?)
    `).run(name, company, email, message);
    res.json({ id: info.lastInsertRowid });
  });

  app.get("/api/contacts", (req, res) => {
    const contacts = db.prepare("SELECT * FROM contacts ORDER BY createdAt DESC").all();
    res.json(contacts);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
