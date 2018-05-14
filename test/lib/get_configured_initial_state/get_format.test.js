'use strict';

const ROOT_PATH = '../../../';

const MODULE_PATH = 'lib/get_configured_initial_state/get_format';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

// const proxyquire = require( 'proxyquire' ).noCallThru();

// const sinon = require( 'sinon' );

const getFormat = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {


    [
        {
            type: 'array',
            initialState: [ 'ricflair', 'woo' ],
            expectedResult: 'array_format'
        },
        {
            type: 'object',
            initialState: { ricFlair: 'wooo' },
            expectedResult: 'object_format'
        },
        {
            type: 'buffer',
            initialState: new Buffer([123]),
            expectedResult: 'invalid_format'
        },
        {
            type: 'undefined',
            initialState: undefined,
            expectedResult: 'invalid_format'
        },
        {
            type: 'null',
            initialState: null,
            expectedResult: 'invalid_format'
        },
        {
            type: 'string',
            initialState: 'ricflair-woo',
            expectedResult: 'invalid_format'
        },
        {
            type: 'number',
            initialState: 69,
            expectedResult: 'invalid_format'
        },

    ].forEach(({

        type,
        initialState,
        expectedResult

    }) => {


        it( `getFromat with ${ type }`, function() {

            const result = getFormat({ initialState });

            expect( result ).to.equal( expectedResult );
        });
    });
});
