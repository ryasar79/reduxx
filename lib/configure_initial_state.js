'use strict';


module.exports = Object.freeze(

    ({
        initialState,

    }) => {

        if( Array.isArray( initialState ) ) {

            return initialState;
        }

        const alternateInitialState = [];

        const key1s = Object.keys( initialState );

        key1s.forEach( key1 => {

            const key2s = Object.keys( initialState[ key1 ] );

            key2s.forEach( key2 => {

                const initialValue = initialState[

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
