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

    function( params ) {

        const {

            reduxXCore,
            stateKeyMapper

        } = this;

        if( !reduxXCore.globalStateStorageInstance ) {

            throw new Error(

                'error in ReduxX getState: ' +
                'global state storage instance not set'
            );
        }

        const { keys } = params;

        const formattedKeys = getFormattedKeys({ keys });

        const stateKeyMapperObject = getStateKeyMapperObject({

            stateKeyMapper,
            keys: formattedKeys,
        });

        const stateValue = reduxXCore.globalStateStorageInstance.state[

            stateKeyMapperObject[ REDUXX_SPECIAL_KEY ]
        ];

        return stateValue;
    }
);
