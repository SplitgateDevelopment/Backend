type server = {
	alias: string;
	region: string;
	ip: string;
	port: number;
	last_update: string;
	status: string;
};

type challenge = {
	challengeIds: number[];
	currentPhase: number;
	expirationTimeMs: number;
	isActive: boolean;
};

type challengesKey = "daily" | "weekly" | "season" | "featured";

type GameData = {
	activeChallenges: {
		[key: string]: number[];
	};
	seasonNumber: number;
	challengesStatus: string;
};

type item = {
	title: string;
	itemId: string;
	sku: string;
	namespace: "splitgate";
	name: string;
	entitlementType: string;
	categoryPath: string;
	status: "ACTIVE";
	listable: boolean;
	purchasable: boolean;
	itemType: "CUSTOMIZATION";
	thumbnailUrl: string;
	regionData: [
		{
			price: number;
			discountPercentage: number;
			discountAmount: number;
			discountedPrice: number;
			currencyCode: "SC";
			currencyType: "VIRTUAL";
			currencyNamespace: "splitgate";
		},
	];
	boundItemIds: string[];
	maxCountPerUser: number;
	maxCount: number;
	displayOrder: number;
	ext: {
		meshName: string;
	};
	rarity: string;
	customizationType: string;
	availability: {
		availability: "Normal" | string;
	};
	region: "US";
	language: "en";
	createdAt: string;
	updatedAt: string;
};

type feedItem = {
	startAt: string;
	endAt: string;
	title: { en: string };
	description: { en: string };
	imageUrl: string;
	actionType: string;
	actionTitle: { en: string };
	actionValue: string;
	draft: boolean;
};

type viewInfo = {
	title: string;
	viewId: string;
	namespace: string;
	name: string;
	displayOrder: number;
	createdAt?: string;
	updatedAt?: string;
};

type viewItem = {
	title: string;
	itemId: string;
	sku: string;
	namespace: "splitgate";
	name: string;
	entitlementType: string;
	categoryPath: string;
	status: string;
	listable: boolean;
	purchasable: boolean;
	itemType: string;
	thumbnailUrl: string;
	regionData: [
		{
			price: number;
			discountPercentage: number;
			discountAmount: number;
			discountedPrice: number;
			currencyCode: "SC";
			currencyType: "VIRTUAL";
			currencyNamespace: "splitgate";
		},
	];
	maxCountPerUser: 1;
	maxCount: -1;
	displayOrder: number;
	ext: { meshName: string };
	rarity: string;
	customizationType: string;
	availability: { availability: string };
	region: string;
	language: string;
	updatedAt?: string;
	createdAt?: string;
};

export type {
	server,
	challenge,
	challengesKey,
	GameData,
	item,
	feedItem,
	viewInfo,
	viewItem,
};
