'use strict';

module.exports = {
    buy: require('./buy'),
    fetch: {
        list: require('./fetch-list'),
        pendingCount: require('./fetch-pending')
    },
    approve: require('./approve')
};