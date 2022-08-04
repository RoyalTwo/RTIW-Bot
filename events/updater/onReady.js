import statusMsg from '../../util/errorSuccessMsg.js';

export default {
    name: 'ready',
    execute(time, rss, client) {
        rss.subscribe("https://blog.counter-strike.net/index.php/category/updates/feed/")
        console.log(`${statusMsg('suc')} RSS Feed connected at: ${'\x1b[33m'}${time}${'\x1b[0m'}`);
    }
}