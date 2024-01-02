import * as express from "express";
import * as cors from "cors";
import { Server } from "http";
import { initialiseRoutes } from "./routes/routes";
import { printNewLine } from "./helpers/helpers";

const PORT = 8080;

try {
  printNewLine();

  console.log("💫 Initialising Server...");
  const app = express();

  console.log("👉 Enabling JSON middleware...");
  app.use(express.json());

  console.log("👉 Enabling URL-Encoded middleware...");
  app.use(express.urlencoded({ extended: true }));

  console.log("👉 Enabling CORS...");
  app.use(cors());

  initialiseRoutes(app);

  const server = app
    .listen(PORT, () => {
      console.log(`⭐ Server is now listening on port: ⚓ ${PORT} ⭐`);
      printNewLine();
      console.log(
        `⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐`
      );
      console.log(
        `⭐    Health check at "http://localhost:${PORT}/health"            ⭐`
      );

      console.log(
        `⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐`
      );
    })
    .on("error", (error) => {
      console.error("🚨 Express Error Handler 🚨 ");
      console.error(error);
    });

  process.on("SIGINT", () => handleShutdown(server));
  process.on("SIGTERM", () => handleShutdown(server));
  process.on("SIGHUP", () => handleShutdown(server));
} catch (e: unknown) {
  console.error("🚨 Top level Error caught 🚨 ");
  console.error((e as Error).message);
}

function handleShutdown(server: Server) {
  console.log("🚪 Closing Server...");
  server.close(() => {
    console.log("🏥 Express server closed ✅");
    process.exit(0);
  });
}
