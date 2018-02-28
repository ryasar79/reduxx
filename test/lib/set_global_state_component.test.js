'use strict';

const ROOT_PATH = '../../';

const MODULE_PATH = 'lib/set_global_state_component';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

// const proxyquire = require( 'proxyquire' ).noCallThru();

// const sinon = require( 'sinon' );

const setGlobalStateComponentFresh = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    it( 'normal operation', function() {

        const mockReduxXCore = {};

        const setGlobalStateComponent = setGlobalStateComponentFresh.bind({

            reduxXCore: mockReduxXCore,
        });

        const mockGlobalStateComponent = {

            globalStateComponent: 'yea bruv'
        };

        setGlobalStateComponent( mockGlobalStateComponent )

        expect( mockReduxXCore.globalStateComponent ).to.eql({

            globalStateComponent: 'yea bruv'
        });
    });
});
