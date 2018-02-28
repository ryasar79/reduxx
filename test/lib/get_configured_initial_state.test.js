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

        expect( result ).to.eql([

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
        ]);
    });

    it( 'error in setup, initial state is not an array', function() {

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
