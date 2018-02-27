'use strict';

const ROOT_PATH = '../../';

const MODULE_PATH = 'lib/configure_initial_state';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

// const proxyquire = require( 'proxyquire' ).noCallThru();

// const sinon = require( 'sinon' );

const configureInitialState = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    it( 'normal operation: regular array type initial state provided', function() {

        const result = configureInitialState({

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

        expect( result ).to.eql([

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
        ]);
    });

    it( 'normal operation: object format initial state provided', function() {

        const result = configureInitialState({

            initialState: {

                monkey: {

                    favoriteFood: 'banana',
                    height: '69cm',
                },
                hippo: {

                    favoriteFood: 'watermelon',
                }
            }
        });

        expect( result ).to.eql([

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
        ]);
    });

    // it( 'error in setup, have both initial state formats', function() {
    //
    //     let error = null;
    //
    //     try {
    //
    //         configureInitialState({
    //
    //             initialState: [
    //
    //                 {
    //                     key1: 'monkey',
    //                     key2: 'favoriteFood',
    //                     initialValue: 'banana',
    //                 },
    //                 {
    //                     key1: 'monkey',
    //                     key2: 'height',
    //                     initialValue: '69cm',
    //                 },
    //                 {
    //                     key1: 'hippo',
    //                     key2: 'favoriteFood',
    //                     initialValue: 'watermelon',
    //                 }
    //             ],
    //
    //             initialStateObjectFormat: {
    //
    //                 monkey: {
    //
    //                     favoriteFood: 'banana',
    //                     height: '69cm',
    //                 },
    //                 hippo: {
    //
    //                     favoriteFood: 'watermelon',
    //                 }
    //             }
    //         });
    //
    //     } catch( err ) {
    //
    //         error = err
    //     }
    //
    //     expect( error.message ).to.equal(
    //
    //         'incorrect ReduxX initial state setup'
    //     );
    // });
    //
    // it( 'error in setup, have neither initial state formats', function() {
    //
    //     let error = null;
    //
    //     try {
    //
    //         configureInitialState({});
    //
    //     } catch( err ) {
    //
    //         error = err
    //     }
    //
    //     expect( error.message ).to.equal(
    //
    //         'incorrect ReduxX initial state setup'
    //     );
    // });
});
