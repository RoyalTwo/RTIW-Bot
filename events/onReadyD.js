export default {
    name: 'ready',
    once: true,
    execute(client) {
        //should load settings from config database, but i'm testing this now
        console.log('Discord Bot Online!');
    }
}