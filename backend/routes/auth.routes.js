import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Sign in a user
 *     description: Authenticates a user and returns a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Sign in successful, returns a token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad request (e.g. missing fields)
 *       401:
 *         description: Unauthorized (incorrect credentials)
 *       500:
 *         description: Internal server error
 */
router.post("/signin", login);

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Sign up a new user
 *     description: Registers a new user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               username:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *             required:
 *               - name
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request (e.g. missing fields or invalid email)
 *       500:
 *         description: Internal server error
 */
router.post("/signup", signup);

/**
 * @swagger
 * /auth/logout:
 *   delete:
 *     summary: Logout a user
 *     description: Logs out the current user by invalidating the session/token.
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       500:
 *         description: Internal server error
 */
router.post("/logout", logout);

export default router;
