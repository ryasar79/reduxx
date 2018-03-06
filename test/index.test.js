'use strict';

const ROOT_PATH = '../';

const MODULE_PATH = 'index';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

const proxyquire = require( 'proxyquire' ).noCallThru();

const sinon = require( 'sinon' );


describe( MODULE_PATH, function() {

    let getConfiguredInitialStateStub;

    let getStateKeyMapperStub;


    let getGlobalStateStorageInstanceStub;

    let getStateFunction;
    let setStateFunction;
    let setupReduxXFunction;

    function getModule( values ) {

        getConfiguredInitialStateStub = sinon.stub().returns(

            values.getConfiguredInitialStateResults
        );

        getStateKeyMapperStub = sinon.stub().returns(

            values.getStateKeyMapperResults
        );

        getGlobalStateStorageInstanceStub = sinon.stub().returns({

            gssi: 'yes'
        });

        // getStateStorageComponentStub = sinon.stub().returns(
        //
        //     values.getStateStorageComponentResults
        // );

        setupReduxXFunction = function() {

            return {

                setupReduxX: 'yes',
                self: this
            };
        };

        getStateFunction = function() {

            return {

                getState: 'yes',
                self: this
            };
        };
        setStateFunction = function() {

            return {

                setState: 'yes',
                self: this
            };
        };

        const mockLibIndex = {

            tools: {

                constants: {

                    REDUXX_SPECIAL_KEY: 'abc'
                }
            },

            getGlobalStateStorageInstance: getGlobalStateStorageInstanceStub,

            // getStateStorageComponent: getStateStorageComponentStub,

            getConfiguredInitialState: getConfiguredInitialStateStub,

            getStateKeyMapper: getStateKeyMapperStub,
            getState: getStateFunction,
            setState: setStateFunction,
            setupReduxX: setupReduxXFunction,
        };

        const proxyquireStubs = {

            './lib/index.js': mockLibIndex,
        };

        return proxyquire( FULL_MODULE_PATH, proxyquireStubs );
    }

    it( 'normal operation', function() {

        const initialState = [

            {
                theInitialState: 'yep'
            },
        ];

        const ReduxX = getModule({

            getStateKeyMapperResults: {

                stateKeyMapper: 'yea'
            },

            getConfiguredInitialStateResults: initialState,

            getStateStorageComponentResults: {

                theStorageComponent: 'yes'
            },
        });

        const reduxX = ReduxX({

            initialState,

            obscureStateKeys: true,
        });

        expect( reduxX.stateKeyMapper ).to.eql({

            stateKeyMapper: 'yea'
        });


        expect( reduxX.REDUXX_SPECIAL_KEY ).to.equal( 'abc' );

        expect( getConfiguredInitialStateStub.args.length ).to.equal( 1 );
        expect( getConfiguredInitialStateStub.args[0].length ).to.equal( 1 );
        expect( getConfiguredInitialStateStub.args[0][0] ).to.eql({

            initialState: [

                {
                    theInitialState: 'yep'
                },
            ],
        });

        expect( getStateKeyMapperStub.args.length ).to.equal( 1 );
        expect( getStateKeyMapperStub.args[0].length ).to.equal( 1 );
        expect( getStateKeyMapperStub.args[0][0] ).to.eql({

            obscureStateKeys: true,

            initialState: [

                {
                    theInitialState: 'yep'
                },
            ],
        });

        const getStateResult = reduxX.getState();

        expect( getStateResult ).eql({

            getState: 'yes',
            self: {

                reduxXCore: {},
                stateKeyMapper: {

                    stateKeyMapper: 'yea'
                },
            }
        });

        const setStateResult = reduxX.setState();

        expect( setStateResult ).eql({

            setState: 'yes',
            self: {

                reduxXCore: {},
                stateKeyMapper: {

                    stateKeyMapper: 'yea'
                },
            }
        });

        const setupReduxXResult = reduxX.setupReduxX();

        expect( setupReduxXResult ).eql({

            setupReduxX: 'yes',
            self: {

                initialState: [

                    {
                        theInitialState: 'yep'
                    },
                ],
                reduxXCore: {},
                stateKeyMapper: {

                    stateKeyMapper: 'yea'
                },
            }
        });

        expect( reduxX.globalStateStorageInstance ).to.eql({

            gssi: 'yes'
        });

        expect( getGlobalStateStorageInstanceStub.args.length ).to.equal( 1 );
        expect( getGlobalStateStorageInstanceStub.args[0].length ).to.equal( 1 );
        expect( getGlobalStateStorageInstanceStub.args[0][0] ).to.eql({

            reduxXCore: {}
        });
    });
});
