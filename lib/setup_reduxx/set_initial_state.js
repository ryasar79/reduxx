'use strict';

const {

    utils: {

        getStateKeyMapperObject
    },

    constants: {

        REDUXX_SPECIAL_KEY,
    }

} = require( '../tools.js' );


module.exports = Object.freeze(

    ({

        globalStateStorageInstance,
        initialState,
        stateKeyMapper

    }) => {

        const newState = {};

        initialState.forEach( initialStateDatum => {

            const { keys, value } = initialStateDatum;

            const stateKeyMapperObject = getStateKeyMapperObject({

                stateKeyMapper,
                keys,
            });

            newState[

                stateKeyMapperObject[ REDUXX_SPECIAL_KEY ]

            ] = value;
        });

        globalStateStorageInstance.state = Object.assign(

            {},

            globalStateStorageInstance.state || {},

            newState
        );
    }
);
