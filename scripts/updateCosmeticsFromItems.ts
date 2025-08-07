import { writeFileSync } from "fs";
import { join } from "path";
import cosmetics from "../assets/json/cosmetics.json";
import { log } from "./constants";

const cosmeticsPath = join(__dirname, "../assets/json/cosmetics.json");
const binPath = "bin";

function handle(sku: string, newObj: { [key: string]: string[] }): void {
	const [type, name] = sku.split("-");

	if (type === "bundle") {
		log("Skipped bundle");
		return;
	}

	if (!newObj[type]) {
		log(`Type "\${type}" not found in newObject`, 0);
		return;
	}

	if (newObj[type].includes(name)) {
		log(
			`Item "\${name}" is already in \${cosmeticsPath.split("\\\\").pop()}`,
			0,
		);
		return;
	}

	newObj[type].push(name);
	log(`Added "\${name}" to "\${type}"`, 1);
}

(async () => {
	const newObj = { ...cosmetics };
	const items = await import(`./${binPath}/items.json`);
	const sections = await import(`./${binPath}/items.json`);

	for (const item of items) handle(item.sku, newObj);

	for (const section of sections) {
		for (const item of section.items) handle(item.sku, newObj);
	}

	log(`Writing file to "\${cosmeticsPath}"`);
	writeFileSync(cosmeticsPath, JSON.stringify(newObj, null, 4));
})();
