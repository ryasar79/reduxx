'use strict';

const {

    setupReduxX,
    getConfiguredInitialState,
    getStateKeyMapper,
    getState,
    setState,
    getGlobalStateStorageInstance,
    tools: {
        
        constants: {

            REDUXX_SPECIAL_KEY
        }   
    },

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

        const legacyGetGlobalStateStorageInstance = Object.freeze( ({

            propertyName,

        }) => {

            console.warn(
                
                'ReduxX depreciation warning: ' +
                'please use the reduxX.getStore() function ' +
                `instead of reduxX.${ propertyName }`
            );

            return getGlobalStateStorageInstance({ reduxXCore })
        });

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

            REDUXX_SPECIAL_KEY,

            getStore: () => {

                return getGlobalStateStorageInstance({ reduxXCore })
            },

            // deprecated
            get globalStateStorageInstance() {

                return legacyGetGlobalStateStorageInstance({

                    propertyName: 'globalStateStorageInstance'                    
                });
            },

            // deprecated
            get store() {

                return legacyGetGlobalStateStorageInstance({

                    propertyName: 'store'                    
                });
            },
        });
    }
);
