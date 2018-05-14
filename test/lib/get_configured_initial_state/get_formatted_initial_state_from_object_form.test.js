'use strict';

const ROOT_PATH = '../../../';

const MODULE_PATH = 'lib/get_configured_initial_state/get_formatted_initial_state_from_object_form';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const expect = require( 'chai' ).expect;

// const proxyquire = require( 'proxyquire' ).noCallThru();

// const sinon = require( 'sinon' );

const getFormattedInitialStateFromObjectForm = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    it( 'normal operation', function() {

        const VALUE = '@reduxXKey';
        
        const initialState = {

            monkey: {
    
                [VALUE]: { name: 'Curious George', bff: 'Donkey Kong' },
    
                favoriteFood: {
    
                    [VALUE]: 'banana'
                },
    
                height: {
    
                    [VALUE]: '69cm'
                }
            },
    
            hippo: {
    
                status: {
    
                    mood: {
    
                        [VALUE]: 'hungry'
                    }
                }
            },

            turtle: {

                [VALUE]: null,

                speed: {
    
                    [VALUE]: undefined
                },
            }
        };

        const result = getFormattedInitialStateFromObjectForm({ initialState });

        expect( result ).to.deep.equal([

            {
                keys: [

                    'monkey'
                ],
                value: { name: 'Curious George', bff: 'Donkey Kong' },
            },
            {
                keys: [

                    'monkey',
                    'favoriteFood',
                ],
                value: 'banana',
            },
            {
                keys: [

                    'monkey',
                    'height',
                ],
                value: '69cm',
            },
            {
                keys: [
                    'hippo',
                    'status',
                    'mood'
                ],
                value: 'hungry',
            },
            {
                keys: [

                    'turtle',
                ],

                value: null
            },
            {
                keys: [

                    'turtle',
                    'speed'
                ],

                value: undefined
            }
        ]);
    });
});
