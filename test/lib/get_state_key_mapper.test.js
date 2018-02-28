'use strict';

const ROOT_PATH = '../../';

const MODULE_PATH = 'lib/get_state_key_mapper';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

// const proxyquire = require( 'proxyquire' ).noCallThru();

// const sinon = require( 'sinon' );

const getStateKeyMapper = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    it( 'normal operation', function() {

        const stateKeyMapper = getStateKeyMapper({

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
                    value: '69cm',
                },
                {
                    key1: 'hippo',
                    key2: 'favoriteFood',
                    value: 'watermelon',
                }
            ]
        });

        expect( stateKeyMapper ).eql({

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
        });
    });

    it( 'invalid initial state input', function() {

        let error = null;

        try {

            getStateKeyMapper({

                initialState: [

                    {
                        key1: 'monkey',
                        value: 'banana',
                    },
                    {
                        key2: 'height',
                        value: '69cm',
                    },
                    {
                        key1: 'hippo',
                        key2: 'favoriteFood',
                        value: 'watermelon',
                    }
                ]
            });

        } catch( err ) {

            error = err
        }

        expect( error.message ).to.equal(

            'incorrect ReduxX initial state setup'
        );
    });
});
