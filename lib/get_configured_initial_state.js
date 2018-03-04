'use strict';

const {

    utils: {

        getFormattedKeys
    }

} = require( './tools.js' );


module.exports = Object.freeze(

    ({
        initialState,

    }) => {

        if( !Array.isArray( initialState ) ) {

            // for now, just accepts array input
            throw new Error(

                'ReduxX error: invalid initial state'
            );
        }

        initialState.forEach( initialStateData => {

            const { keys } = initialStateData;

            initialStateData.keys = getFormattedKeys({ keys });
        });

        return initialState;
    }
);
