'use strict';

const ROOT_PATH = '../../';

const MODULE_PATH = 'lib/get_state';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

// const proxyquire = require( 'proxyquire' ).noCallThru();

// const sinon = require( 'sinon' );

const getStateFresh = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    it( 'normal operation', function() {

        const getState = getStateFresh.bind({

            reduxXCore: {

                globalStateComponent: {

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

        const value1 = getState({

            key1: 'monkey',
            key2: 'favoriteFood',
            key3: 'favoriteDesert'
        });

        expect( value1 ).to.equal( 'banana split' );

        const value2 = getState({

            key1: 'monkey',
            key2: 'favoriteFood',
        });

        expect( value2 ).to.equal( 'banana' );

        const value3 = getState({

            key1: 'monkey',
        });

        expect( value3 ).to.equal( true );
    });

    it( 'trying to get non-existant state value', function() {

        const getState = getStateFresh.bind({

            reduxXCore: {

                globalStateComponent: {

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

            getState({

                key1: 'monkey',
                key2: 'favoriteFoodie'
            });

        } catch( err ) {

            error = err
        }

        expect( error.message ).to.equal(

            'error in ReduxX getState: invalid key(s) specified'
        );
    });

    it( 'missing global state component', function() {

        const getState = getStateFresh.bind({

            reduxXCore: {},

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

            getState({

                key1: 'monkey',
                key2: 'favoriteFoodie'
            });

        } catch( err ) {

            error = err
        }

        expect( error.message ).to.equal(

            'error in ReduxX getState: global state component not set'
        );
    });
});
