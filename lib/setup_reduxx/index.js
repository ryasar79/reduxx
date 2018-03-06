'use strict';

const setInitialState = require( './set_initial_state.js' );


module.exports = Object.freeze(

    function( globalStateStorageInstance ) {

        const {

            reduxXCore,
            initialState,
            stateKeyMapper

        } = this;

        setInitialState({

            globalStateStorageInstance,
            initialState,
            stateKeyMapper
        });

        reduxXCore.globalStateStorageInstance = globalStateStorageInstance;
    }
);
