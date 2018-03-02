'use strict';

const ROOT_PATH = '../../';

const MODULE_PATH = 'lib/set_global_state_storage_instance';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

// const proxyquire = require( 'proxyquire' ).noCallThru();

// const sinon = require( 'sinon' );

const setGlobalStateStorageInstance = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    it( 'normal operation', function() {

        const mockReduxXCore = {};

        const mockGlobalStateStorageInstance = {

            globalStateStorageInstance: 'yea bruv'
        };

        setGlobalStateStorageInstance.call(

            { reduxXCore: mockReduxXCore },

            mockGlobalStateStorageInstance
        );

        expect( mockReduxXCore.globalStateStorageInstance ).to.eql({

            globalStateStorageInstance: 'yea bruv'
        });
    });
});
