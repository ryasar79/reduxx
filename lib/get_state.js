'use strict';

const tools = require( './tools.js' );

const REDUXX_SPECIAL_KEY = tools.constants.REDUXX_SPECIAL_KEY;

const getKeyName = tools.utils.getKeyName;


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

        let keyNumber = 1;
        let keyName = getKeyName( keyNumber );
        let paramsKey = params[ keyName ];
        let currentStateKeyMapperObject = stateKeyMapper;

        while( !!paramsKey ) {

            currentStateKeyMapperObject = currentStateKeyMapperObject[

                paramsKey
            ];

            if( !currentStateKeyMapperObject ) {

                throw new Error(

                    'error in ReduxX getState: invalid key(s) specified'
                );
            }

            keyNumber++;
            keyName = getKeyName( keyNumber );
            paramsKey = params[ keyName ];
        }

        const stateValue = reduxXCore.globalStateStorageInstance.state[

            currentStateKeyMapperObject[ REDUXX_SPECIAL_KEY ]
        ];

        return stateValue;
    }
);
