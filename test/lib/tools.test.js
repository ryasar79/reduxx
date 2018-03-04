'use strict';

const ROOT_PATH = '../../';

const MODULE_PATH = 'lib/tools';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

// const proxyquire = require( 'proxyquire' ).noCallThru();
// const sinon = require( 'sinon' );
const {

    utils: {

        getFormattedKeys,

        getStateKeyMapperObject,

        getGuid,
    }

} = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    describe( '.utils.getFormattedKeys', function() {

        it( 'normal operation', function() {

            expect( getFormattedKeys({ keys: 'monkey' }) ).to.eql( [ 'monkey' ] );
            expect( getFormattedKeys({ keys: [

                'monkey',
                'funky'

            ]}) ).to.eql( [ 'monkey', 'funky' ] );
            expect( getFormattedKeys({ keys: [

                'monkey',
                'funky',
                'chunky'

            ]}) ).to.eql( [ 'monkey', 'funky', 'chunky' ] );
        });

        it( 'invalid keys', function() {

            let error = null;

            try {

                getFormattedKeys({ keys: {}});

            } catch( err ) {

                error = err;
            }

            expect( error.message ).to.equal( 'incorrect ReduxX keys' );
        });
    });

    describe( '.utils.getStateKeyMapperObject', function() {

        it( 'normal operation', function() {

            const stateKeyMapper = {

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
            };

            expect(getStateKeyMapperObject({

                stateKeyMapper,
                keys: [

                    'monkey',
                    'favoriteFood',
                    'favoriteDessert'
                ],

            })).to.eql({

                '@reduxXKey': 'monkey-favoriteFood-favoriteDessert',

                favoriteDessertTime: {

                    '@reduxXKey': 'monkey-favoriteFood-favoriteDessert-favoriteDessertTime',
                }
            });

            expect(getStateKeyMapperObject({

                stateKeyMapper,
                keys: [

                    'monkey',
                ],

            })).to.eql({

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
            });
        });

        it( 'invalid ReduxX key specified', function() {

            const stateKeyMapper = {

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
            };

            let error = null;

            try {

                getStateKeyMapperObject({

                    stateKeyMapper,

                    keys: [

                        'monk'
                    ]
                });

            } catch( err ) {

                error = err;
            }

            expect( error.message ).to.equal( 'invalid ReduxX key specified' );

            let error2 = null;

            try {

                getStateKeyMapperObject({

                    stateKeyMapper,

                    keys: [

                        'monkey',
                        'favoriteFood',
                        'favoriteDessertz'
                    ]
                });

            } catch( err ) {

                error2 = err;
            }

            expect( error2.message ).to.equal( 'invalid ReduxX key specified' );
        });
    });

    describe( '.utils.getGuid', function() {

        it( 'normal operation', function() {

            expect( getGuid().length ).to.equal( 36 );
            expect( getGuid().replace(/[^\-]/g, "").length ).to.equal( 4 );
        });
    });
});
