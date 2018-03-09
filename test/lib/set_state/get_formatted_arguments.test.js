'use strict';

const ROOT_PATH = '../../../';

const MODULE_PATH = 'lib/set_state/get_formatted_arguments';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

// const proxyquire = require( 'proxyquire' ).noCallThru();

// const sinon = require( 'sinon' );

const getFormattedArguments = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    it( 'normal operation: classic input', function() {

        const formattedArguments = getFormattedArguments(

            {

                keys: [

                    'monkey',
                    'favoriteFood'
                ],

                value: { xxx: 69 },
            },

            {

                keys: [

                    'monkey',
                    'favoriteFood',
                    'favoriteDessert',
                ],

                value: { yyy: 69 },
            }
        );

        expect( formattedArguments ).to.eql([

            {

                keys: [

                    'monkey',
                    'favoriteFood'
                ],

                value: { xxx: 69 },
            },

            {

                keys: [

                    'monkey',
                    'favoriteFood',
                    'favoriteDessert',
                ],

                value: { yyy: 69 },
            }
        ]);
    });

    it( 'normal operation: contemporary input', function() {

        const formattedArguments = getFormattedArguments(

            'monkey',

            { xxx: 69 },

            [

                'monkey',
                'favoriteFood',
                'favoriteDessert',
            ],

            { yyy: 69 }
        );

        expect( formattedArguments ).to.eql([

            {

                keys: 'monkey',

                value: { xxx: 69 },
            },

            {

                keys: [

                    'monkey',
                    'favoriteFood',
                    'favoriteDessert',
                ],

                value: { yyy: 69 },
            }
        ]);

        const formattedArguments2 = getFormattedArguments(

            [
                'monkey'
            ],

            { xxx: 69 },

            [

                'monkey',
                'favoriteFood',
                'favoriteDessert',
            ],

            { yyy: 69 }
        );

        expect( formattedArguments2 ).to.eql([

            {

                keys: [ 'monkey' ],

                value: { xxx: 69 },
            },

            {

                keys: [

                    'monkey',
                    'favoriteFood',
                    'favoriteDessert',
                ],

                value: { yyy: 69 },
            }
        ]);
    });

    it( 'error: invalid input', function() {

        let error = null;

        try {

            getFormattedArguments(

                69
            );

        } catch( err ) {

            error = err;
        }

        expect( error.message ).to.equal( 'ReduxX error: invalid setState input' );
    });
});
