'use strict';


module.exports = Object.freeze(

    ({
        initialState,

    }) => {

        if( Array.isArray( initialState ) ) {

            return initialState;
        }

        // for now, just accepts array input
        throw new Error(

            'ReduxX error: invalid initial state'
        );
    }
);
