'use strict';

const ROOT_PATH = '../../../';

const MODULE_PATH = 'lib/get_state/get_formatted_arguments';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

// const proxyquire = require( 'proxyquire' ).noCallThru();

// const sinon = require( 'sinon' );

const getFormattedArguments = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    it( 'normal operation: string input', function() {

        const formattedArguments = getFormattedArguments(

            'monkey',
            'favoriteFood'
        );

        expect( formattedArguments ).to.eql({

            keys: [

                'monkey',
                'favoriteFood'
            ]
        });
    });

    it( 'normal operation: array input', function() {

        const formattedArguments = getFormattedArguments([

            'monkey',
            'favoriteFood'
        ]);

        expect( formattedArguments ).to.eql({

            keys: [

                'monkey',
                'favoriteFood'
            ]
        });
    });

    it( 'normal operation: object input', function() {

        const formattedArguments = getFormattedArguments({

            keys: [

                'monkey',
                'favoriteFood'
            ]
        });

        expect( formattedArguments ).to.eql({

            keys: [

                'monkey',
                'favoriteFood'
            ]
        });
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

        expect( error.message ).to.equal( 'ReduxX error: invalid getState input' );
    });
});
