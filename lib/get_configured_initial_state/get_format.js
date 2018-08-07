'use strict';

const {

    constants: {

        INITIAL_STATE_FORMAT: {

            ARRAY,
            OBJECT,
            INVALID
        }
    }

} = require( '../tools.js' );


module.exports = Object.freeze(

    ({
        
        initialState,

    }) => {

        switch( typeof initialState ) {
            
            case 'object':

                if( Array.isArray( initialState ) ) {

                    return ARRAY;                    
                }
                else if( !!initialState ) {

                    return OBJECT;
                }
        }

        return INVALID;
    }
);
