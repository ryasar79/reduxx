'use strict';


module.exports = Object.freeze(

    function( globalStateStorageInstance ) {

        const { reduxXCore } = this;

        reduxXCore.globalStateStorageInstance = globalStateStorageInstance;
    }
);
