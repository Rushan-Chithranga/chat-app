import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protrctRoute.js";

const router = express.Router();

/**
 * @swagger
 * /messages/{id}:
 *   get:
 *     summary: Get all messages between the logged-in user and the specified user
 *     description: Fetches all messages between the logged-in user and the user identified by the `id` parameter.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to chat with.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   senderId:
 *                     type: string
 *                   receiverId:
 *                     type: string
 *                   message:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get("/:id", protectRoute, getMessages);

/**
 * @swagger
 * /messages/send/{id}:
 *   post:
 *     summary: Send a message to the specified user
 *     description: Sends a message to the user identified by the `id` parameter.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to send the message to.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: The message text to send.
 *                 example: "Hello, how are you?"
 *     responses:
 *       201:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 senderId:
 *                   type: string
 *                 receiverId:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.post("/send/:id", protectRoute, sendMessage);

export default router;
