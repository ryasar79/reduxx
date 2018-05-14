'use strict';

const {

    utils: {

        getGuid
    },

    constants: {

        REDUXX_SPECIAL_KEY
    }

} = require( './tools.js' );


const getBaseStateKeyMapperObject = Object.freeze(

    value => {

        const baseStateKeyMapperObject = {};

        baseStateKeyMapperObject[ REDUXX_SPECIAL_KEY ] = value;

        return baseStateKeyMapperObject;
    }
);


const getStateKeyValue = Object.freeze(

    ({

        stateKeyValue,
        currentKey,
        obscureStateKeys,

    }) => {

        if( !obscureStateKeys ) {

            return `${ stateKeyValue }-${ currentKey }`;
        }

        return getGuid();
    }
);


module.exports = Object.freeze(

    ({

        initialState,
        obscureStateKeys = false

    }) => {

        const stateKeyMapper = {};

        initialState.forEach( initialStateData => {

            const { keys } = initialStateData;

            const firstKey = keys[0];

            let currentStateKeyValue = !obscureStateKeys ? keys[0] : getGuid();

            stateKeyMapper[ firstKey ] = (

                stateKeyMapper[ firstKey ]

            ) || (

                getBaseStateKeyMapperObject( currentStateKeyValue )
            );

            let currentStateKeyMapperObject = stateKeyMapper[ firstKey ];

            for( let i = 1; i < keys.length; i++ ) {

                const currentKey = keys[ i ];

                currentStateKeyValue = getStateKeyValue({

                    stateKeyValue: currentStateKeyValue,
                    currentKey,
                    obscureStateKeys,
                });

                currentStateKeyMapperObject[ currentKey ] = (

                    currentStateKeyMapperObject[ currentKey ]

                ) || (

                    getBaseStateKeyMapperObject( currentStateKeyValue )
                );

                currentStateKeyMapperObject = currentStateKeyMapperObject[

                    currentKey
                ];
            }
        });

        return stateKeyMapper;
    }
);
