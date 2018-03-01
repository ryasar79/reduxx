'use strict';

const {

    getStateStorageComponent,
    getConfiguredInitialState,
    getStateKeyMapper,
    getState,
    setState,
    getGlobalStateComponent,

} = require( './lib/index.js' );


module.exports = Object.freeze(

    ({
        React,
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

            React,
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

            get globalStateComponent() {

                return getGlobalStateComponent({

                    reduxXCore
                });
            }
        });
    }
);
