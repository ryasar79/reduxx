'use strict';


module.exports = Object.freeze({

    configureInitialState: require( './configure_initial_state.js' ),
    getStateKeyMapper: require( './get_state_key_mapper.js' ),
    setMainComponent: require( './set_main_component.js' ),
    setInitialState: require( './set_initial_state.js' ),
    getState: require( './get_state.js' ),
    setState: require( './set_state.js' ),
});
