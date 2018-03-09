'use strict';

module.exports = Object.freeze(

    ( ...getStateArguments ) => {

        switch( typeof getStateArguments[0] ) {

            case 'string':

                return {

                    keys: [ ...getStateArguments ]
                };

            case 'object':

                const params = getStateArguments[0];

                if( Array.isArray( params ) ) {

                    return {

                        keys: params
                    };
                }

                return params;

            default:

                throw new Error(

                    'ReduxX error: invalid getState input'
                );
        }
    }
);
