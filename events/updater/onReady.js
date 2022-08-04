import statusMsg from '../../util/errorSuccessMsg.js';

export default {
    name: 'ready',
    execute(time, client) {
        console.log(`${statusMsg('suc')} RSS Feed connected at: ${'\x1b[33m'}${time}${'\x1b[0m'}`);
    }
}