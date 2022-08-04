import status from '../../util/errorSuccessMsg.js';

export default {
    name: "ready",
    execute(inter, yt, client) {
        yt.subscribe(["UCFKDEp9si4RmHFWJW1vYsMA", "UCEq_Dr1GHvnNPQNfgOzhZ8Q"]);
        console.log(`${status('suc')} Youtube connected at: ${'\x1b[33m'}${inter}${'\x1b[0m'}`);
    }
}