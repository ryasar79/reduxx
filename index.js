'use strict';

const {

    setupReduxX,
    getConfiguredInitialState,
    getStateKeyMapper,
    getState,
    setState,
    getGlobalStateStorageInstance,
    tools,

} = require( './lib/index.js' );


module.exports = Object.freeze(

    ({
        initialState,
        obscureStateKeys,

    }) => {

        initialState = getConfiguredInitialState({

            initialState,
        });

        const reduxXCore = {};

        const stateKeyMapper = getStateKeyMapper({

            initialState,
            obscureStateKeys
        });

        const boundGetGlobalStateStorageInstance = (

            getGlobalStateStorageInstance.bind( null, { reduxXCore } )
        );

        return Object.freeze({

            setupReduxX: setupReduxX.bind({

                reduxXCore,
                initialState,
                stateKeyMapper
            }),

            getState: getState.bind({

                reduxXCore,
                stateKeyMapper
            }),

            setState: setState.bind({

                reduxXCore,
                stateKeyMapper
            }),

            stateKeyMapper,

            REDUXX_SPECIAL_KEY: tools.constants.REDUXX_SPECIAL_KEY,

            get globalStateStorageInstance() {

                return boundGetGlobalStateStorageInstance();
            },

            get store() {

                return boundGetGlobalStateStorageInstance();
            },
        });
    }
);
