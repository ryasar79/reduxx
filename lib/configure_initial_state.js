'use strict';


module.exports = Object.freeze(

    ({
        initialState,
        initialStateObjectFormat

    }) => {

        if(
            (!initialState && !initialStateObjectFormat) ||
            (!!initialState && !!initialStateObjectFormat)
        ) {

            throw new Error( 'incorrect ReduxX initial state setup' );
        }

        if( !!initialState ) {

            return initialState;
        }

        const alternateInitialState = [];

        const key1s = Object.keys( initialStateObjectFormat );

        key1s.forEach( key1 => {

            const key2s = Object.keys( initialStateObjectFormat[ key1 ] );

            key2s.forEach( key2 => {

                const initialValue = initialStateObjectFormat[

                    key1

                ][ key2 ];

                alternateInitialState.push({

                    key1,
                    key2,
                    initialValue
                });
            });
        });

        return alternateInitialState;
    }
);
