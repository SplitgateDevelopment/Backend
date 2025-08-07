import { Config } from "@/types/Config";

const config = {
    port: 5005,
    userConfig: {
        username: 'X_PADO_X',
        coins: 999999999,
        drops: 6969,
        levelConfig: {
            number: 40,
            currentExp: 20,
            requiredExp: 40,
        },
        proConfig: {
            tier: 1,
            level: 2,
        },
        referralData: {
            referrerId: 'PADO',
            canBeReferred: false,
            passLevel: 10,
        },
        ids: {
            steamId: 7777777,
            userId: 123,
        },
        roleId: '2251438839e948d783ec0e5281daf05b',
        profile: {
            avatar: 'https://github.githubassets.com/images/icons/emoji/trollface.png',
            friendId: 'BANANA',
            referralId: 'Campus',
        },
        battlePass: {
            level: 69,
            start: new Date('2020-01-01'),
            end: new Date('2030-01-01'),
        },
        wins: 99,
    },
    gameConfig: {
        activeChallenges: {
            daily: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            weekly: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            season: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            featured: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        seasonNumber: 999,
        challengesStatus: 'COMPLETED' 
    }
} as const satisfies Config;

export default config;