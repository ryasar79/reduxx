'use strict';

const { utils, constants } = require( './tools.js' );

const { REDUXX_SPECIAL_KEY } = constants;

const { getKeyName, getGuid } = utils;

const getBaseStateKeyMapperObject = Object.freeze(

    value => {

        const baseStateKeyMapperObject = {};

        baseStateKeyMapperObject[ REDUXX_SPECIAL_KEY ] = value;

        return baseStateKeyMapperObject;
    }
);


module.exports = Object.freeze(

    ({

        initialState,
        obscureStateKeys = false

    }) => {

        const stateKeyMapper = {};

        initialState.forEach( initialStateData => {

            const key1 = initialStateData.key1;

            if( !key1 ) {

                throw new Error( 'incorrect ReduxX initial state setup' );
            }

            let currentStateKeyValue = !obscureStateKeys ? key1 : getGuid();

            stateKeyMapper[ key1 ] = stateKeyMapper[ key1 ] || (

                getBaseStateKeyMapperObject( currentStateKeyValue )
            );

            let lastStateKeyMapperObject = stateKeyMapper[ key1 ];
            let currentKeyNumber = 2;
            let currentKeyName = getKeyName( currentKeyNumber );
            let currentKey = initialStateData[ currentKeyName ];

            while( !!currentKey ) {

                if( !obscureStateKeys ) {

                    currentStateKeyValue += `-${ currentKey }`
                }
                else {

                    currentStateKeyValue = getGuid();
                }

                lastStateKeyMapperObject[ currentKey ] = (

                    lastStateKeyMapperObject[ currentKey ]

                ) || (

                    getBaseStateKeyMapperObject( currentStateKeyValue )
                );

                lastStateKeyMapperObject = (

                    lastStateKeyMapperObject[ currentKey ]
                );
                currentKeyNumber++
                currentKeyName = getKeyName( currentKeyNumber );
                currentKey = initialStateData[ currentKeyName ];
            }
        });

        return stateKeyMapper;
    }
);
