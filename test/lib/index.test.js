'use strict';

const ROOT_PATH = '../../';

const MODULE_PATH = 'lib/index';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

const proxyquire = require( 'proxyquire' ).noCallThru();

// const sinon = require( 'sinon' );


describe( MODULE_PATH, function() {

    function getModule() {

        const mockGetStateKeyMapper = {

            gskm: 'yes'
        };

        const mockSetMainComponent = {

            msmc: 'yes'
        };

        const mockSetInitialState = {

            msis: 'yes'
        };

        const mockGetState = {

            mgs: 'yes'
        };

        const mockSetState = {

            mss: 'yes'
        };

        const proxyquireStubs = {

            './get_state_key_mapper.js': mockGetStateKeyMapper,
            './set_main_component.js': mockSetMainComponent,
            './set_initial_state.js': mockSetInitialState,
            './get_state.js': mockGetState,
            './set_state.js': mockSetState,
        };

        return proxyquire( FULL_MODULE_PATH, proxyquireStubs );
    }

    it( 'normal operation', function() {

        const lib = getModule();

        expect( lib ).eql({

            getStateKeyMapper: {

                gskm: 'yes'
            },
            setMainComponent: {

                msmc: 'yes'
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
        });
    });
});
