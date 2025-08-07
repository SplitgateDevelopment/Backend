interface UserData {
    username: string;
    coins?: number;
    drops?: number;
    levelConfig?: LevelConfig;
    proConfig?: ProConfig;
    ids?: UserIds;
    roleId?: string;
    profile?: UserProfile;
    battlePass?: UserBattlePass;
    wins: number;
    referralData?: UserReferralData;
};

type UserIds = {
    steamId?: number;
    userId?: number;
}

type UserProfile = {
    avatar?: string;
    friendId?: string;
    referralId?: string;
};

type UserBattlePass = {
    level?: number;
    start?: Date;
    end?: Date;
};

type UserReferralData = {
    referrerId: string;
    canBeReferred: boolean;
    passLevel: number;
}

type LevelConfig = {
    number: number;
    currentExp: number;
    requiredExp: number;
}

type ProConfig = {
    tier: number;
    level: number;
}

type userChallenge = {
    challengeId: number;
    challengeStatus: string;
    currentValue: number;
}

export {
    UserData,
    userChallenge,
}