'use strict';


module.exports = Object.freeze(

    function() {

        const {

            reduxXCore,
            initialState,
            stateKeyMapper

        } = this;

        if( !reduxXCore.mainComponent ) {

            throw new Error( `error in ReduxX setInitialState` );
        }

        const newState = {};

        initialState.forEach( stateData => {

            const {

                key1,
                key2,
                initialValue

            } = stateData;

            newState[

                stateKeyMapper[ key1 ][ key2 ]

            ] = initialValue || null;
        });

        reduxXCore.mainComponent.setState( newState );
    }
);
