'use strict';

const {

    utils: {

        getFormattedKeys,

        getStateKeyMapperObject
    },

    constants: {

        REDUXX_SPECIAL_KEY
    }

} = require( './tools.js' );


module.exports = Object.freeze(

    function( ...stateSetObjects ) {

        const {

            reduxXCore,
            stateKeyMapper

        } = this;

        if( !reduxXCore.globalStateStorageInstance ) {

            throw new Error(

                'error in ReduxX setState: ' +
                'global state storage instance not setup'
            );
        }

        const newState = {};

        stateSetObjects.forEach( setStateData => {

            const { keys, value } = setStateData;

            const formattedKeys = getFormattedKeys({ keys });

            const stateKeyMapperObject = getStateKeyMapperObject({

                stateKeyMapper,
                keys: formattedKeys,
            });

            const stateKeyMapperValue = stateKeyMapperObject[

                REDUXX_SPECIAL_KEY
            ];

            newState[ stateKeyMapperValue ] = value;
        });

        reduxXCore.globalStateStorageInstance.setState( newState );
    }
);
