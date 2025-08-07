import { decodeWS, randomInt, randomString, sendWS } from '@/lib/utils';
import badges from '@assets/json/badges.json';

import { WebSocketEvent } from "@/types/WS";
import config from '@/config';

let partyId = ""

const onMessage: WebSocketEvent<'onMessage'> = ({ data }, ws) => {
    const decoded = decodeWS(data.toString());
    if (!decoded.type) return;

    console.log(`[WS]`, `Message ${decoded.type} received 📬`);

    const { ids, levelConfig, proConfig, battlePass } = config.userConfig;
    const userId = ids?.userId || 123;

    switch (decoded.type) {
        case "listOfFriendsRequest":
            return sendWS(ws, {
                type: "listOfFriendsResponse",
                code: 0,
                friendsId: [randomString(8),],
                id: decoded.id
            });
        case "listIncomingFriendsRequest":
            return sendWS(ws, {
                type: "listIncomingFriendsResponse",
                code: 0,
                friendsId: [],
                id: decoded.id
            });
        case "listOutgoingFriendsRequest":
            return sendWS(ws, {
                type: "listOutgoingFriendsResponse",
                code: 0,
                friendsId: [],
                id: decoded.id
            });
        case "partyInfoRequest":
            return sendWS(ws, {
                type: "partyInfoResponse",
                id: decoded.id,
                code: randomInt(1000, 9999),
                partyID: partyId,
                leaderID: "",
                members: [],
                invitees: [],
                invitationToken: "",
                matchmakingTicketID: "",
                custom_attributes: null,
                updatedAt: 0
            });
        case "partyCreateRequest":
            partyId = randomString(10);
            sendWS(ws, {
                type: "partyCreateResponse",
                id: decoded.id,
                code: 0,
                partyID: partyId,
                leaderID: userId,
                members: [userId,],
                invitees: [],
                invitationToken: randomString(8),
                partyCode: randomString(10),
            });
            sendWS(ws, {
                type: "partyDataUpdateNotif",
                partyId: partyId,
                leader: userId,
                namespace: "splitgate",
                members: [userId,],
                invitees: [],
                custom_attribute: {},
                updatedAt: Date.now(),
            });
            break;
        case "partySendNotifRequest":
            return sendWS(ws, {
                type: "partySendNotifResponse",
                id: decoded.id,
                code: 0,
            });
        case "partyGetCodeRequest":
            const code = randomString(10); 
            sendWS(ws, {
                type: "partyGetCodeResponse",
                id: decoded.id,
                code: 0,
                partyCode: code,
            });

            const sessionId = randomString(10);
            sendWS(ws, {
                type: "messageNotif",
                id: randomString(10),
                from: "system",
                to: userId,
                topic: "sessionNativePlatformNotification",
                payload: {"platform_name":"STEAM","platform_session_id": sessionId,"namespace":"splitgate","session_type":"party"},
                sentAt: new Date().toISOString(),
            });
            sendWS(ws, {
                type: "partyDataUpdateNotif",
                partyId: partyId,
                leader: userId,
                namespace: "splitgate",
                members: [userId],
                invitees: [],
                custom_attribute: {
                    "ABPARTYCODE_s": code,
                    "crossplayPlatformMap_j":{
                        [userId]: {
                            "crossplay":true,
                            "platform":"steam",
                        }
                    }
                },
                updatedAt: Date.now(),
            });
            sendWS(ws, {
                type: "partyDataUpdateNotif",
                partyId: partyId,
                leader: userId,
                namespace: "splitgate",
                members: [userId],
                invitees: [],
                custom_attribute: {
                    "ABPARTYCODE_s": code,
                    "crossplayPlatformMap_j":{
                        [userId]: {
                            "crossplay":true,
                            "platform":"steam",
                        }
                    },
                    ABSESSIONID_s: sessionId,
                },
                updatedAt: Date.now(),
            });

            const progression = {
                "progression": {
                    "exp": levelConfig?.currentExp,
                    "requiredExp": levelConfig?.requiredExp,
                    "level": levelConfig?.number,
                    "proTier": proConfig?.tier,
                    "proLevel": proConfig?.level
                },
                "seasonPassProgression": {
                    "exp": 69,
                    "requiredExp":420,
                    "level": battlePass?.level,
                    "proTier": -1,
                    "proLevel": 100,
                },
                "userId": userId
            };

            sendWS(ws, {
                type: "messageNotif",
                id: randomString(10),
                from: "system",
                to: userId,
                topic: "UserProgressionUpdate",
                payload: progression,
                sentAt: new Date().toISOString(),
            });
            sendWS(ws, {
                type: "messageNotif",
                id: randomString(10),
                from: "system",
                to: userId,
                topic: "UserProgressionForPartyUpdate",
                payload: progression,
                sentAt: new Date().toISOString(),
            });

            const badgeNotification = {
                type: "messageNotif",
                id: randomString(10),
                from: "system",
                to: userId,
                payload: {
                    ...badges,
                    userId: userId
                }
            };

            sendWS(ws, {
                ...badgeNotification,
                topic: "UserBadgesUpdate",
            });
            sendWS(ws, {
                ...badgeNotification,
                topic: "UserBadgesForPartyUpdate",
            });
            break;
        default:
            console.log(`[WS]`, `Unknown message type ${decoded.type}, ignoring...`);
            return sendWS(ws, {
                type: decoded.type.replace("Request", "Response"),
                id: decoded.id,
                code: 0,
            });
    };
}

export default onMessage