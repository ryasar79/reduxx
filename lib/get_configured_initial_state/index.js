'use strict';

const getFormat = require( './get_format.js' );

const getFormattedInitialStateFromArrayForm = require(
    
    './get_formatted_initial_state_from_array_form.js'
);

const getFormattedInitialStateFromObjectForm = require(
    
    './get_formatted_initial_state_from_object_form.js'
);

const {

    constants: {

        INITIAL_STATE_FORMAT: {

            ARRAY,
            OBJECT
        }
    }

} = require( '../tools.js' );


module.exports = Object.freeze(

    ({
        initialState,

    }) => {

        const format = getFormat({ initialState });

        switch( format ) {
            
            case ARRAY:
            
                initialState = getFormattedInitialStateFromArrayForm({

                    initialState
                });
                
                break;

            case OBJECT:

                initialState = getFormattedInitialStateFromObjectForm({

                    initialState
                });
                
                break;
        
            default:

                throw new Error(

                    'ReduxX error: invalid initial state'
                );
        }

        return initialState;
    }
);
