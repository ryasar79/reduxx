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

                        favoriteDessert: {

                            '@reduxXKey': 'monkey-favoriteFood-favoriteDessert',

                            favoriteDessertTime: {

                                '@reduxXKey': 'monkey-favoriteFood-favoriteDessert-favoriteDessertTime',
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
                    keys: [

                        'monkey',
                        'favoriteFood',
                        'favoriteDessert',
                        'favoriteDessertTime'
                    ],

                    value: 'anytime',
                },
                {
                    keys: [

                        'monkey',
                        'favoriteFood',
                        'favoriteDessert',
                    ],
                    value: 'banana split',
                },
                {
                    keys: [

                        'monkey',
                        'favoriteFood',
                    ],
                    value: 'banana',
                },
                {
                    keys: [

                        'monkey'
                    ],
                    value: true,
                },
                {
                    keys: [

                        'monkey',
                        'height',
                    ],
                    // value: '69cm',
                },
                {
                    keys: [

                        'hippo',
                        'favoriteFood',
                    ],
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
            'monkey-favoriteFood-favoriteDessert': 'banana split',
            'monkey-favoriteFood-favoriteDessert-favoriteDessertTime': 'anytime',
            'monkey-height': null,
            'hippo-favoriteFood': 'watermelon',
            '@reduxXInitialStateSetupComplete': true,
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
