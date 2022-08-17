import Route from "../core/Route";
import { Request, Response, Router } from "express";
import pkg from "../package.json";

const router = Router();

router.get('/streamStatus', (req: Request, res: Response) => {
    return res.status(200).json({
	    "imageUrl": `https://github.githubassets.com/images/icons/emoji/trollface.png`,
        "actionTitle":
        {
            "en": "See GitHub ORG.",
            "de": "Jetzt auf GitHub zuschauen",
            "es": "Ver ahora en GitHub",
            "es-419": "Ver ahora en GitHub",
            "fr": "Regarder maintenant sur GitHub",
            "it": "Guarda ora su GitHub",
            "ja": "今すぐGitHubで視聴する",
            "ko": "지금 GitHub에서 시청하세요",
            "pl": "Oglądaj teraz na GitHub",
            "pt": "Ver Agora No GitHub",
            "pt-BR": "Assista agora no GitHub",
            "ro": "Urmărește acum pe GitHub",
            "ru": "Смотри в GitHub",
            "tr": "Şimdi GitHub Üzerinden İzle",
            "zh-Hant": "在 GitHub 上立即觀看"
        },
        "actionValue": "https://www.github.com/splitgatedevelopment/backend",
        "isLive": true
    });
});

router.get('/feedStatus', (req: Request, res: Response) => {
    return res.status(200).json([
        {
            "startAt": new Date().toISOString(),
            "endAt": new Date('2030-01-20').toISOString(),
            "title":
            {
                "en": "Splitgate Private Server",
            },
            "description":
            {
                "en": `Wow really cool server\n\nVersion: ${pkg.version}`
            },
            "imageUrl": 'https://github.githubassets.com/images/icons/emoji/trollface.png',            
            "actionType": "URL",
            "actionTitle":
            {
                "en": "Follow us on Github"
            },
            "actionValue": "https://www.github.com/splitgatedevelopment",
            "draft": false
        }
    ]);
});

export default new Route({
    url: '/basic/public/namespaces/splitgate/',
    router,
})