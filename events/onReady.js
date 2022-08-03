export default {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`${"\x1b[32m"}Success: ${"\x1b[0m"}` + `Discord connected as:  ${'\x1b[33m'}${client.user.username}${'\x1b[0m'}`);
    }
}