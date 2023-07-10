import fs from "fs-extra";

const getDirectories = (source: string) =>
    fs
        .readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

const files = getDirectories("./pokemon");
// read();
function read() {
    let i = 0;
    for (const pokemon of files) {
        const genders = getDirectories(`./pokemon/${pokemon}`);
        for (const gender of genders) {
            const forms = getDirectories(`./pokemon/${pokemon}/${gender}`);
            for (const form of forms) {
                const variations = fs.readdirSync(`./pokemon/${pokemon}/${gender}/${form}`);
                for (const variation of variations) {
                    const sourceDir = `./pokemon/${pokemon}/${gender}/${form}/${variation}/sprite.png`;

                    if (fs.existsSync(sourceDir)) {
                        const tpokemon = pokemon;
                        const targetDir = `./assets/sprites/${tpokemon}/${gender}/${form}`;
                        fs.mkdirSync(targetDir, { recursive: true });
                        fs.copyFileSync(`./pokemon/${pokemon}/${gender}/${form}/${variation}/sprite.png`, `${targetDir}/${variation}.png`);
                    } else {
                        console.log("Skipped ", sourceDir);
                    }
                }
            }
        }
    }
}
