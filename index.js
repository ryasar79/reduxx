'use strict';

const {

    createApp,
    getConfiguredInitialState,
    getStateKeyMapper,
    getState,
    setState,
    getGlobalStateStorageInstance,
    tools,
    setGlobalStateStorageInstance,
    setInitialState

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

        return Object.freeze({

            setGlobalStateStorageInstance: setGlobalStateStorageInstance.bind({

                reduxXCore,
            }),

            setInitialState: setInitialState.bind({

                reduxXCore,
                initialState,
                stateKeyMapper
            }),

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
            },

            createApp: createApp.bind({

                reduxXCore,
            }),
        });
    }
);
