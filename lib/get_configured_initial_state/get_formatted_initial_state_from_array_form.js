'use strict';

const {

    utils: {

        getFormattedKeys
    }

} = require( '../tools.js' );


module.exports = Object.freeze(

    ({
        initialState,

    }) => {

        const formattedInitialState = [];

        initialState.forEach( ({ keys, value }) => {

            const formattedInitialStateData = {

                keys: getFormattedKeys({ keys }),

                value,
            };

            formattedInitialState.push( formattedInitialStateData );
        });

        return formattedInitialState;
    }
);
