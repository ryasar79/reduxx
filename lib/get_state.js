'use strict';

module.exports = Object.freeze(

    function({

        key1,
        key2

    }) {

        const {

            reduxX,
            stateKeyMapper

        } = this;

        if(
            !reduxX.mainComponent ||
            !stateKeyMapper[ key1 ] ||
            !stateKeyMapper[ key1 ][ key2 ]
        ) {

            throw new Error( `error in ReduxX getState` );
        }

        const stateValue = reduxX.mainComponent.state[

            stateKeyMapper[ key1 ][ key2 ]
        ];

        return stateValue;
    }
);
