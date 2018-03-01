'use strict';

const ROOT_PATH = '../../';

const MODULE_PATH = 'lib/get_global_state_storage_instance';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

// const proxyquire = require( 'proxyquire' ).noCallThru();

// const sinon = require( 'sinon' );

const getGlobalStateStorageInstance = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    it( 'normal operation', function() {

        const mockReduxXCore = {

            globalStateStorageInstance: {

                theGlobalStateStorageInstance: 'dan abromov'
            }
        };

        const results = getGlobalStateStorageInstance({

            reduxXCore: mockReduxXCore
        });

        expect( results ).to.eql({

            theGlobalStateStorageInstance: 'dan abromov'
        });
    });

    it( 'missing global state component', function() {

        const mockReduxXCore = {};

        let error = null;

        try {

            getGlobalStateStorageInstance({

                reduxXCore: mockReduxXCore
            });

        } catch( err ) {

            error = err;

        }

        expect( error.message ).to.equal( 'ReduxX error: global state storage instance not set' );
    });
});
