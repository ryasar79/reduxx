'use strict';

const {

    setMainComponent,
    getStateKeyMapper,
    getState,
    setState,
    setInitialState,

} = require( './lib/index.js' );


module.exports = Object.freeze(

    ({
        initialState = []

    }) => {

        const reduxX = {};

        const stateKeyMapper = getStateKeyMapper({

            initialState
        });

        return Object.freeze({

            setMainComponent: setMainComponent.bind({

                reduxX,
            }),
            setInitialState: setInitialState.bind({

                reduxX,
                stateKeyMapper,
                initialState
            }),
            getState: getState.bind({

                reduxX,
                stateKeyMapper
            }),
            setState: setState.bind({

                reduxX,
                stateKeyMapper
            }),
        });
    }
);
