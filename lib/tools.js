'use strict';

const INVALID_REDUXX_KEY_SPECIFIED = 'invalid ReduxX key specified';

const createGuidComponent = Object.freeze(

    () => Math.floor(

        (1 + Math.random()) * 0x10000

    ).toString(16).substring(1)
);

const getGuid = Object.freeze( () => {

    return (

        createGuidComponent() +
        `${ createGuidComponent() }-` +
        `${ createGuidComponent() }-` +
        `${ createGuidComponent() }-` +
        `${ createGuidComponent() }-` +
        createGuidComponent() +
        createGuidComponent() +
        createGuidComponent()
    );
});

const getFormattedKeys = Object.freeze(

    ({ keys }) => {

        const isSingleKey = (typeof keys === 'string');

        if(
            !keys ||
            !(
                Array.isArray( keys ) ||
                isSingleKey
            ) ||
            (keys.length < 1)
        ) {

            throw new Error( 'incorrect ReduxX keys' );
        }

        if( isSingleKey ) {

            return[ keys ];
        }

        return keys;
    }
);

const getStateKeyMapperObject = Object.freeze(

    ({

        stateKeyMapper,
        keys,

    }) => {

        let currentStateKeyMapperObject = stateKeyMapper[ keys[0] ];

        if( !currentStateKeyMapperObject ) {

            throw new Error(

                INVALID_REDUXX_KEY_SPECIFIED
            );
        }

        for( let i = 1; i < keys.length; i++ ) {

            const key = keys[i];

            currentStateKeyMapperObject = currentStateKeyMapperObject[ key ];

            if( !currentStateKeyMapperObject ) {

                throw new Error(

                    INVALID_REDUXX_KEY_SPECIFIED
                );
            }
        }

        return currentStateKeyMapperObject;
    }
);


const constants = Object.freeze({

    REDUXX_SPECIAL_KEY: '@reduxXKey',
});


module.exports = Object.freeze({

    constants,

    utils: Object.freeze({

        getGuid,

        getFormattedKeys,

        getStateKeyMapperObject,
    }),
});
