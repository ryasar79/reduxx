'use strict';

const ROOT_PATH = '../../';

const MODULE_PATH = 'lib/set_initial_state';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

// const proxyquire = require( 'proxyquire' ).noCallThru();

const sinon = require( 'sinon' );

const setInitialState = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    let setStateStub;

    it( 'normal operation', function() {

        setStateStub = sinon.stub();

        const setInitialStateParams = {

            reduxXCore: {

                globalStateStorageInstance: {

                    setState: setStateStub
                }
            },

            stateKeyMapper: {

                monkey: {

                    '@reduxXKey': 'monkey',

                    favoriteFood: {

                        '@reduxXKey': 'monkey-favoriteFood',

                        favoriteDesert: {

                            '@reduxXKey': 'monkey-favoriteFood-favoriteDesert',

                            favoriteDesertTime: {

                                '@reduxXKey': 'monkey-favoriteFood-favoriteDesert-favoriteDesertTime',
                            }
                        }
                    },

                    height: {

                        '@reduxXKey': 'monkey-height'
                    },
                },

                hippo: {

                    '@reduxXKey': 'hippo',

                    favoriteFood: {

                        '@reduxXKey': 'hippo-favoriteFood'
                    },
                }
            },

            initialState: [

                {
                    key1: 'monkey',
                    key2: 'favoriteFood',
                    key3: 'favoriteDesert',
                    key4: 'favoriteDesertTime',
                    value: 'anytime',
                },
                {
                    key1: 'monkey',
                    key2: 'favoriteFood',
                    key3: 'favoriteDesert',
                    value: 'banana split',
                },
                {
                    key1: 'monkey',
                    key2: 'favoriteFood',
                    value: 'banana',
                },
                {
                    key1: 'monkey',
                    value: true,
                },
                {
                    key1: 'monkey',
                    key2: 'height',
                },
                {
                    key1: 'hippo',
                    key2: 'favoriteFood',
                    value: 'watermelon',
                }
            ]
        };

        setInitialState.call(

            setInitialStateParams
        );

        expect( setStateStub.args.length ).to.equal( 1 );
        expect( setStateStub.args[0].length ).to.equal( 1 );
        expect( setStateStub.args[0][0] ).to.eql({

            'monkey': true,
            'monkey-favoriteFood': 'banana',
            'monkey-favoriteFood-favoriteDesert': 'banana split',
            'monkey-favoriteFood-favoriteDesert-favoriteDesertTime': 'anytime',
            'monkey-height': null,
            'hippo-favoriteFood': 'watermelon',
        });
    });

    it( 'trying to set initial state when global state component not set up yet', function() {

        const setInitialStateParams = {

            reduxXCore: {},

            stateKeyMapper: {},

            initialState: []
        };

        let error = null;

        try {

            setInitialState.call( setInitialStateParams );

        } catch( err ) {

            error = err
        }

        expect( error.message ).to.equal(

            'error in ReduxX setInitialState'
        );
    });
});
