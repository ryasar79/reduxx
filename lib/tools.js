'use strict';

const utils = Object.freeze({

    getKeyName: Object.freeze( keyNumber => `key${ keyNumber }` ),
});


const constants = Object.freeze({

    REDUXX_SPECIAL_KEY: '@reduxXKey'
});


module.exports = Object.freeze({

    utils,

    constants
});
