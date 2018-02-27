'use strict';

const ROOT_PATH = '../../';

const MODULE_PATH = 'lib/set_main_component';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

// const proxyquire = require( 'proxyquire' ).noCallThru();

// const sinon = require( 'sinon' );

const setMainComponentFresh = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    it( 'normal operation', function() {

        const mockReduxX = {};

        const setMainComponent = setMainComponentFresh.bind({

            reduxX: mockReduxX,
        });

        const mockMainComponent = {

            mainComponent: 'yea bruv'
        };

        setMainComponent( mockMainComponent )

        expect( mockReduxX.mainComponent ).to.eql({

            mainComponent: 'yea bruv'
        });
    });
});
