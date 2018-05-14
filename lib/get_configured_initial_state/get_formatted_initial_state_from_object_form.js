'use strict';

const {

    utils: {

        getFormattedKeys
    },
    
    constants: {

        REDUXX_SPECIAL_KEY
    }

} = require( '../tools.js' );


const recursivelyRetrieveFormattedInitialStateData = Object.freeze(

    ({
        currentKeys,
        currentInitialStateData,
        formattedInitialState

    }) => {

        Object.keys( currentInitialStateData ).forEach( key => {

            if( key === REDUXX_SPECIAL_KEY ) {

                const value = currentInitialStateData[ REDUXX_SPECIAL_KEY ];

                const formattedInitialStateData = {
    
                    keys: getFormattedKeys({ keys: currentKeys }),
                    value
                };
    
                formattedInitialState.push( formattedInitialStateData );
            }
            else {

                recursivelyRetrieveFormattedInitialStateData({

                    currentKeys: currentKeys.concat( key ),
                    currentInitialStateData: currentInitialStateData[ key ],
                    formattedInitialState
                });
            }
        });
    }
);


module.exports = Object.freeze(

    ({
        initialState,

    }) => {

        const formattedInitialState = [];
            
        Object.keys( initialState ).forEach( levelOneKey => {

            const levelOneInitialStateData = initialState[ levelOneKey ];

            recursivelyRetrieveFormattedInitialStateData({

                currentKeys: [ levelOneKey ],
                currentInitialStateData: levelOneInitialStateData,
                formattedInitialState
            });
        });

        return formattedInitialState;
    }
);
