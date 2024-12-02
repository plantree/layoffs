import { assert } from 'console';
import fs from 'fs';

// Read all csv files in data/, convert them to json and write them to data/json/
// usage: node csv2json.js
function csv2json() {
    const csvFiles = fs.readdirSync('src/data').filter((file) => file.endsWith('.csv'));
    csvFiles.forEach((file) => {
        const csv = fs.readFileSync(`src/data/${file}`, 'utf8');
        const lines = csv.split('\n');
        const headers = lines[0].split(',');
        const data = lines.slice(1).map((line) => {
            const values = line.split(',');
            assert(values.length === headers.length, values);
            return headers.reduce((obj, header, i) => {
                if (header === 'date') {
                    obj[header] = new Date(values[i]).toISOString();
                } else if (header === "department") {
                    const departments = values[i].split(';');
                    if (departments.length === 1) {
                        obj[header] = []
                    } else {
                        obj[header] = departments;
                    }
                }
                else {
                    obj[header] = values[i];

                }
                return obj;
            }, {});
        });
        fs.writeFileSync(`src/data/json/${file.replace('.csv', '.json')}`, JSON.stringify(data, null, 2));
    });
}

csv2json();