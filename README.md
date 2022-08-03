# RTIW Bot
**R**andom **T**hings **I** **W**ant!

## What is this?
This is a Discord bot designed solely for random features I wanted
for my personal server I use to keep notes (yes, I use a discord server for notes...)

Right now, it tracks updates for a game called CS:GO, and tracks YouTube uploads for a 
YouTuber named EthosLab. Very random things, but they're what I want at the moment!

## Why?
It was fun!

I've never really worked with the Discord API before, and this was also a great way 
to further familiarize myself with Node's event structure and overall usage. I learned
a lot, even though this is a pretty straightforward bot if you look at the code. Makes me wanna code more!

I absolutely could've just used any of the many bots available out there, but I'm glad I made it myself :D

### How To Host (if you want to for some reason?)
This can be built from source normally. The only extra step is the .env file necessary with private keys.
- Clone the repo, and make a new file in the folder called ".env"
- In .env, paste the following:
    ```bash
    BOT_TOKEN=""
    BOT_ID=""
    DB_URL=""
    ```
Put your values into the quotes. BOT_TOKEN and BOT_ID are obtained from your Discord Developer page, and DB_URL is the URL to your MongoDB database.

---
<h6 align="center">❤️ Hope you enjoy, I know I did ❤️</h6>
