'use strict';

const ROOT_PATH = '../../../';

const MODULE_PATH = 'lib/get_configured_initial_state';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

// const proxyquire = require( 'proxyquire' ).noCallThru();

// const sinon = require( 'sinon' );

const configureInitialState = require( FULL_MODULE_PATH );

// TODO: stub out get functions to isolate file code
describe( MODULE_PATH, function() {

    it( 'normal operation: array form initial state provided', function() {

        const result = configureInitialState({

            initialState: [

                {
                    keys: [

                        'monkey',
                        'favoriteFood',
                        'favoriteDesert',
                        'favoriteDesertTime',
                    ],

                    value: 'anytime'
                },
                {
                    keys: [

                        'monkey',
                        'favoriteFood',
                        'favoriteDesert',
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
                    keys: 'monkey',
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

        expect( result ).to.eql([

            {
                keys: [

                    'monkey',
                    'favoriteFood',
                    'favoriteDesert',
                    'favoriteDesertTime',
                ],

                value: 'anytime'
            },
            {
                keys: [

                    'monkey',
                    'favoriteFood',
                    'favoriteDesert',
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
        ]);
    });

    it( 'normal operation: Object Form initial state provided', function() {

        const VALUE = '@reduxXKey';

        const result = configureInitialState({

            initialState: {

                monkey: {
        
                    [VALUE]: { name: 'Curious George', bff: 'Donkey Kong' },
        
                    favoriteFood: {
        
                        [VALUE]: 'banana'
                    },
        
                    height: {
        
                        [VALUE]: '69cm'
                    }
                },
        
                hippo: {
        
                    status: {
        
                        mood: {
        
                            [VALUE]: 'hungry'
                        }
                    }
                }
            }
        });

        expect( result ).to.eql([

            {
                keys: [

                    'monkey'
                ],
                value: { name: 'Curious George', bff: 'Donkey Kong' },
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

                    'monkey',
                    'height',
                ],
                value: '69cm',
            },
            {
                keys: [
                    'hippo',
                    'status',
                    'mood'
                ],
                value: 'hungry',
            }
        ]);
    });

    it( 'error in setup, initial state is not an array or object', function() {

        let error = null;

        try {

            configureInitialState({

                initialState: 'woo ricflair'
            });

        } catch( err ) {

            error = err
        }

        expect( error.message ).to.equal(

            'ReduxX error: invalid initial state'
        );
    });
});
