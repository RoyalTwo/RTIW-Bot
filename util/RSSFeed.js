import { EventEmitter } from 'events';
import statusMsg from './errorSuccessMsg.js';
import * as fs from 'fs';
import Parser from 'rss-parser';

export default class RSSFeed extends EventEmitter {
    parser = new Parser()
    saveFile;
    current;
    // might want options in constructor args later
    constructor() {
        super();
        if (!(fs.existsSync('./feed_storage.json'))) {
            fs.writeFileSync('feed_storage.json', JSON.stringify({ watching: [] }, null, "\t"));
        }
        this.saveFile = JSON.parse(fs.readFileSync('feed_storage.json').toString());
        setInterval(() => this.saveFile = JSON.parse(fs.readFileSync('feed_storage.json').toString()), 500);

        setTimeout(() => {
            this.emit('ready', Date.now());
        }, 50);

        setInterval(() => {
            // refactor to use only one parseURL
            // savedBuildDate null check might be unnecessary
            this.saveFile.watching.forEach(async (site, index) => {
                const doc = await this.parser.parseURL(site.link);
                const currentBuildDate = doc?.items[0].pubDate;
                const savedBuildDate = site.date;
                // refactor - replace current with saveFile, might make interval redundant
                if (!(savedBuildDate == null) && !(currentBuildDate == null)) {
                    if (currentBuildDate != savedBuildDate) {
                        this.current = JSON.parse(fs.readFileSync('feed_storage.json').toString());
                        this.current.watching[index].date = currentBuildDate;
                        fs.writeFileSync('feed_storage.json', JSON.stringify(
                            this.current, null, "\t"
                        ));
                        this.emit('update', doc);
                    }
                }
                else {
                    console.log(`${statusMsg(err)} ${site.title} does not have a pubDate!`);
                }
            })
        }, 60000)
    }

    async subscribe(link) {
        if (!link) throw new Error(`${statusMsg('err')} 'link' is required - RSSFeed`);
        if (typeof (link) != 'string') throw new Error(`${statusMsg('err')} 'link' wrong data type - RSSFeed`);

        this.saveFile.watching.forEach((page) => {
            if (page.link == link) return
        })

        const doc = await this.parser.parseURL(link)

        if (this.saveFile.watching.length == 0) {
            fs.writeFileSync('feed_storage.json', JSON.stringify({
                watching: [
                    {
                        link,
                        date: doc?.items[0].pubDate
                    }
                ]
            }, null, "\t"));
        }
        else {
            for (let i = 0; i < this.saveFile.watching.length; i++) {
                if (this.saveFile.watching[i].date == doc?.items[0].pubDate) return;
            }
            fs.writeFileSync('feed_storage.json', JSON.stringify({
                watching: [
                    ...this.saveFile.watching,
                    {
                        link,
                        date: doc?.items[0].pubDate
                    }
                ]
            }, null, "\t"));
        }
    }
}