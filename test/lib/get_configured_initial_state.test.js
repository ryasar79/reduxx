'use strict';

const ROOT_PATH = '../../';

const MODULE_PATH = 'lib/get_configured_initial_state';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

// const proxyquire = require( 'proxyquire' ).noCallThru();

// const sinon = require( 'sinon' );

const configureInitialState = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    it( 'normal operation: regular array type initial state provided', function() {

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

    it( 'error in setup, initial state is not an array or string', function() {

        let error = null;

        try {

            configureInitialState({});

        } catch( err ) {

            error = err
        }

        expect( error.message ).to.equal(

            'ReduxX error: invalid initial state'
        );
    });
});
