'use strict';

const ROOT_PATH = '../../../';

const MODULE_PATH = 'lib/setup_reduxx/set_initial_state';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

// const proxyquire = require( 'proxyquire' ).noCallThru();

// const sinon = require( 'sinon' );

const setInitialState = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    // let setStateStub;

    it( 'normal operation: no existing state', function() {

        // setStateStub = sinon.stub();

        const globalStateStorageInstance = {};

        const setInitialStateParams = {

            globalStateStorageInstance,

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

        setInitialState(

            setInitialStateParams
        );

        expect( globalStateStorageInstance.state ).to.eql({

            'monkey': true,
            'monkey-favoriteFood': 'banana',
            'monkey-favoriteFood-favoriteDessert': 'banana split',
            'monkey-favoriteFood-favoriteDessert-favoriteDessertTime': 'anytime',
            'monkey-height': null,
            'hippo-favoriteFood': 'watermelon',
        });
    });

    it( 'normal operation: with existing state', function() {

        // setStateStub = sinon.stub();

        const globalStateStorageInstance = {

            state: {

                a: 'b',
                c: {

                    d: true
                }
            }
        };

        const setInitialStateParams = {

            globalStateStorageInstance,

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

        setInitialState(

            setInitialStateParams
        );

        expect( globalStateStorageInstance.state ).to.eql({

            'monkey': true,
            'monkey-favoriteFood': 'banana',
            'monkey-favoriteFood-favoriteDessert': 'banana split',
            'monkey-favoriteFood-favoriteDessert-favoriteDessertTime': 'anytime',
            'monkey-height': null,
            'hippo-favoriteFood': 'watermelon',
            a: 'b',
            c: {

                d: true
            }
        });
    });
});
