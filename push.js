var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BMA1Dadt3cLMRfxWpYYZ2xWUyb5S4P2i5JyFytRjhvarGpKMD0EaDX1OKEYvzxnK38hPmgkgCqv-CyfBsfGF-I0",
    "privateKey": "WJdqafK0XZ852GkYOx3JhxXAgTKTC7CdcnkeFe8Zmy0"
};
webPush.setVapidDetails(
    'mailto:putuekamulyana97@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/eW-GN8puQJk:APA91bFRUmIedkteoNsII7FXqKRQ3G-AaIzdjaDu8_idVCNTSB9GOSVJGRPrgMq7ovAqgnHjTTo926cwoBYnG5hhA5VwGi_GAQh-8kFQFSIzVhZBZUp3DdGo84WYhlEiN3VspAZ7VVdV",
    "keys": {
        "p256dh": "BEzkcHUm12Yuc/Xgrftn6WK6AytLS9wal5ffPtVSBk7iJwHKnerWBdyhGBKbMoL6olymg2Nd40qCHZqjeM2hgis=",
        "auth": "QGvTNwsFliNw7sR7HBgj6w=="
    }
};
var payload = 'Ada Jadwal Compotensi Baru!';
var options = {
    gcmAPIKey: '580211239650',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);