'use strict';

module.exports = {
    login: require('./login'),
    register: require('./register'),
    update: {
        profile: require('./update-profile'),
        photo: require('./update-photo'),
        password: require('./update-password'),
    },
    fetch: {
        profile: require('./fetch-profile'),
        photo: require('./fetch-photo')
    },
    remove: require('./remove')
};