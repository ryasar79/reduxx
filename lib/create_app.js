'use strict';

const {

    constants: {

        INITIAL_STATE_SETUP_FINISHED_KEY
    }

} = require( './tools.js' );


module.exports = Object.freeze(

    function( app ) {

        const {

            reduxXCore: {

                globalStateStorageInstance
            }

        } = this;

        if( !globalStateStorageInstance ) {

            throw new Error(

                'ReduxX error: error in creating app, ' +
                'global state storage instance not set up'
            )
        }

        const initialStateIsSetup = !!globalStateStorageInstance.state[

            INITIAL_STATE_SETUP_FINISHED_KEY
        ];

        return(

            initialStateIsSetup &&
            app

        );
    }
);
