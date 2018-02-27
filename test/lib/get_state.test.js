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

            reduxX: {

                mainComponent: {

                    state: {

                        'monkey-favoriteFood': 'banana'
                    }
                }
            },

            stateKeyMapper: {

                monkey: {

                    favoriteFood: 'monkey-favoriteFood'
                }
            }
        });

        const monkeysFavoriteFood = getState({

            key1: 'monkey',
            key2: 'favoriteFood'
        });

        expect( monkeysFavoriteFood ).to.equal( 'banana' );
    });

    it( 'trying to get non-existant state value', function() {

        const getState = getStateFresh.bind({

            reduxX: {

                mainComponent: {

                    state: {

                        'monkey-favoriteFood': 'banana'
                    }
                }
            },

            stateKeyMapper: {

                monkey: {

                    favoriteFood: 'monkey-favoriteFood'
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

            'error in ReduxX getState'
        );
    });
});
