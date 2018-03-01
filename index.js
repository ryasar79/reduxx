'use strict';

const {

    getStateStorageComponent,
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

        const ReduxXStateStorageComponent = getStateStorageComponent({

            reduxXCore,
            initialState,
            stateKeyMapper
        });

        return Object.freeze({

            ReduxXStateStorageComponent,

            stateKeyMapper,

            REDUXX_SPECIAL_KEY: tools.constants.REDUXX_SPECIAL_KEY,

            getState: getState.bind({

                reduxXCore,
                stateKeyMapper
            }),

            setState: setState.bind({

                reduxXCore,
                stateKeyMapper
            }),

            get globalStateStorageInstance() {

                return getGlobalStateStorageInstance({

                    reduxXCore
                });
            }
        });
    }
);
