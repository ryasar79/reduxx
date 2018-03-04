'use strict';

const ROOT_PATH = '../../';

const MODULE_PATH = 'lib/get_state_key_mapper';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

const proxyquire = require( 'proxyquire' ).noCallThru();

const sinon = require( 'sinon' );

const getStateKeyMapper = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    it( 'normal operation', function() {

        const stateKeyMapper = getStateKeyMapper({

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
                    value: '69cm',
                },
                {
                    keys: [

                        'hippo',
                        'favoriteFood',
                    ],
                    value: 'watermelon',
                }
            ]
        });

        expect( stateKeyMapper ).eql({

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
        });
    });

    it( 'normal operation: obscured keys', function() {

        const getGuidStub = sinon.stub().returns( 'xxx' );

        const mockTools = {

            utils: {

                getGuid: getGuidStub,

                // getKeyName: (number => `key${ number }`),
            },

            constants: {

                REDUXX_SPECIAL_KEY: '@reduxXKey'
            }
        };

        const proxyquireStubs = {

            './tools.js': mockTools
        };

        const proxyGetStateKeyMapper = proxyquire( FULL_MODULE_PATH, proxyquireStubs );

        const stateKeyMapper = proxyGetStateKeyMapper({

            obscureStateKeys: true,

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
                    value: '69cm',
                },
                {
                    keys: [

                        'hippo',
                        'favoriteFood',
                    ],
                    value: 'watermelon',
                }
            ]
        });

        expect( stateKeyMapper ).eql({

            monkey: {

                '@reduxXKey': 'xxx',

                favoriteFood: {

                    '@reduxXKey': 'xxx',

                    favoriteDessert: {

                        '@reduxXKey': 'xxx',

                        favoriteDessertTime: {

                            '@reduxXKey': 'xxx',
                        }
                    }
                },

                height: {

                    '@reduxXKey': 'xxx'
                },
            },

            hippo: {

                '@reduxXKey': 'xxx',

                favoriteFood: {

                    '@reduxXKey': 'xxx'
                },
            }
        });
    });
});
