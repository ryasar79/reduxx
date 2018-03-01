'use strict';

const setGlobalStateStoreInstance = require( './set_global_state_storage_instance.js' );
const setInitialState = require( './set_initial_state.js' );

module.exports = Object.freeze(

    ({

        React,
        reduxXCore,
        initialState,
        stateKeyMapper

    }) => {

        class ReduxXStateStorageComponent extends React.Component {

            constructor( props ) {

                super( props );

                setGlobalStateStoreInstance({

                    reduxXCore,
                    globalStateStorageInstance: this
                });
            }

            render() {

                return React.createElement( 'div' );
            }

            componentDidMount() {

                setInitialState({

                    reduxXCore,
                    initialState,
                    stateKeyMapper
                });
            }
        }

        return ReduxXStateStorageComponent;
    }
);