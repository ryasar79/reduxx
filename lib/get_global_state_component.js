'use strict';


module.exports = Object.freeze(

    ({ reduxXCore }) => {

        if( !reduxXCore.globalStateComponent ) {

            throw new Error(

                'ReduxX error: global state component not set'
            );
        }

        return reduxXCore.globalStateComponent;
    }
);
