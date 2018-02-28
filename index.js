'use strict';

const {

    getConfiguredInitialState,
    setGlobalStateComponent,
    getStateKeyMapper,
    getState,
    setState,
    setInitialState,
    getGlobalStateComponent,

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

        return Object.freeze({

            setGlobalStateComponent: setGlobalStateComponent.bind({

                reduxXCore,
            }),

            setInitialState: setInitialState.bind({

                reduxXCore,
                stateKeyMapper,
                initialState
            }),

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
