'use strict';

module.exports = {
    create: require('./create'),
    update: {
        photo: require('./update-photo'),
        details: require('./update-details')
    },
    fetch: {
        photo: require('./fetch-photo'),
        details: require('./fetch-details'),
        names: require('./fetch-names'),
        variety: require('./fetch-variety'),
        grade: require('./fetch-grade'),
        filtered: require('./fetch-filtered')
    },
    category: require('./category'),
    remove: require('./remove')
};