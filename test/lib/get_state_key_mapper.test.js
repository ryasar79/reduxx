'use strict';

const ROOT_PATH = '../../';

const MODULE_PATH = 'lib/get_state_key_mapper';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

// const proxyquire = require( 'proxyquire' ).noCallThru();

// const sinon = require( 'sinon' );

const getStateKeyMapper = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    it( 'normal operation', function() {

        const stateKeyMapper = getStateKeyMapper({

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

        expect( stateKeyMapper ).eql({

            monkey: {

                favoriteFood: 'monkey-favoriteFood',
                height: 'monkey-height',
            },

            hippo: {

                favoriteFood: 'hippo-favoriteFood',
            }
        });
    });

    it( 'invalid initial state input', function() {

        let error = null;

        try {

            getStateKeyMapper({

                initialState: [

                    {
                        key1: 'monkey',
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

        } catch( err ) {

            error = err
        }

        expect( error.message ).to.equal(

            'incorrect ReduxX initial state setup'
        );
    });
});
