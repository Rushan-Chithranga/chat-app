import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cookieParser from "cookie-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirnames = dirname(__filename);
const __dirname = path.resolve();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My Chat-App Backend API",
      version: "1.0.0",
      description: "API documentation for My Chat-App project",
      contact: {
        name: "Rushan Chithranga",
        email: "rushanchith123@gmail.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`,
      },
    ],
  },
  apis: [path.join(__dirnames, "routes", "*.js")],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(cookieParser());



// app.get("/", (req, res) => {
//   res.send(`
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Welcome to My Backend</title>
//       <style>
//         body {
//           font-family: Arial, sans-serif;
//           background-color: #f0f0f0;
//           text-align: center;
//           padding: 50px;
//         }
//         h1 {
//           color: #333;
//         }
//         p {
//           font-size: 18px;
//           color: #555;
//         }
//         .button {
//           background-color: #007bff;
//           color: white;
//           padding: 15px 30px;
//           border: none;
//           border-radius: 5px;
//           text-decoration: none;
//           font-size: 18px;
//           margin-top: 20px;
//           display: inline-block;
//         }
//         .button:hover {
//           background-color: #0056b3;
//         }
//       </style>
//     </head>
//     <body>
//       <h1>Welcome to 👋 My Chat-App Backend!</h1>
//       <p>Click the button below to start exploring!</p>
//       <a href="/api-docs" class="button">Go to API Docs</a>
//     </body>
//     </html>
//   `);
// });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log("Server Running on port " + PORT);
});
