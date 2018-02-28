'use strict';

const tools = require( './tools.js' );

const REDUXX_SPECIAL_KEY = tools.constants.REDUXX_SPECIAL_KEY;

const getKeyName = tools.utils.getKeyName;

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

    }) => {

        const stateKeyMapper = {};

        initialState.forEach( initialStateData => {

            const key1 = initialStateData.key1;

            if( !key1 ) {

                throw new Error( 'incorrect ReduxX initial state setup' );
            }

            let currentStateKeyValue = key1;

            stateKeyMapper[ key1 ] = stateKeyMapper[ key1 ] || (

                getBaseStateKeyMapperObject( currentStateKeyValue )
            );

            let lastStateKeyMapperObject = stateKeyMapper[ key1 ];
            let currentKeyNumber = 2;
            let currentKeyName = getKeyName( currentKeyNumber );
            let currentKey = initialStateData[ currentKeyName ];

            while( !!currentKey ) {

                currentStateKeyValue += `-${ currentKey }`

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
