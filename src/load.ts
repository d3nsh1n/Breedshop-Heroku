import fs from "fs-extra";
import { PokemonInfo } from "./lib";

export const POKEBALLS: String[] = [];
export const POKEMON: Map<string, PokemonInfo> = new Map();

export function init() {
    // Load Pokeballs
    const pokeballDir = `./assets/pokeballs`;
    if (fs.existsSync(pokeballDir)) {
        const p = fs.readdirSync(pokeballDir);
        for (const pfile of p) {
            const s = pfile.split("_");
            if (s[s.length - 1] === "ball.png") {
                POKEBALLS.push(pfile);
            }
        }
    } else {
        console.error(pokeballDir, "does not exist!");
    }

    // Load Pokemon
    const pokemonDir = `./assets/sprites`;
    if (fs.existsSync(pokemonDir)) {
        const files = fs.readdirSync(pokemonDir);
        for (const pokemon of files) {
            const info: PokemonInfo = {};

            const genders = fs.readdirSync(`./${pokemonDir}/${pokemon}`);
            for (const gender of genders) {
                info[gender] = {};

                const forms = fs.readdirSync(`./${pokemonDir}/${pokemon}/${gender}`);
                for (const form of forms) {
                    info[gender][form] = [];

                    const variations = fs.readdirSync(`./${pokemonDir}/${pokemon}/${gender}/${form}`);
                    for (const variation of variations) {
                        info[gender][form].push(variation);
                    }
                }
            }
            POKEMON.set(pokemon, info);
        }
    } else {
        console.error(pokemonDir, "does not exist!");
    }
}
