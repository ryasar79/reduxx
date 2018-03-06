'use strict';

const ROOT_PATH = '../../';

const MODULE_PATH = 'lib/create_app';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

// const proxyquire = require( 'proxyquire' ).noCallThru();

// const sinon = require( 'sinon' );

const createAppFresh = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    it( 'normal operation: intial state setup incomplete', function() {

        const mockReduxXCore = {

            globalStateStorageInstance: {

                state: {}
            }
        };

        const createApp = createAppFresh.bind({

            reduxXCore: mockReduxXCore
        })

        const results = createApp({

            theApp: 'yeayea'
        });

        expect( results ).to.equal( false );
    });

    it( 'normal operation: intial state setup complete', function() {

        const mockReduxXCore = {

            globalStateStorageInstance: {

                state: {

                    '@reduxXInitialStateSetupComplete': true
                }
            }
        };

        const createApp = createAppFresh.bind({

            reduxXCore: mockReduxXCore
        });

        const results = createApp({

            theApp: 'yeayea'
        });

        expect( results ).to.eql({

            theApp: 'yeayea'
        });
    });

    it( 'missing global state component', function() {

        const mockReduxXCore = {};

        const createApp = createAppFresh.bind({

            reduxXCore: mockReduxXCore
        });

        let error = null;

        try {

            createApp({

                theApp: 'yeayea'
            });

        } catch( err ) {

            error = err;
        }

        expect( error.message ).to.equal(

            'ReduxX error: error in creating app, ' +
            'global state storage instance not set up'
        );
    });
});
