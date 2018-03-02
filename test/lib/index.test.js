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

        // const getStateStorageComponent = {
        //
        //     msmzc: 'yes'
        // };

        const mockSetGlobalStateStorageInstance = {

            mggsc: 'yes'
        };

        const mockGetGlobalStateStorageInstance = {

            mggsc: 'yes'
        };

        const mockGetState = {

            mgs: 'yes'
        };

        const mockSetState = {

            mss: 'yes'
        };

        const mockTools = {

            mt: 'yes'
        };

        const mockSetInitialState = {

            msis: 'yes',
        };

        const proxyquireStubs = {

            './get_configured_initial_state.js': mockGetConfiguredInitialState,
            './get_state_key_mapper.js': mockGetStateKeyMapper,
            './set_global_state_storage_instance.js': mockSetGlobalStateStorageInstance,
            './get_global_state_storage_instance.js': mockGetGlobalStateStorageInstance,
            './get_state.js': mockGetState,
            './set_state.js': mockSetState,
            // './get_state_storage_component/index.js': getStateStorageComponent,
            './tools.js': mockTools,
            './set_initial_state.js': mockSetInitialState
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
            // getStateStorageComponent: {
            //
            //     msmzc: 'yes'
            // },
            setGlobalStateStorageInstance: {

                mggsc: 'yes'
            },
            getGlobalStateStorageInstance: {

                mggsc: 'yes'
            },
            setInitialState: {

                msis: 'yes'
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
