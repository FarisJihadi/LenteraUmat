const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController"); // Sesuaikan path jika perlu

// Membuat sesi chat baru
router.post("/", chatController.createChatSession); // POST /api/chat

// Mendapatkan semua sesi chat untuk seorang pengguna
router.get("/user/:userId", chatController.getChatSessionsByUser); // GET /api/chat/user/:userId

// Mendapatkan sesi chat spesifik berdasarkan ID
router.get("/:sessionId", chatController.getChatSessionById); // GET /api/chat/:sessionId

// Menambahkan pesan ke sesi chat yang sudah ada
router.put("/:sessionId/message", chatController.addMessageToSession); // PUT /api/chat/:sessionId/message

// Menghapus sesi chat
router.delete("/:sessionId", chatController.deleteChatSession); // DELETE /api/chat/:sessionId

module.exports = router;
