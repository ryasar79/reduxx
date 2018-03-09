'use strict';

const ROOT_PATH = '../../../';

const MODULE_PATH = 'lib/set_state/index';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

// const proxyquire = require( 'proxyquire' ).noCallThru();

const sinon = require( 'sinon' );

const setStateFresh = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    let setStateStub;

    it( 'normal operation', function() {

        setStateStub = sinon.stub();

        const setState = setStateFresh.bind({

            reduxXCore: {

                globalStateStorageInstance: {

                    setState: setStateStub,

                    state: {

                        'monkey': true,
                        'monkey-favoriteFood': 'banana',
                        'monkey-favoriteFood-favoriteDessert': 'banana split',
                        'monkey-favoriteFood-favoriteDessert-favoriteDessertTime': 'anytime',
                        'monkey-height': null,
                        'hippo-favoriteFood': 'watermelon',
                    }
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
            }
        });

        setState(

            {
                keys: [

                    'monkey',
                    'favoriteFood',
                    'favoriteDessert',
                ],

                value: 'apple'
            },
            {
                keys: 'monkey',
                value: 2,
            },
            {
                keys: [

                    'hippo',
                    'favoriteFood',
                ],

                value: 'megaBanana'
            },
            {
                keys: 'hippo',
            }
        );

        expect( setStateStub.args.length ).to.equal( 1 );
        expect( setStateStub.args[0].length ).to.equal( 1 );
        expect( setStateStub.args[0][0] ).to.eql({

            'monkey-favoriteFood-favoriteDessert': 'apple',
            'hippo-favoriteFood': 'megaBanana',
            'monkey': 2,
            'hippo': undefined,
        });
    });

    it( 'trying to set state when global state component not set up yet', function() {

        const setState = setStateFresh.bind({

            reduxXCore: {},

            stateKeyMapper: {},

            initialState: []
        });

        let error = null;

        try {

            setState(

                {
                    keys: [

                        'monkey',
                        'favoriteFood',
                    ],

                    value: 'apple',
                },
                {
                    keys: [

                        'hippo',
                        'favoriteFood',
                    ],
                    value: undefined,
                }
            );

        } catch( err ) {

            error = err
        }

        expect( error.message ).to.equal(

            'error in ReduxX setState: global state storage instance not setup'
        );
    });

    it( 'trying to set state with state keys that do not exist', function() {

        const setState = setStateFresh.bind({

            reduxXCore: {

                globalStateStorageInstance: {

                    setState: setStateStub,

                    state: {

                        'monkey': true,
                        'monkey-favoriteFood': 'banana',
                        'monkey-favoriteFood-favoriteDessert': 'banana split',
                        'monkey-favoriteFood-favoriteDessert-favoriteDessertTime': 'anytime',
                        'monkey-height': null,
                        'hippo-favoriteFood': 'watermelon',
                    }
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
            }
        });

        let error = null;

        try {

            setState(

                {
                    keys: [
                        'monkey',
                        'favoriteFoodz',
                    ],
                    value: 'apple',
                }
            );

        } catch( err ) {

            error = err
        }

        expect( error.message ).to.equal(

            'invalid ReduxX key specified'
        );
    });
});
