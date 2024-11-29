const express = require('express');
const sdk = require('@wix/sdk');
const { emailSubscriptions } = require('@wix/email-subscriptions');
const { parseInstance } = require('./utils');

const router = express.Router();

router.get('/', function (req, res, next) {
    const instance = parseInstance(req.query["instance"] || "", process.env.APP_SECRET);
    const client = sdk.createClient({
        auth: sdk.AppStrategy({
            appId: instance.appId,
            instanceId: instance.instanceId,
            appSecret: process.env.APP_SECRET,
        }),
        modules: {
            emailSubscriptions
        }
    });

    client.emailSubscriptions.queryEmailSubscriptions()
        .then(result => res.json(result))
        .catch(next)
});

router.post('/', function (req, res, next) {
    const instance = parseInstance(req.query["instance"] || "", process.env.APP_SECRET);
    const client = sdk.createClient({
        auth: sdk.AppStrategy({
            appId: instance.appId,
            instanceId: instance.instanceId,
            appSecret: process.env.APP_SECRET,
        }),
        modules: {
            emailSubscriptions
        }
    });

    client.emailSubscriptions.upsertEmailSubscription({
        subscription: {
            email: req.body.email,
        }
    })
        .then(result => res.json(result))
        .catch(next)
})

module.exports = router;
