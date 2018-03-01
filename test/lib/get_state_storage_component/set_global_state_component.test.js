'use strict';

const ROOT_PATH = '../../../';

const MODULE_PATH = 'lib/get_state_storage_component/set_global_state_component';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

// const proxyquire = require( 'proxyquire' ).noCallThru();

// const sinon = require( 'sinon' );

const setGlobalStateComponent = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    it( 'normal operation', function() {

        const mockReduxXCore = {};

        const mockGlobalStateComponent = {

            globalStateComponent: 'yea bruv'
        };

        setGlobalStateComponent({

            reduxXCore: mockReduxXCore,
            globalStateComponent: mockGlobalStateComponent,
        });

        expect( mockReduxXCore.globalStateComponent ).to.eql({

            globalStateComponent: 'yea bruv'
        });
    });
});
