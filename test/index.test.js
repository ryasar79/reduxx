'use strict';

const ROOT_PATH = '../';

const MODULE_PATH = 'index';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

const proxyquire = require( 'proxyquire' ).noCallThru();

const sinon = require( 'sinon' );


describe( MODULE_PATH, function() {

    // let mockIndex;
    let getStateKeyMapperIndex;

    function getModule( values ) {

        getStateKeyMapperIndex = sinon.stub().returns(

            values.getStateKeyMapperResults
        );

        const mockIndex = {

            setMainComponent: function() {

                return {

                    setMainComponent: 'yes',
                    self: this
                };
            },
            getStateKeyMapper: getStateKeyMapperIndex,
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

            './lib/index.js': mockIndex,
        };

        return proxyquire( FULL_MODULE_PATH, proxyquireStubs );
    }

    it( 'normal operation', function() {

        const ReduxX = getModule({

            getStateKeyMapperResults: {

                stateKeyMapper: 'yea'
            }
        });

        const reduxX = ReduxX({

            initialState: [

                {
                    theInitialState: 'yep'
                },
            ]
        });

        expect( getStateKeyMapperIndex.args.length ).equal( 1 );
        expect( getStateKeyMapperIndex.args[0].length ).equal( 1 );
        expect( getStateKeyMapperIndex.args[0][0] ).eql({

            initialState: [

                {
                    theInitialState: 'yep'
                },
            ]
        });

        const setMainComponentResult = reduxX.setMainComponent();

        expect( setMainComponentResult ).eql({

            setMainComponent: 'yes',
            self: {

                reduxX: {}
            }
        });

        const setInitialStateResult = reduxX.setInitialState();

        expect( setInitialStateResult ).eql({

            setInitialState: 'yes',
            self: {

                reduxX: {},
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

                reduxX: {},
                stateKeyMapper: {

                    stateKeyMapper: 'yea'
                },
            }
        });

        const setStateResult = reduxX.setState();

        expect( setStateResult ).eql({

            setState: 'yes',
            self: {

                reduxX: {},
                stateKeyMapper: {

                    stateKeyMapper: 'yea'
                },
            }
        });
    });
});
