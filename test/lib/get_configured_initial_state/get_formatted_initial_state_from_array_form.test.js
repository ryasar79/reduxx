'use strict';

const ROOT_PATH = '../../../';

const MODULE_PATH = 'lib/get_configured_initial_state/get_formatted_initial_state_from_array_form';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

// const proxyquire = require( 'proxyquire' ).noCallThru();

// const sinon = require( 'sinon' );

const getFormattedInitialStateFromArrayForm = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    it( 'normal operation', function() {

        const initialState = [

            {
                keys: 'xxx',

                value: 69
            },

            {
                keys: [ 'xxx', 'woo', 'ricflair' ],

                value: 696969
            },
        ];

        const result = getFormattedInitialStateFromArrayForm({ initialState });

        expect( result ).to.deep.equal([

            {
                keys: [ 'xxx' ],

                value: 69
            },

            {
                keys: [ 'xxx', 'woo', 'ricflair' ],

                value: 696969
            },
        ]);
    });
});
