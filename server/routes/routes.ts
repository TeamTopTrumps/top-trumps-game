import * as express from "express";
import { Express } from "express";
import { fetch_pokemon, fetch_pokemon_list } from "../pokemon/pokemon_api";
import { toCard } from "../pokemon/toCard";

export function initialiseRoutes(app: Express) {
  console.log("🏗️  Setting up routers...");

  addHealthCheck(app);

  addAPIRoutes(app);
}

function addHealthCheck(app: Express) {
  console.log("🛠️  Creating base router...");

  const baseRouter = express.Router();

  baseRouter.use((req, res, next) => {
    res.header("Access-Control-Allow-Methods", "GET");
    console.log(`📨 ${req.url}`);
    next();
  });

  console.log("🏠❤️‍🩹  Adding health check route...");
  baseRouter.get("/health", (req, res) => {
    res.status(200).send("👍 Okay! The server is responding! 🙌");
  });

  console.log("🛠️  Applying base router to Express server...");
  app.use("/", baseRouter);
}

// this function adds all the routes we can access by going to /api/[someRoute]
function addAPIRoutes(app: Express) {
  console.log("🛠️  Creating API router...");

  const apiRouter = express.Router();
  apiRouter.use((req, res, next) => {
    // we'll use this router to return specifically JSON
    res.setHeader("Content-Type", "application/json");
    next();
  });

  // this route allows clients to GET a list of pokemons
  console.log("📨  Adding GET pokemon list route...");
  apiRouter.get("/pokemon", async (req, res) => {
    try {
      const getId = (url: string) => {
        const segments = url.split("/");

        const last = segments[segments.length - 2];

        return Number.isNaN(last) ? undefined : parseInt(last, 10);
      };

      const response = await fetch_pokemon_list();

      const list = response.results.map((s) => ({
        id: getId(s.url),
        name: s.name,
      }));

      res.status(200).send(list);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ message: "Unable to fetch list of pokemons" });
      }
    }
  });

  // this route allows clients to GET a Pokemon Card
  console.log("📨  Adding GET pokemon route...");
  apiRouter.get("/pokemon/:id", async (req, res) => {
    const id = req.params.id;

    if (Number.isNaN(id)) {
      res.status(400).send({ message: `id must be an integer value` });
    } else {
      try {
        const pokemon = await fetch_pokemon(parseInt(id, 10));

        res.status(200).send(toCard(pokemon));
      } catch (error) {
        if (error instanceof Error) {
          const parts = error.message.split(" ");

          if (parts.length === 0 || Number.isNaN(parts[0])) {
            res.status(500).send({ message: error.message });
          } else {
            const status = parseInt(parts[0], 10);

            res.status(status).send({ message: error.message });
          }
        }
      }
    }
  });

  console.log("🛠️  Applying API router to Express server...");
  app.use("/api", apiRouter);
}
