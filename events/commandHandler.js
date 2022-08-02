export default {
    name: 'interactionCreate',
    once: false,
    async execute(interaction) {
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.default.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}