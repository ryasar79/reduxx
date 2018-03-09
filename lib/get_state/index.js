'use strict';

const getFormattedArguments = require( './get_formatted_arguments.js' );

const {

    utils: {

        getFormattedKeys,

        getStateKeyMapperObject
    },

    constants: {

        REDUXX_SPECIAL_KEY
    }

} = require( '../tools.js' );


module.exports = Object.freeze(

    function( ...getStateArguments ) {

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

        const formattedArguments = getFormattedArguments( ...getStateArguments );

        const { keys } = formattedArguments;

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
