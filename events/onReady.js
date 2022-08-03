import status from '../util/errorSuccessMsg.js';

export default {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`${status('suc')} Discord connected as:  ${'\x1b[33m'}${client.user.username}${'\x1b[0m'}`);
    }
}