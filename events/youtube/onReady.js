export default {
    name: "ready",
    execute(inter, yt, client) {
        yt.subscribe(["UCFKDEp9si4RmHFWJW1vYsMA", "UCEq_Dr1GHvnNPQNfgOzhZ8Q"]);
        console.log("Youtube connected at: ", inter);
    }
}