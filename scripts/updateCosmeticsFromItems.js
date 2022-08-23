const { writeFileSync } = require('fs');
const items = require('./bin/items.json');
const sections = require('./bin/sections.json');
const { log } = require('./constants');
const { join } = require('path');

const cosmeticsPath = join(__dirname, '../assets/json/cosmetics.json');
const cosmetics = require(cosmeticsPath);

function handle(sku, newObj) {
    const [type, name] = sku.split('-');

    if (type === 'bundle') return log('Skipped bundle');

    if (!newObj[type]) return log(`Type "${type}" not found in newObject`, 0);
    if (newObj[type].includes(name)) return log(`Item "${name}" is already in ${cosmeticsPath.split('\\').pop()}`, 0);

    newObj[type].push(name);
    log(`Added "${name}" to "${type}"`, 1);
};

(async () => {
    const newObj = cosmetics;

    for (const item of items) await handle(item.sku, newObj);

    for (const section of sections) {
        for (const item of section.items) await handle(item.sku, newObj);
    }

    await log(`Writing file to "${cosmeticsPath}"`);
    await writeFileSync(cosmeticsPath, JSON.stringify(newObj, null, 4));
})();