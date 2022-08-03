export default {
    name: "ready",
    execute(inter, yt, client) {
        yt.subscribe(["UCFKDEp9si4RmHFWJW1vYsMA", "UCEq_Dr1GHvnNPQNfgOzhZ8Q"]);
        console.log(`${"\x1b[32m"}Success: ${"\x1b[0m"}` + "Youtube connected at: ", inter);
    }
}