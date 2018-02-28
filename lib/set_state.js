'use strict';

const tools = require( './tools.js' );

const REDUXX_SPECIAL_KEY = tools.constants.REDUXX_SPECIAL_KEY;

const getKeyName = tools.utils.getKeyName;


module.exports = Object.freeze(

    function( ...stateSetObjects ) {

        const {

            reduxXCore,
            stateKeyMapper

        } = this;

        if( !reduxXCore.globalStateComponent ) {

            throw new Error(

                'error in ReduxX setState: global state component not setup'
            );
        }

        const newState = {};

        stateSetObjects.forEach( params => {

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

                        'error in ReduxX setState: invalid key specified'
                    );
                }

                keyNumber++;
                keyName = getKeyName( keyNumber );
                paramsKey = params[ keyName ];
            }

            const value = params.value;

            const stateKeyMapperValue = currentStateKeyMapperObject[

                REDUXX_SPECIAL_KEY
            ];

            newState[ stateKeyMapperValue ] = value;
        });

        reduxXCore.globalStateComponent.setState( newState );
    }
);
