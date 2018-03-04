'use strict';

const {

    utils: {

        getStateKeyMapperObject
    },

    constants: {

        REDUXX_SPECIAL_KEY
    }

} = require( './tools.js' );


module.exports = Object.freeze(

    function() {

        const {

            reduxXCore,
            initialState,
            stateKeyMapper

        } = this;

        if( !reduxXCore.globalStateStorageInstance ) {

            throw new Error( `error in ReduxX setInitialState` );
        }

        const newState = {};

        initialState.forEach( initialStateDatum => {

            const { keys, value } = initialStateDatum;

            const stateKeyMapperObject = getStateKeyMapperObject({

                stateKeyMapper,
                keys,
            });

            newState[

                stateKeyMapperObject[ REDUXX_SPECIAL_KEY ]

            ] = value || null;
        });

        reduxXCore.globalStateStorageInstance.setState( newState );
    }
);
