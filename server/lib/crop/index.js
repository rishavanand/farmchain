'use strict';

module.exports = {
    create: require('./create'),
    update: {
        photo: require('./update-photo'),
        details: require('./update-details')
    },
    fetch: {
        photo: require('./fetch-photo'),
        details: require('./fetch-details')
    },
    remove: require('./remove')
};