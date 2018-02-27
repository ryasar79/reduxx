'use strict';

const ROOT_PATH = '../../';

const MODULE_PATH = 'lib/set_state';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

// const proxyquire = require( 'proxyquire' ).noCallThru();

const sinon = require( 'sinon' );

const setStateFresh = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    let setStateStub;

    it( 'normal operation', function() {

        setStateStub = sinon.stub();

        const setState = setStateFresh.bind({

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
                    initialValue: '69cm',
                },
                {
                    key1: 'hippo',
                    key2: 'favoriteFood',
                    initialValue: 'watermelon',
                }
            ]
        });

        setState(

            {
                key1: 'monkey',
                key2: 'favoriteFood',
                value: 'apple',
            },
            {
                key1: 'hippo',
                key2: 'favoriteFood',
                value: undefined,
            }
        );

        expect( setStateStub.args.length ).to.equal( 1 );
        expect( setStateStub.args[0].length ).to.equal( 1 );
        expect( setStateStub.args[0][0] ).to.eql({

            'monkey-favoriteFood': 'apple',
            'hippo-favoriteFood': undefined,
        });
    });

    it( 'trying to set state when main component not set up yet', function() {

        const setState = setStateFresh.bind({

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

            setState(

                {
                    key1: 'monkey',
                    key2: 'favoriteFood',
                    value: 'apple',
                },
                {
                    key1: 'hippo',
                    key2: 'favoriteFood',
                    value: undefined,
                }
            );

        } catch( err ) {

            error = err
        }

        expect( error.message ).to.equal(

            'error in ReduxX setState: main component not setup'
        );
    });

    it( 'trying to set state with state keys that do not exist', function() {

        const setState = setStateFresh.bind({

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

            setState(

                {
                    key1: 'monkey',
                    key2: 'favoriteFoodz',
                    value: 'apple',
                },
                {
                    key1: 'hippo',
                    key2: 'favoriteFood',
                    value: undefined,
                }
            );

        } catch( err ) {

            error = err
        }

        expect( error.message ).to.equal(

            `error in ReduxX setState: ` +
            `cannot set state with keys not in initial state`
        );
    });
});
