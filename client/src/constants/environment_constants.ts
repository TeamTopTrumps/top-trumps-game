// const POKEMON_BASE_URL = import.meta.env.VITE_POKEMON_BASE_URL;  // VITE not guaranteed to import .env variables

const environment = process.env.NODE_ENV;

const POKEMON_BASE_URL =
  environment === "development"
    ? "http://localhost:8080/api"
    : "http://localhost:9090/api";

export { POKEMON_BASE_URL };
