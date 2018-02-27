'use strict';

module.exports = Object.freeze(

    function({

        key1,
        key2

    }) {

        const {

            reduxXCore,
            stateKeyMapper

        } = this;

        if(
            !reduxXCore.mainComponent ||
            !stateKeyMapper[ key1 ] ||
            !stateKeyMapper[ key1 ][ key2 ]
        ) {

            throw new Error( `error in ReduxX getState` );
        }

        const stateValue = reduxXCore.mainComponent.state[

            stateKeyMapper[ key1 ][ key2 ]
        ];

        return stateValue;
    }
);
