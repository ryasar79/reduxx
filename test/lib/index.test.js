'use strict';

const ROOT_PATH = '../../';

const MODULE_PATH = 'lib/index';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

const proxyquire = require( 'proxyquire' ).noCallThru();

// const sinon = require( 'sinon' );


describe( MODULE_PATH, function() {

    function getModule() {

        const mockGetConfiguredInitialState = {

            cis: 'yes'
        };

        const mockGetStateKeyMapper = {

            gskm: 'yes'
        };

        const mockGetGlobalStateStorageInstance = {

            mggsc: 'yes'
        };

        const mockGetState = {

            mgs: 'yes'
        };

        const mockSetupReduxX = {

            mSetupReduxXS: 'yes'
        };

        const mockSetState = {

            mss: 'yes'
        };

        const mockTools = {

            mt: 'yes'
        };

        const proxyquireStubs = {

            './setup_reduxx/index.js': mockSetupReduxX,
            './get_configured_initial_state.js': mockGetConfiguredInitialState,
            './get_state_key_mapper.js': mockGetStateKeyMapper,
            './get_global_state_storage_instance.js': mockGetGlobalStateStorageInstance,
            './get_state/index.js': mockGetState,
            './set_state/index.js': mockSetState,
            './tools.js': mockTools,
        };

        return proxyquire( FULL_MODULE_PATH, proxyquireStubs );
    }

    it( 'normal operation', function() {

        const lib = getModule();

        expect( lib ).eql({

            getConfiguredInitialState: {

                cis: 'yes'
            },
            getStateKeyMapper: {

                gskm: 'yes'
            },
            setupReduxX: {

                mSetupReduxXS: 'yes'
            },
            getGlobalStateStorageInstance: {

                mggsc: 'yes'
            },
            getState: {

                mgs: 'yes'
            },
            setState: {

                mss: 'yes'
            },
            tools: {

                mt: 'yes'
            },
        });
    });
});
