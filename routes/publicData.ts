import Route from "../core/Route";
import { Request, Response, Router } from "express";
import playlistJSON from "../assets/json/playlist.json";
import challenges from "../assets/json/challenges.json";
import badges from "../assets/json/badges.json";
import stats from "../assets/json/stats.json";
import config from "../config";
import { challenge } from "../typings/Game";
import { userChallenge } from "../typings/User";

const router = Router();
const { activeChallenges, challengesStatus } = config.gameConfig;

router.get('/playlist/config', (req: Request, res: Response) => {
    return res.status(200).json(playlistJSON);
});

router.get('/challenges', (req: Request, res: Response) => {
    return res.status(200).json(challenges);
});

router.get('/challenges/state', (req: Request, res: Response) => {
    const date = new Date();
    date.setHours(date.getHours() + 2);

    let data: {
        [key in string]: challenge;
    } = {};

    Object.keys(config.gameConfig.activeChallenges)
    .forEach((key) => {
        data[key] = {
            challengeIds: config.gameConfig.activeChallenges[key],
            currentPhase: 1,
            expirationTimeMs: date.getTime(),
            isActive: true,
        };
    });

    return res.status(200).json(data);
});

router.get('/stats/users/placementGamesNeeded', (req: Request, res: Response) => {
    return res.status(200).json({
        RANKED_TEAM_HARDCORE: 1,
        RANKED_TEAM_TAKEDOWN: 1,
        UNRANKED: 1,
    });
});

router.get('/seasons/current/name', (req: Request, res: Response) => {
    return res.status(200)
    .setHeader('content-type', 'text/plain')
    .send(`season${config.gameConfig.seasonNumber}`);
});

router.get(`/users/:id/race`, async (req: Request, res: Response) => {
    return res.status(200).json({
        bestTimes: {},
        platform: req.query.platform ?? 'STEAM',
        userId: req.params.id
    });
})

router.post(`/users/:id/race`, async (req: Request, res: Response) => {
    return res.status(204);
})

router.get(`/users/:id/challenges/`, async (req: Request, res: Response) => {
    let data: {[key: string]: userChallenge[]} = {};

    Object.keys(activeChallenges)
    .forEach((key) => {
        data[key] = [];
        activeChallenges[key]
        .forEach(challenge => {
            data[key].push({
                challengeId: challenge,
                challengeStatus: challengesStatus,
                currentValue: 99
            })
        });
    })

    return res.status(200).json(data);
})

router.post('/users/:id/challenges/claim-reward', async (req: Request, res: Response) => {
    return res.status(204);
});

router.get('/badges/users', async (req: Request, res: Response) => {
    //set badge visibility to "Hidden" in order to hide it
    return res.status(200).json({
        [req.query.userIds as string]: {
            ...badges,
            userId: req.query.userIds,
        }
    });
});

router.get('/stats/users/account', async (req: Request, res: Response) => {
    stats.seasonStats[0].seasonName = `season${config.gameConfig.seasonNumber}`;
    return res.status(200).json({
        [req.query.userIds as string]: {
            ...stats,
            userId: req.query.userIds,
        }
    });
});

router.get('/users/:id/seasonreward', async (req: Request, res: Response) => {
    return res.status(200).json({
        level: 0,
        winCount: 0
    });
});

router.get('/users/:id/dailyPlayStreak', async (req: Request, res: Response) => {
    return res.status(200).json({
        "userId": req.params.id,
        "value":0,
        "xpBoostPercentage":0,
        "previousValue":0,
        "previousValueExpiresAtMs":0,
        "hasPlayedToday": true,
    });
});

router.get('/users/:id/dailyCheckIn/status', async (req: Request, res: Response) => {
    const today = new Date().getDay();
    const day = today == 0 ? 7 : today;

    return res.status(200).json({
        "dayOfWeek": day,
        "daysClaimedCount": 0,
        "daysMissedCount": day-1,
        "weekExpiresAtMs": Date.now() + (7 - today * 24 * 60 * 60 * 1000),
    });
});

export default new Route({
    url: '/splitgate/public/namespaces/splitgate/',
    router,
})