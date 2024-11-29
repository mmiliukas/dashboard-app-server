const { createHmac } = require('crypto');

module.exports = {
    parseInstance
}

function parseInstance(instance, appSecret) {
    const [hash, payload] = instance.split('.');

    if (!payload) {
        return null;
    }

    if (!validateInstance(hash, payload, appSecret)) {
        return null;
    }

    return JSON.parse(base64Decode(payload, 'utf8'));
}

function validateInstance(hash, payload, secret) {
    if (!hash) {
        return false;
    }

    hash = base64Decode(hash);

    const signedHash = createHmac('sha256', secret)
        .update(payload)
        .digest('base64');

    return hash === signedHash;
}

function base64Decode(input, encoding = 'base64') {
    return Buffer.from(
        input.replace(/-/g, '+').replace(/_/g, '/'),
        'base64'
    ).toString(encoding);
}
