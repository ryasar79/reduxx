'use strict';

const ROOT_PATH = '../';

const MODULE_PATH = 'index';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

const proxyquire = require( 'proxyquire' ).noCallThru();

const sinon = require( 'sinon' );


describe( MODULE_PATH, function() {

    let configureInitialStateStub;

    let getStateKeyMapperStub;

    function getModule( values ) {

        configureInitialStateStub = sinon.stub().returns(

            values.configureInitialStateResults
        );

        getStateKeyMapperStub = sinon.stub().returns(

            values.getStateKeyMapperResults
        );

        const mockLibIndex = {

            configureInitialState: configureInitialStateStub,
            setMainComponent: function() {

                return {

                    setMainComponent: 'yes',
                    self: this
                };
            },
            getStateKeyMapper: getStateKeyMapperStub,
            getState: function() {

                return {

                    getState: 'yes',
                    self: this
                };
            },
            setState: function() {

                return {

                    setState: 'yes',
                    self: this
                };
            },
            setInitialState: function() {

                return {

                    setInitialState: 'yes',
                    self: this
                };
            },
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

            configureInitialStateResults: initialState,
        });

        const reduxX = ReduxX({

            initialState
        });

        expect( configureInitialStateStub.args.length ).to.equal( 1 );
        expect( configureInitialStateStub.args[0].length ).to.equal( 1 );
        expect( configureInitialStateStub.args[0][0] ).to.eql({

            initialState: [

                {
                    theInitialState: 'yep'
                },
            ],

            // initialStateObjectFormat: undefined,
        });

        expect( getStateKeyMapperStub.args.length ).to.equal( 1 );
        expect( getStateKeyMapperStub.args[0].length ).to.equal( 1 );
        expect( getStateKeyMapperStub.args[0][0] ).to.eql({

            initialState: [

                {
                    theInitialState: 'yep'
                },
            ],
        });

        const setMainComponentResult = reduxX.setMainComponent();

        expect( setMainComponentResult ).eql({

            setMainComponent: 'yes',
            self: {

                reduxXCore: {}
            }
        });

        const setInitialStateResult = reduxX.setInitialState();

        expect( setInitialStateResult ).eql({

            setInitialState: 'yes',
            self: {

                reduxXCore: {},
                stateKeyMapper: {

                    stateKeyMapper: 'yea'
                },
                initialState: [

                    {
                        theInitialState: 'yep'
                    },
                ]
            }
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
    });
});
