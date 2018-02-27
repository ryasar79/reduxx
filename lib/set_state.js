'use strict';


module.exports = Object.freeze(

    function( ...stateSetObjects ) {

        const {

            reduxXCore,
            stateKeyMapper

        } = this;

        const newState = {};

        if( !reduxXCore.mainComponent ) {

            throw new Error(

                `error in ReduxX setState: main component not setup`
            );
        }

        stateSetObjects.forEach( stateSetObject => {

            const {

                key1,
                key2,
                value

            } = stateSetObject;

            if(
                !stateKeyMapper[ key1 ] ||
                !stateKeyMapper[ key1 ][ key2 ]
            ) {

                throw new Error(

                    `error in ReduxX setState: ` +
                    `cannot set state with keys not in initial state`
                );
            }

            newState[ stateKeyMapper[ key1 ][ key2 ] ] = value;
        });

        reduxXCore.mainComponent.setState( newState );
    }
);
