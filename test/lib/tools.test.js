'use strict';

const ROOT_PATH = '../../';

const MODULE_PATH = 'lib/tools';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

// const proxyquire = require( 'proxyquire' ).noCallThru();

// const sinon = require( 'sinon' );

const tools = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    it( '.utils.getKeyName', function() {

        expect( tools.utils.getKeyName( 1 ) ).to.equal( 'key1' );
        expect( tools.utils.getKeyName( 2 ) ).to.equal( 'key2' );
        expect( tools.utils.getKeyName( 3 ) ).to.equal( 'key3' );
    });

    it( '.utils.getGuid', function() {

        expect( tools.utils.getGuid().length ).to.equal( 36 );
        expect( tools.utils.getGuid().replace(/[^\-]/g, "").length ).to.equal( 4 );
    });
});
