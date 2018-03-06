'use strict';

const ROOT_PATH = '../../../';

const MODULE_PATH = 'lib/setup_reduxx/index';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

const proxyquire = require( 'proxyquire' ).noCallThru();

const sinon = require( 'sinon' );

// const setupReduxXFresh = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    let setInitialStateStub;

    it( 'normal operation', function() {

        setInitialStateStub = sinon.stub();

        const proxyquireStubs = {

            './set_initial_state.js': setInitialStateStub
        };

        const setupReduxXFresh = proxyquire( FULL_MODULE_PATH, proxyquireStubs );

        const reduxXCore = {

            xCore: 'ya'
        };

        const setupReduxX = setupReduxXFresh.bind({

            reduxXCore,
            initialState: {

                'is': 'theInitialState'
            },
            stateKeyMapper: {

                skm: true
            }
        });

        setupReduxX({

            isTheGlobalStateStorageInstance: true
        });

        expect( setInitialStateStub.args.length ).to.equal( 1 );
        expect( setInitialStateStub.args[0].length ).to.equal( 1 );
        expect( setInitialStateStub.args[0][0] ).to.eql({

            globalStateStorageInstance: {

                isTheGlobalStateStorageInstance: true
            },
            initialState: {

                'is': 'theInitialState'
            },
            stateKeyMapper: {

                skm: true
            }
        });

        expect( reduxXCore ).to.eql({

            xCore: 'ya',
            globalStateStorageInstance: {

                isTheGlobalStateStorageInstance: true
            }
        });
    });
});
