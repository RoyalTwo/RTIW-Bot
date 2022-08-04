# RTIW Bot
> ✨ **Random Things I Want** ✨

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="js-badge" /> &ensp;<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="node-badge" /> &ensp;<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="mongodb-badge" />

## What is this?
This is a Discord bot designed solely for random features I wanted
for my personal server I use to keep notes.

Features for users:
* RSS feed auto updater
* Changeable notification channel
* YouTube channel auto updater
* Slash commands for configuration options
    
Features for devs:
* Completely server-agnostic (took a lot more time than you'd think 🙃)
* Very easily extensible
* Custom-made RSS feed auto updater (use it please I enjoyed making it)
* Scripts to help you change things

**It's a good base for your own bot if you have a database!**

<img style="height:30px; display: block" alt="Fork repo" src="https://img.shields.io/github/forks/RoyalTwo/RTIW-Bot?color=lightblue&label=fork&style=for-the-badge"/>

#### There are two versions:
> **`master` branch which is a solid foundation for a custom bot, includes every feature listed above**

> **`custom` branch which is my own custom bot with more features (some features may not be server agnostic! Eventually I'll refactor for that, but it's not a priority and can take time)**

## Why?
It was fun!

I've never really worked with the Discord API before, and this was also a great way 
to further familiarize myself with Node's event structure and overall usage. I learned
a lot, especially about using third party APIs and understanding documentation.

I absolutely could've just used any of the many bots available out there, but I'm happy to have made it myself 🙂

### How To Host (if you want to)
This can be built from source normally, just make sure you have a Mongo database. The only extra step is the .env file necessary with private keys.
- Clone the repo, and make a new file in the folder called ".env"
- In .env, paste the following:
    ```bash
    BOT_TOKEN=""
    BOT_ID=""
    DB_URL=""
    ```
- Put your values into the quotes. BOT_TOKEN and BOT_ID are obtained from your Discord Developer page, and DB_URL is the URL to your MongoDB database.
- Subscribe to your RSS/YT feed (if you don't want the defaults)
- Run `npm init` as usual

---
<h6 align="center">❤️ Hope you enjoy, I know I enjoyed making it! ❤️</h6>

---
