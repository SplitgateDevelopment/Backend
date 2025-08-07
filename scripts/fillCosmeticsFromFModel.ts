import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { ask, exists, LogType, log } from "./constants";

const contentPath = "Output\\\\Exports\\\\PortalWars\\\\Content";

interface Element {
	name: string;
	subs?: boolean;
}

let elements: Element[] = [
	{ name: "Sprays" },
	{ name: "Emotes" },
	{ name: "Banners" },
	{ name: "NameTags" },
	{ name: "Portals" },
	{ name: "PortalGuns", subs: true },
	{ name: "Jetpacks", subs: true },
	{ name: "Characters", subs: true },
	{ name: "Weapons", subs: true },
];

const ignoredPaths = [
	"DamageTypes",
	"Elemental_Effect",
	"EMPGrenade",
	"Fists",
	"Flag",
	"FlagBase",
];
const filter = (el: string) =>
	!el.startsWith("_") && !ignoredPaths.includes(el);
const removeLowDash = (x: string) => (x.startsWith("_") ? x.slice(1) : x);
const cosmeticsPath = join(__dirname, "../assets/json/cosmetics.json");

(async () => {
	const basePath = await ask("[?] Where is FModel installed? ");
	const path = join(basePath, contentPath);

	if (!(await exists(path))) {
		log("Path provided does not exist", LogType.ERROR);
		process.exit(1);
	}

	log(`Path found: ${path}`, LogType.SUCCESS);

	elements = [{ name: "" }, { name: "" }, ...elements];
	const updatedElements = await updateSubsElements(elements, path);
	const output = await pushToOutput(updatedElements, path);

	log("About to write");

	const oldData = JSON.parse(readFileSync(cosmeticsPath, "utf-8"));
	writeFileSync(
		cosmeticsPath,
		JSON.stringify({ ...oldData, ...output }, null, 4),
	);

	log("Done", LogType.SUCCESS);
})();

function removeLast(str: string): string {
	return str.slice(0, -1);
}

async function updateSubsElements(
	elements: Element[],
	path: string,
): Promise<Element[]> {
	const newElements: Element[] = [];
	for (const { name, subs } of elements) {
		if (!subs) {
			newElements.push({ name });
			continue;
		}

		const elementPath = join(path, name);
		if (!(await exists(elementPath))) {
			log(`Sub path ${elementPath} does not exist`, LogType.ERROR);
			continue;
		}

		const data = readdirSync(elementPath).filter(filter);
		data.forEach((d) => newElements.push({ name: join(name, d) }));
	}
	return newElements;
}

async function pushToOutput(
	elements: Element[],
	path: string,
): Promise<Record<string, string[]>> {
	const output: Record<string, string[]> = {};

	for (const { name } of elements) {
		log(`Looking for element: ${name}`);

		const elementPath = join(path, name);
		if (!(await exists(elementPath))) {
			log(`${name} element does not exist`, LogType.ERROR);
			continue;
		}

		const splittedName = name.split("\\\\");
		splittedName[0] = removeLast(splittedName[0]);

		let key = splittedName[0];
		let el = splittedName.join("_");

		if (key === "Weapon") {
			key = splittedName[1];
			el = key;
		}
		if (key === "Character") key = "Armor";
		if (key === "RailGun") {
			key = "Railgun";
			el = key;
		}
		if (key === "SniperRifle") {
			key = "Sniper";
			el = key;
		}

		log(`Using key: "${key}"`);
		if (!output[key]) output[key] = [];

		const names = readdirSync(elementPath)
			.filter(filter)
			.map((name) => name.split(".")[0]);

		if (!names.includes("Skins")) {
			log("Element does not have skins");
			names.map(removeLowDash).forEach((x) => {
				output[key].push(x.startsWith(`${el}_`) ? x : `${el}_${x}`);
			});
			log(`Updated ${name}`, LogType.SUCCESS);
			continue;
		}

		log("Element has skins");
		const skins = readdirSync(join(elementPath, "Skins"));
		skins
			.map(removeLowDash)
			.forEach((skin) => output[key].push(`${el}_${skin}`));
		log(`Updated ${name}`, LogType.SUCCESS);
	}

	return output;
}
