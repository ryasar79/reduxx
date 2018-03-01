'use strict';


module.exports = Object.freeze({

    getConfiguredInitialState: require( './get_configured_initial_state.js' ),
    getStateKeyMapper: require( './get_state_key_mapper.js' ),
    getStateStorageComponent: require( './get_state_storage_component/index.js' ),
    getState: require( './get_state.js' ),
    setState: require( './set_state.js' ),
    getGlobalStateComponent: require( './get_global_state_component.js' ),
});
