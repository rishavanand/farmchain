'use strict';

module.exports = {
    login: require('./login'),
    register: require('./register'),
    update: {
        profile: require('./update-profile'),
        photo: require('./update-photo'),
        password: require('./update-password'),
        balance: require('./update-balance')
    },
    fetch: {
        profile: require('./fetch-profile'),
        photo: require('./fetch-photo')
    },
    remove: require('./remove'),
    review: require('./review')
};