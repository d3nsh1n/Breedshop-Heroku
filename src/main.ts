import chalk from "chalk";
import dayjs from "dayjs";
import express from "express";
import cors from "cors";
import "./test";
import { POKEBALLS, POKEMON, init } from "./load";

console.log(chalk.magenta(`===== ${dayjs().format("HH:mm:ss")} =====`));

const app = express(); //
app.use(cors());
const port = 3000; //

// Serve static assets
app.use(express.static("front_dist"));
app.use(express.static("assets"));

// Load files
init();

// Define your routes and server logic
app.get("/pokeballs", (req, res) => {
    res.send(JSON.stringify(POKEBALLS));
});

app.get("/pokemon_list", (req, res) => {
    res.send(Array.from(POKEMON.keys()));
});

app.get("/pokemon", (req, res) => {
    const species = req.query.species;
    console.log("Received query for", species);
    if (typeof species !== "string") {
        res.sendStatus(201);
        return;
    }
    console.log("Res:", POKEMON.get(species));
    res.send(POKEMON.get(species));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
