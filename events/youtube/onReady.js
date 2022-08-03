import status from '../../util/errorSuccessMsg.js';

export default {
    name: "ready",
    execute(inter, yt, client) {
        yt.subscribe(["UCFKDEp9si4RmHFWJW1vYsMA", "UCEq_Dr1GHvnNPQNfgOzhZ8Q"]);
        console.log(`${status('suc')} Youtube connected at: ${inter}`);
    }
}