'use strict';

module.exports = {
    login: require('./login'),
    register: require('./register'),
    update: {
        profile: require('./update-profile'),
        password: require('./update-password'),
        photo: require('./update-photo')
    },
    fetch: {
        profile: require('./fetch-profile'),
        photo: require('./fetch-photo')
    },
    remove: require('./remove')
}