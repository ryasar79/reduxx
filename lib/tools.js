'use strict';

const createGuidComponent = Object.freeze(

    () => Math.floor(

        (1 + Math.random()) * 0x10000

    ).toString(16).substring(1)
);


const utils = Object.freeze({

    getKeyName: Object.freeze( keyNumber => `key${ keyNumber }` ),

    getGuid: Object.freeze( () => {

        return (

            createGuidComponent() +
            `${ createGuidComponent() }-` +
            `${ createGuidComponent() }-` +
            `${ createGuidComponent() }-` +
            `${ createGuidComponent() }-` +
            createGuidComponent() +
            createGuidComponent() +
            createGuidComponent()
        );
    }),
});


const constants = Object.freeze({

    REDUXX_SPECIAL_KEY: '@reduxXKey'
});


module.exports = Object.freeze({

    utils,

    constants
});
