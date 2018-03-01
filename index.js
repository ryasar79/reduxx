'use strict';

const {

    getStateStorageComponent,
    getConfiguredInitialState,
    getStateKeyMapper,
    getState,
    setState,
    getGlobalStateStorageInstance,

} = require( './lib/index.js' );


module.exports = Object.freeze(

    ({
        initialState,

    }) => {

        initialState = getConfiguredInitialState({

            initialState,
        });

        const reduxXCore = {};

        const stateKeyMapper = getStateKeyMapper({

            initialState
        });

        const StateStorageComponent = getStateStorageComponent({

            reduxXCore,
            initialState,
            stateKeyMapper
        });

        return Object.freeze({

            StateStorageComponent,

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
