'use strict';

const tools = require( './tools.js' );

const getKeyName = tools.utils.getKeyName;

const REDUXX_SPECIAL_KEY = tools.constants.REDUXX_SPECIAL_KEY;


module.exports = Object.freeze(

    function() {

        const {

            reduxXCore,
            initialState,
            stateKeyMapper

        } = this;

        if( !reduxXCore.globalStateComponent ) {

            throw new Error( `error in ReduxX setInitialState` );
        }

        const newState = {};

        initialState.forEach( initialStateDatum => {

            let currentKeyIndex = 1;
            let currentKeyName = getKeyName( currentKeyIndex );
            let currentInitialStateDatumKey = initialStateDatum[ currentKeyName ];
            let currentStateKeyMapperObject = stateKeyMapper[ currentInitialStateDatumKey ];

            do {

                currentKeyIndex++;
                currentKeyName = getKeyName( currentKeyIndex );
                currentInitialStateDatumKey = initialStateDatum[ currentKeyName ];

                if( !!currentInitialStateDatumKey ) {

                    currentStateKeyMapperObject = currentStateKeyMapperObject[

                        currentInitialStateDatumKey
                    ];
                }

            } while ( !!currentInitialStateDatumKey );

            const value = initialStateDatum.value;

            newState[

                currentStateKeyMapperObject[ REDUXX_SPECIAL_KEY ]

            ] = value || null;
        });

        reduxXCore.globalStateComponent.setState( newState );
    }
);
