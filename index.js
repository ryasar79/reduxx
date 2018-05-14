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


const ReduxX = ({

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

    const legacyGetGlobalStateStorageInstance = Object.freeze(({

        propertyName,

    }) => {

        console.warn(
            
            'ReduxX deprecation warning: ' +
            'please use the reduxX.getStore() function ' +
            `instead of reduxX.${ propertyName }`
        );

        return getGlobalStateStorageInstance({ reduxXCore });
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

        getStore: () => {

            return getGlobalStateStorageInstance({ reduxXCore });
        },

        stateKeyMapper,

        KEY: REDUXX_SPECIAL_KEY,

        // deprecated
        get REDUXX_SPECIAL_KEY() {
            
            console.warn(
            
                'ReduxX deprecation warning: ' +
                'please use reduxX.KEY ' +
                `instead of reduxX.REDUXX_SPECIAL_KEY`
            );

            return REDUXX_SPECIAL_KEY;
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
};

ReduxX.VALUE = REDUXX_SPECIAL_KEY;

module.exports = Object.freeze( ReduxX );
