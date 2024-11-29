const express = require('express');
const sdk = require('@wix/sdk');
const { emailSubscriptions } = require('@wix/email-subscriptions');
const { notificationsV3 } = require('@wix/notifications');
const { parseInstance } = require('./utils');

const router = express.Router();

router.get('/', function (req, res, next) {
    const instance = parseInstance(req.query["instance"] || "", process.env.APP_SECRET);
    const client = sdk.createClient({
        auth: sdk.AppStrategy({
            appId: instance.appDefId,
            instanceId: instance.instanceId,
            appSecret: process.env.APP_SECRET,
        }),
        modules: {
            emailSubscriptions
        }
    });

    client.emailSubscriptions.queryEmailSubscriptions({})
        .then(result => res.json(result))
        .catch((error) => {
            next(error);
        });
});

router.post('/', function (req, res, next) {
    const instance = parseInstance(req.query["instance"] || "", process.env.APP_SECRET);
    const client = sdk.createClient({
        auth: sdk.AppStrategy({
            appId: instance.appDefId,
            instanceId: instance.instanceId,
            appSecret: process.env.APP_SECRET,
        }),
        modules: {
            emailSubscriptions,
            notificationsV3,
        }
    });

    client.emailSubscriptions.upsertEmailSubscription({
        subscription: {
            email: req.body.email,
        }
    })
        .then(result => {
            client.notificationsV3.notify('cd342a34-145c-484a-897d-3bff53d9f7ec', {
                dynamicValues: {
                    email: req.body.email,
                }
            })
                .then(() => res.json(result))
                .catch(next);
        })
        .catch(next)
})

module.exports = router;
