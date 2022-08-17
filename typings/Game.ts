type server = {
    alias: string;
    region: string;
    ip: string;
    port: number;
    last_update: string;
    status: string
};

type challenge = {
    challengeIds: number[];
    currentPhase: number;
    expirationTimeMs: number;
    isActive: boolean;
}

type challengesKey = 'daily' | 'weekly' | 'season' | 'featured';

type GameData = {
    activeChallenges: {
        [key: string]: number[];
    },
    seasonNumber: number;
    challengesStatus: string;
}

type item = {
    "title": string,
    "itemId": string,
    "sku": string,
    "namespace": "splitgate",
    "name": string,
    "entitlementType": string,
    "categoryPath": string,
    "status": "ACTIVE",
    "listable": boolean,
    "purchasable": boolean,
    "itemType": "CUSTOMIZATION",
    "thumbnailUrl": string,
    "regionData":
    [
        {
            "price": number,
            "discountPercentage": number,
            "discountAmount": number,
            "discountedPrice": number,
            "currencyCode": "SC",
            "currencyType": "VIRTUAL",
            "currencyNamespace": "splitgate"
        }
    ],
    "boundItemIds": string[],
    "maxCountPerUser": number,
    "maxCount": number,
    "displayOrder": number,
    "ext":
    {
        "meshName": string
    },
    "rarity": string,
    "customizationType": string,
    "availability":
    {
        "availability": "Normal" | string
    },
    "region": "US",
    "language": "en",
    "createdAt": "2022-07-28T04:01:31.876Z",
    "updatedAt": "2022-08-14T20:49:02.320Z"
}

export {
    server,
    challenge,
    challengesKey,
    GameData,
    item,
}