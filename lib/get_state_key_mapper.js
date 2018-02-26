'use strict';


module.exports = Object.freeze(

    ({

        initialState

    }) => {

        const stateKeyMapper = {};

        initialState.forEach( initialStateData => {

            const {

                key1,
                key2,

            } = initialStateData;

            if( !key1 || !key2 ) {

                throw new Error( 'incorrect ReduxX initial state setup' );
            }

            stateKeyMapper[ key1 ] = stateKeyMapper[ key1 ] || {};

            stateKeyMapper[ key1 ][ key2 ] = `${ key1 }-${ key2 }`;
        });

        return stateKeyMapper;
    }
);
