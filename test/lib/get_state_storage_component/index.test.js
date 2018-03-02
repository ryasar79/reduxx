'use strict';

const ROOT_PATH = '../../../';

const MODULE_PATH = 'lib/get_state_storage_component/index';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

const proxyquire = require( 'proxyquire' ).noCallThru();

const sinon = require( 'sinon' );



describe( MODULE_PATH, function() {

    let setGlobalStateStorageInstanceStub;
    let setInitialStateStub;
    let createElementStub;

    function getModule() {

        createElementStub = sinon.stub();

        const MockReact = {

            Component: class {

                constructor() {

                    this.props = {

                        children: [ 'a', 'b', 'c' ]
                    }
                }
            },
            createElement: createElementStub,
        };

        setGlobalStateStorageInstanceStub = sinon.stub();
        setInitialStateStub = sinon.stub();

        const proxyquireStubs = {

            'react': MockReact,
            './set_global_state_storage_instance.js': setGlobalStateStorageInstanceStub,
            './set_initial_state.js': setInitialStateStub
        };

        return proxyquire( FULL_MODULE_PATH, proxyquireStubs );
    }

    it( 'normal operation', function() {

        const module = getModule();

        const TheComponent = module({

            reduxXCore: { theReduxXCore: 'yes' },
            initialState: { theInitialState: 'yes' },
            stateKeyMapper: { theStateKeyMapper: 'yes' }
        });

        const theInstance = new TheComponent();

        expect( theInstance.constructor.name ).to.equal( 'ReduxXStateStorageComponent' );

        expect( setGlobalStateStorageInstanceStub.args.length ).to.equal( 1 );
        expect( setGlobalStateStorageInstanceStub.args[0].length ).to.equal( 1 );
        expect( setGlobalStateStorageInstanceStub.args[0][0] ).to.eql({

            reduxXCore: { theReduxXCore: 'yes' },
            globalStateStorageInstance: theInstance
        });

        theInstance.componentDidMount();

        expect( setInitialStateStub.args.length ).to.equal( 1 );
        expect( setInitialStateStub.args[0].length ).to.equal( 1 );
        expect( setInitialStateStub.args[0][0] ).to.eql({

            reduxXCore: { theReduxXCore: 'yes' },
            initialState: { theInitialState: 'yes' },
            stateKeyMapper: { theStateKeyMapper: 'yes' }
        });

        theInstance.render();

        expect( createElementStub.args.length ).to.equal( 1 );
        expect( createElementStub.args[0].length ).to.equal( 3 );
        expect( createElementStub.args[0][0] ).to.equal( 'div' );
        expect( createElementStub.args[0][1] ).to.eql( {} );
        expect( createElementStub.args[0][2] ).to.eql( [ 'a', 'b', 'c' ] );
    });
});
