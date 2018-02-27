'use strict';

const ROOT_PATH = '../../';

const MODULE_PATH = 'lib/set_initial_state';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

// const proxyquire = require( 'proxyquire' ).noCallThru();

const sinon = require( 'sinon' );

const setInitialStateFresh = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    let setStateStub;

    it( 'normal operation', function() {

        setStateStub = sinon.stub();

        const setInitialState = setInitialStateFresh.bind({

            reduxXCore: {

                mainComponent: {

                    setState: setStateStub
                }
            },

            stateKeyMapper: {

                monkey: {

                    favoriteFood: 'monkey-favoriteFood',
                    height: 'monkey-height',
                },

                hippo: {

                    favoriteFood: 'hippo-favoriteFood',
                }
            },

            initialState: [

                {
                    key1: 'monkey',
                    key2: 'favoriteFood',
                    initialValue: 'banana',
                },
                {
                    key1: 'monkey',
                    key2: 'height',
                },
                {
                    key1: 'hippo',
                    key2: 'favoriteFood',
                    initialValue: 'watermelon',
                }
            ]
        });

        setInitialState();

        expect( setStateStub.args.length ).to.equal( 1 );
        expect( setStateStub.args[0].length ).to.equal( 1 );
        expect( setStateStub.args[0][0] ).to.eql({

            'monkey-favoriteFood': 'banana',
            'monkey-height': null,
            'hippo-favoriteFood': 'watermelon',
        });
    });

    it( 'trying to set initial state when main component not set up yet', function() {

        const setInitialState = setInitialStateFresh.bind({

            reduxXCore: {},

            stateKeyMapper: {

                monkey: {

                    favoriteFood: 'monkey-favoriteFood',
                    height: 'monkey-height',
                },

                hippo: {

                    favoriteFood: 'hippo-favoriteFood',
                }
            },

            initialState: [

                {
                    key1: 'monkey',
                    key2: 'favoriteFood',
                    initialValue: 'banana',
                },
                {
                    key1: 'monkey',
                    key2: 'height',
                    initialValue: '69cm',
                },
                {
                    key1: 'hippo',
                    key2: 'favoriteFood',
                    initialValue: 'watermelon',
                }
            ]
        });

        let error = null;

        try {

            setInitialState();

        } catch( err ) {

            error = err
        }

        expect( error.message ).to.equal(

            'error in ReduxX setInitialState'
        );
    });
});
