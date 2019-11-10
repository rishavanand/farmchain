'use strict';

module.exports = {
    login: require('./login'),
    register: require('./register'),
    update: {
        profile: require('./update-profile'),
        password: require('./update-password'),
        photo: require('./update-photo'),
        balance: require('./update-balance')
    },
    fetch: {
        profile: require('./fetch-profile'),
        photo: require('./fetch-photo'),
        review: require('./fetch-review')
    },
    remove: require('./remove')
}