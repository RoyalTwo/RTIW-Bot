import * as path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const test = path.normalize('./commands');
console.log(await fs.readdirSync('./commands'));


console.log(process.cwd());
console.log(__dirname);
import('file://' + path.join(__dirname, '..', './commands/config/C_notifier.js'));
console.log(path.join('..', './commands/config/C_notifier.js'));