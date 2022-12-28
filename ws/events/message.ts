import Utils from "../../core/Utils";
import { eventHandler } from "../../typings/WS";
import badges from '../../assets/json/badges.json';

export default {
    name: "message",
    handler: (server, ws, data: Buffer|ArrayBuffer|Buffer[], isBinary: boolean) => {        
        if (isBinary) return console.log(`[WS]`, `Binary data received, ignoring...`);

        const decoded = Utils.decodeWS(data.toString());
        if (!decoded.type) return;

        console.log(`[WS]`, `Message ${decoded.type} received 📬`);

        const { userConfig } = server.config;
        const { ids, levelConfig, proConfig, battlePass } = userConfig;
        const userId = ids?.userId || 123;

        switch (decoded.type) {
            case "listOfFriendsRequest":
                return Utils.sendWS(ws, {
                    type: "listOfFriendsResponse",
                    code: 0,
                    friendsId: [Utils.randomString(8),],
                    id: decoded.id
                });
            case "listIncomingFriendsRequest":
                return Utils.sendWS(ws, {
                    type: "listIncomingFriendsResponse",
                    code: 0,
                    friendsId: [],
                    id: decoded.id
                });
            case "listOutgoingFriendsRequest":
                return Utils.sendWS(ws, {
                    type: "listOutgoingFriendsResponse",
                    code: 0,
                    friendsId: [],
                    id: decoded.id
                });
            case "partyInfoRequest":
                return Utils.sendWS(ws, {
                    type: "partyInfoResponse",
                    id: decoded.id,
                    code: Utils.randomInt(1000, 9999),
                    partyID: "",
                    leaderID: "",
                    members: [],
                    invitees: [],
                    invitationToken: "",
                    matchmakingTicketID: "",
                    custom_attributes: null,
                    updatedAt: 0
                });
            case "partyCreateRequest":
                server.partyId = Utils.randomString(10);
                Utils.sendWS(ws, {
                    type: "partyCreateResponse",
                    id: decoded.id,
                    code: 0,
                    partyID: server.partyId,
                    leaderID: userId,
                    members: [userId,],
                    invitees: [],
                    invitationToken: Utils.randomString(8),
                    partyCode: Utils.randomString(10),
                });
                Utils.sendWS(ws, {
                    type: "partyDataUpdateNotif",
                    partyId: server.partyId,
                    leader: userId,
                    namespace: "splitgate",
                    members: [userId,],
                    invitees: [],
                    custom_attribute: {},
                    updatedAt: Date.now(),
                });
                break;
            case "partySendNotifRequest":
                return Utils.sendWS(ws, {
                    type: "partySendNotifResponse",
                    id: decoded.id,
                    code: 0,
                });
            case "partyGetCodeRequest":
                const code = Utils.randomString(10); 
                Utils.sendWS(ws, {
                    type: "partyGetCodeResponse",
                    id: decoded.id,
                    code: 0,
                    partyCode: code,
                });

                const sessionId = Utils.randomString(10);
                Utils.sendWS(ws, {
                    type: "messageNotif",
                    id: Utils.randomString(10),
                    from: "system",
                    to: userId,
                    topic: "sessionNativePlatformNotification",
                    payload: {"platform_name":"STEAM","platform_session_id": sessionId,"namespace":"splitgate","session_type":"party"},
                    sentAt: new Date().toISOString(),
                });
                Utils.sendWS(ws, {
                    type: "partyDataUpdateNotif",
                    partyId: server.partyId,
                    leader: userId,
                    namespace: "splitgate",
                    members: [userId,],
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
                Utils.sendWS(ws, {
                    type: "partyDataUpdateNotif",
                    partyId: server.partyId,
                    leader: userId,
                    namespace: "splitgate",
                    members: [userId,],
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

                Utils.sendWS(ws, {
                    type: "messageNotif",
                    id: Utils.randomString(10),
                    from: "system",
                    to: userId,
                    topic: "UserProgressionUpdate",
                    payload: progression,
                    sentAt: new Date().toISOString(),
                });
                Utils.sendWS(ws, {
                    type: "messageNotif",
                    id: Utils.randomString(10),
                    from: "system",
                    to: userId,
                    topic: "UserProgressionForPartyUpdate",
                    payload: progression,
                    sentAt: new Date().toISOString(),
                });

                const badgeNotification = {
                    type: "messageNotif",
                    id: Utils.randomString(10),
                    from: "system",
                    to: userId,
                    payload: {
                        ...badges,
                        userId: userId
                    }
                };

                Utils.sendWS(ws, {
                    ...badgeNotification,
                    topic: "UserBadgesUpdate",
                });
                Utils.sendWS(ws, {
                    ...badgeNotification,
                    topic: "UserBadgesForPartyUpdate",
                });
                break;
            default:
                console.log(`[WS]`, `Unknown message type ${decoded.type}, ignoring...`);
                return Utils.sendWS(ws, {
                    type: decoded.type.replace("Request", "Response"),
                    id: decoded.id,
                    code: 0,
                });
        };
    }
} as eventHandler