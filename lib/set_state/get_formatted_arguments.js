'use strict';

const CONTEMPORARY = 'contemporary';
const CLASSIC = 'classic';

const getArgumentMode = Object.freeze(

    firstArgument => {

        switch( typeof firstArgument ) {

            case 'string':

                return CONTEMPORARY;

            case 'object':

                if( Array.isArray( firstArgument ) ) {

                    return CONTEMPORARY;
                }

                return CLASSIC;

            default:

                throw new Error(

                    'ReduxX error: invalid setState input'
                );
        }
    }
);


module.exports = Object.freeze(

    ( ...setStateArguments ) => {

        const firstArgument = setStateArguments[0];

        const mode = getArgumentMode( firstArgument );

        if( mode === CLASSIC ) {

            return setStateArguments;
        }

        const formattedArguments = [];

        for( let i = 0; i < setStateArguments.length; i += 2 ) {

            const keys = setStateArguments[i];

            const value = setStateArguments[i + 1];

            const setStateData = { keys, value };

            formattedArguments.push( setStateData );
        }

        return formattedArguments;
    }
);
