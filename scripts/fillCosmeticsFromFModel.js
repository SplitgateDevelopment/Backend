const { ask, exists, log } = require("./constants");
const { join } = require("path");
const { readdirSync, writeFileSync, readFileSync } = require("fs");

const contentPath = "Output\\Exports\\PortalWars\\Content";

let elements = [
	{
		name: "Sprays",
	},
	{
		name: "Emotes",
	},
	{
		name: "Banners",
	},
	{
		name: "NameTags",
	},
	{
		name: "Portals",
	},
	{
		name: "PortalGuns",
		subs: true,
	},
	{
		name: "Jetpacks",
		subs: true,
	},
	{
		name: "Characters",
		subs: true,
	},
	{
		name: "Weapons",
		subs: true,
	},
];

const ignoredPaths = [
	"DamageTypes",
	"Elemental_Effect",
	"EMPGrenade",
	"Fists",
	"Flag",
	"FlagBase",
];
const filter = (el) => !el.startsWith("_") && !ignoredPaths.includes(el);
const removeLowDash = (x) => (x.startsWith("_") ? x.slice(1, x.length) : x);
const cosmeticsPath = join(__dirname, "../assets/json/cosmetics.json");

(async () => {
	const basePath = await ask("[?] Where is FModel installed? ");
	const path = join(basePath, contentPath);

	if (!(await exists(path))) {
		log("Path provided does not exist", 0);
		return process.exit(1);
	}

	await log(`Path found: ${path}`, 1);

	elements = [{}, {}, ...elements];
	const updatedElements = await updateSubsElements(elements, path);
	const output = await pushToOutput(updatedElements, path);

	await log("About to write");

	const oldData = await JSON.parse(readFileSync(cosmeticsPath));
	await writeFileSync(
		cosmeticsPath,
		JSON.stringify(
			{
				...oldData,
				...output,
			},
			null,
			4,
		),
	);

	await log("Done", 1);
})();

function removeLast(string) {
	return string.slice(0, string.length - 1);
}

async function updateSubsElements(elements, path) {
	const newElements = [];
	await elements.reduce(async (pre, { name, subs }) => {
		await pre;
		if (!subs)
			return newElements.push({
				name,
			});

		const elementPath = join(path, name);
		if (!(await exists(elementPath)))
			return log(`Sub path ${elementPath} does not exist`, 0);

		const data = readdirSync(elementPath).filter(filter);
		data.forEach((d) =>
			newElements.push({
				name: join(name, d),
			}),
		);
	});
	return newElements;
}

async function pushToOutput(elements, path) {
	const output = {};
	await elements.reduce(async (pre, { name }) => {
		await pre;
		log(`Looking for element: ${name}`);

		const elementPath = join(path, name);
		if (!(await exists(elementPath)))
			return log(`${name} element does not exist`, 0);

		const splittedName = name.split("\\");
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

		const names = await readdirSync(elementPath)
			.filter(filter)
			.map((name) => name.split(".")[0]);

		if (!names.includes("Skins")) {
			log("Element does not have skins");

			await names
				.map(removeLowDash)
				.forEach((x) =>
					output[key].push(x.startsWith(`${el}_`) ? x : `${el}_${x}`),
				);

			return log(`Updated ${name}`, 1);
		}

		log("Element has skins");

		const skins = await readdirSync(join(elementPath, "Skins"));
		await skins
			.map(removeLowDash)
			.forEach((skin) => output[key].push(`${el}_${skin}`));

		return log(`Updated ${name}`, 1);
	});
	return output;
}
