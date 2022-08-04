import { EventEmitter } from 'events';
import status from './errorSuccessMsg.js';
import * as fs from 'fs';
import Parser from 'rss-parser';

export default class RSSFeed extends EventEmitter {
    parser = new Parser()
    saveFile;
    current;
    // might need options in constructor args later
    constructor() {
        super();
        if (fs.existsSync('./feed_storage.json')) {
            console.log('already exists');
        }
        else {
            fs.writeFileSync('feed_storage.json', JSON.stringify({ watching: [] }));
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
                if (!(savedBuildDate == null) && !(currentBuildDate == null)) {
                    if (currentBuildDate != savedBuildDate) {
                        console.log('adding build date');
                        this.current = JSON.parse(fs.readFileSync('feed_storage.json').toString());
                        this.current.watching[index].date = currentBuildDate;
                        fs.writeFileSync('feed_storage.json', JSON.stringify(
                            this.current
                        ));
                        this.emit('update', doc);
                    }
                }
            })
        }, 1000)
    }

    async subscribe(link) {
        if (!link) throw new Error(`${status('err')} 'link' is required - RSSFeed`);
        if (typeof (link) != 'string') throw new Error(`${status('err')} 'link' wrong data type - RSSFeed`);

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
            }));
        }
        else {
            fs.writeFileSync('feed_storage.json', JSON.stringify({
                watching: [
                    ...this.saveFile.watching,
                    {
                        link,
                        date: doc?.items[0].pubDate
                    }
                ]
            }));
        }
    }
}