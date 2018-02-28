'use strict';

const ROOT_PATH = '../../';

const MODULE_PATH = 'lib/set_state';

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

                globalStateComponent: {

                    setState: setStateStub,

                    state: {

                        'monkey': true,
                        'monkey-favoriteFood': 'banana',
                        'monkey-favoriteFood-favoriteDesert': 'banana split',
                        'monkey-favoriteFood-favoriteDesert-favoriteDesertTime': 'anytime',
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
            }
        });

        setState(

            {
                key1: 'monkey',
                key2: 'favoriteFood',
                key3: 'favoriteDesert',
                value: 'apple',
            },
            {
                key1: 'monkey',
                value: 2,
            },
            {
                key1: 'hippo',
                key2: 'favoriteFood',
                value: 'megaBanana',
            },
            {
                key1: 'hippo',
            }
        );

        expect( setStateStub.args.length ).to.equal( 1 );
        expect( setStateStub.args[0].length ).to.equal( 1 );
        expect( setStateStub.args[0][0] ).to.eql({

            'monkey-favoriteFood-favoriteDesert': 'apple',
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
                    key1: 'monkey',
                    key2: 'favoriteFood',
                    value: 'apple',
                },
                {
                    key1: 'hippo',
                    key2: 'favoriteFood',
                    value: undefined,
                }
            );

        } catch( err ) {

            error = err
        }

        expect( error.message ).to.equal(

            'error in ReduxX setState: global state component not setup'
        );
    });

    it( 'trying to set state with state keys that do not exist', function() {

        const setState = setStateFresh.bind({

            reduxXCore: {

                globalStateComponent: {

                    setState: setStateStub,

                    state: {

                        'monkey': true,
                        'monkey-favoriteFood': 'banana',
                        'monkey-favoriteFood-favoriteDesert': 'banana split',
                        'monkey-favoriteFood-favoriteDesert-favoriteDesertTime': 'anytime',
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
            }
        });

        let error = null;

        try {

            setState(

                {
                    key1: 'monkey',
                    key2: 'favoriteFoodz',
                    value: 'apple',
                }
            );

        } catch( err ) {

            error = err
        }

        expect( error.message ).to.equal(

            'error in ReduxX setState: invalid key specified'
        );
    });
});
