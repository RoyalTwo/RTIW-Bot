import * as path from 'path';
import * as fs from 'fs';
import RSSFeed from './RSSFeed.js';
import Parser from 'rss-parser';
let parser = new Parser();

const test = await parser.parseURL('https://blog.counter-strike.net/index.php/category/updates/feed/')

console.log(test);