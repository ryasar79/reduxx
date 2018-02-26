'use strict';

const uuidv4 = require( 'uuid/v4' );


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

            stateKeyMapper[ key1 ][ key2 ] = uuidv4();
        });

        return stateKeyMapper;
    }
);
