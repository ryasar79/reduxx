'use strict';


module.exports = Object.freeze(

    function() {

        const {

            reduxX,
            initialState,
            stateKeyMapper

        } = this;

        if( !reduxX.mainComponent ) {

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

        reduxX.mainComponent.setState( newState );
    }
);
