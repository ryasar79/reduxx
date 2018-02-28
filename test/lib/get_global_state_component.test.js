'use strict';

const ROOT_PATH = '../../';

const MODULE_PATH = 'lib/get_global_state_component';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

// const proxyquire = require( 'proxyquire' ).noCallThru();

// const sinon = require( 'sinon' );

const getGlobalStateComponent = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    it( 'normal operation', function() {

        const mockReduxXCore = {

            globalStateComponent: {

                theGlobalStateComponent: 'dan abromov'
            }
        };

        const results = getGlobalStateComponent({

            reduxXCore: mockReduxXCore
        });

        expect( results ).to.eql({

            theGlobalStateComponent: 'dan abromov'
        });
    });

    it( 'missing global state component', function() {

        const mockReduxXCore = {};

        let error = null;

        try {

            getGlobalStateComponent({

                reduxXCore: mockReduxXCore
            });

        } catch( err ) {

            error = err;

        }

        expect( error.message ).to.equal( 'ReduxX error: global state component not set' );
    });
});
