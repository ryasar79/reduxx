'use strict';


module.exports = Object.freeze(

    ({ reduxXCore }) => {

        if( !reduxXCore.globalStateStorageInstance ) {

            throw new Error(

                'ReduxX error: global state storage instance not set'
            );
        }

        return reduxXCore.globalStateStorageInstance;
    }
);
