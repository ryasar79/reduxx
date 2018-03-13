# ReduxX

[![npm version](https://badge.fury.io/js/reduxx.svg)](https://badge.fury.io/js/reduxx) [![Build Status](https://travis-ci.org/msteckyefantis/reduxx.svg?branch=master)](https://travis-ci.org/msteckyefantis/reduxx)

[![ReduxX](https://s18.postimg.org/643pjzgyx/Redux_X_1.png)](https://lessonshop.net)
### Similar to SpaceX and iPhoneX, ReduxX is the **next generation** React state management tool.

**(with 100% code coverage😉👍🏿👍🏽👍🏻)**

#### ReduxX is a lightweight yet super-powerful, very easy to learn, and very easy to set up React state management library.


### Table of Contents:

#### 1. [Why Use ReduxX](#why-use-reduxx)

#### 2. [How ReduxX Works](#how-reduxx-works)

- [Step 1: Install ReduxX and Set Your Initial Global State](#step-1-install-reduxx-and-set-your-initial-global-state)
- [Step 2: Set up ReduxX](#step-2-set-up-reduxx)
- [Step 3: Easily Get and Set Values to the Global State](#step-3-easily-get-and-set-values-to-the-global-state)

#### 3. [Bonus Features](#bonus-features)
- [Alternate Input Formats for the ReduxX setState and getState Functions](#alternate-input-formats-for-the-reduxx-setstate-and-getstate-functions)
- [Obscure Your State Keys](#obscure-your-state-keys)
- [Old Fashioned State Managment](#old-fashioned-state-managment)
- [Optimize Your ReduxX App](#optimize-your-reduxx-app)
- [Examples of ReduxX Usage](#examples-of-reduxx-usage)

## Why Use ReduxX:

In larger React apps, it's really nice to have global state (global as in globally accessible, **NOT** stored as a global browser variable). But when normally dealing with a global state object, you may encounter a problem, your state may look something like this:

```
...
accountSettingsEmailVerified: true
user: 'dandan69'
userProfileFirstName: 'Danny'
userProfileMainPicture: null
userProfileMainPictureIsPublic: true
...
```

And when getting and setting the global state, it looks something like this:

```.js
// the old way: getting value from the global state
const mainPicture = (

    globalStateStorageInstance.state.userProfileMainPicture
);

// the old way: setting a value in the global state
globalStateStorageInstance.setState({

    userProfileMainPicture: 'https://image.png'
});
```

Alternatively, you can use nested React state to have nicer variable names to deal with. The problem with that is it gets unnecessarily confusing and messy looking:

```.js
/*
  the old way: updating a nested component

    in this example, assume the state key "pictures"
    has an associated value which is an
    object with several properties


    Below is how you would update
    a single property of the pictures object
    while preserving the other properties
*/
globalStateComponent.setState( previousState => {

    return {

        pictures: Object.assign(

            {},

            previousState.pictures,

            {
                mainPicture: 'https://image.png'
            }
        )
    };
});
```

🙈Ewww, that's not very nice.😰

#### Don't fear, ReduxX is here to save the day!🐉🐬🐙

with ReduxX, the same state as above is automatically generated and it will look something like this:

```
...
accountSettings-EmailVerified: true
user: 'dandan69'
user-profile-firstName: 'Danny'
user-profile-mainPicture: null
user-profile-mainPicture-isPublic: true
...
```
and to get and set the state, you just need to do this:


```.js
// cleanly get a global state value with ReduxX:

const mainPicture = reduxX.getState( 'user', 'profile', 'mainPicture' );


// smoothly set a global state value with ReduxX:

reduxX.setState( [ 'user', 'profile', 'mainPicture' ], 'https://image.png' );
```
> Notes:
>
> a) with ReduxX, you can use any number of keys
>
> b) Check out the [Alternate Input Formats for the ReduxX setState and getState Functions](#alternate-input-formats-for-the-reduxx-setstate-and-getstate-functions) section for other ways to use the `getState` and `setState` functions
>
>


#### Why is ReduxX better than the other old fashioned React state management libraries?

**ReduxX is incredibly simple** to install and learn. Everything you need to know is contained in this README.md file. **For ReduxX you only need to follow the 3 simple steps in the [How ReduxX Works Section](#how-reduxx-works) below!** Essentially, you only need to be concerned with two functions: `reduxX.getState`, and `reduxX.setState`. These functions work exactly like normal React state, except you can use them anywhere in your code to access a global state, wow!

---


## How ReduxX works:


### Step 1: Install ReduxX and Set Your Initial Global State

To install ReduxX, input the following npm command:
```
npm install reduxx --save
```

In the directory of your main React component, the most parent component that contains all your other components, add the following `reduxx.js` file:

```.js
'use strict';

const ReduxX = require( 'reduxx' );


module.exports = ReduxX({

    initialState: [

        {
            keys: [ 'monkey', 'favoriteFood' ],

            value: 'banana',
        },
        {
            // can put a string for the "keys" for single key values
            keys: 'monkey',

            // the value can be of any type,
            // just like using regular React state
            value: { name: 'Curious George', bff: 'Donkey Kong' },
        },
        {
            keys: [ 'monkey', 'height' ],

            value: '69cm',
        },
        {
            keys: [ 'hippo', 'status', 'mood' ],

            value: 'hungry',
        }
    ]    
});
```
> Notes:
>
> a) you can use any number of keys
>
> b) technically you can put this reduxx.js file anywhere, but it makes the most sense to put it in your root folder based on how you access it (in Step 3)
>
>

### Step 2: Set up ReduxX

In the most parent component itself, the component that contains all your other components, set up the ReduxX global state like the following:

```.js
'use strict';

const React = require( 'react' );

// Step 2: a) Import the following setupReduxX function
//            from the file you created in Step 1.
// Note: this particular path assumes the reduxx.js file
//       is in the same directory as this file
const { setupReduxX } = require( './reduxx.js' );


// Your "most parent" component
module.exports = class App extends React.Component {

    constructor( props ) {

        super( props );

        // Step 2: b) Add the setupReduxX function here,
        //            pass in "this" as the first argument
        setupReduxX( this );
    }

    render() {

        ...
    }
}
```


### Step 3: Easily Get and Set Values to the Global State

Now anywhere you normally do a React [setState](https://reactjs.org/docs/react-component.html#setstate), you can now setState with ReduxX to access a global state and never have to worry about collisions, so exciting!:

```.js
'use strict';

// some other module

const React = require( 'react' );

const reduxX = require( /*path to reduxx.js file, the file created in Step 1*/ );


function handleClick() {

    /*
       ReduxX Effortless State Setting and Getting
    */

    // set the global state for one or more items like this:

    reduxX.setState(

        {
            keys: [ 'monkey', 'favoriteFood' ],

            value: 'apple',
        },
        {
            keys: [ 'hippo', 'status', 'mood' ],

            value: 'full'
        }
    );

    // get the global state for an item like this:

    const monkeyHeight = reduxX.getState( 'monkey', 'height' );

    console.log(

        `The reduxX monkey is ${ monkeyHeight } tall!`
    );

    // should log: The reduxX monkey is 69cm tall!
}


module.exports = class SomeDiv extends React.Component {

    render() {

        return <div onClick={this.handleClick} />;
    }
}
```
This example also includes a `reduxX.getState` invocation. You can use this function anywhere and this function gets the requested value from the global state! Extreme #swaggy🐸🎅🏿👳🏽🐉!

<br/><br/>


Wow that's it, <b>so easy!</b>

All you need to do is require your `./reduxx.js` file you created in Step 1 and then use `reduxX.setState` and `reduxX.getState` to manage your global state (like in Step 3).

![ReduxX Rocks!](https://media1.tenor.com/images/8d99bca02126d5d1e16a6000efb34e7b/tenor.gif "Jar Jar Approves!")

---
## Bonus Features

### Alternate Input Formats for the ReduxX setState and getState Functions

For your convenience, and for better code readability, the ReduxX `setState` and `getState` functions offer several ways to set and get values to and from the global state.


```.js
'use strict';

const {

    getState,
    setState,

} = require( /*path to reduxx.js file, the file created in Step 1*/ );

/*
   Different input formats for reduxX.getState
*/

//  The following four getState invocations are equivalent:
getState( 'user' );
getState( [ 'user' ] );
getState({ keys: 'user' });
getState({ keys: [ 'user' ] });


//  The following three getState invocations are equivalent:
getState( 'user', 'profile' );
getState( [ 'user', 'profile' ] );
getState({ keys: [ 'user', 'profile' ] });


/*
   Different input formats for reduxX.setState
*/

//  The following four setState invocations are equivalent:
setState( 'user', { id: 69 } );
setState( [ 'user' ], { id: 69 } );
setState({ keys: 'user', value: { id: 69 } });
setState({ keys [ 'user' ], value: { id: 69 } });

//  The following two setState invocations are equivalent:
//  (these invocations involve setting multiple values at once)
setState(

    [ 'user', 'name' ], 'Danny',
    'user', { id: 69 },
    [ 'user', 'game' ], 'React state library author'
);
setState(

    {
        keys: [ 'user', 'name' ],  
        value: 'Danny'
    },
    {
        keys: [ 'user' ],  
        value: { id: 69 }
    },
    {
        keys: [ 'user', 'game' ],  
        value: 'React state library author'
    }
);
```




### Obscure Your State Keys

Recalling our state from before:

```
...
accountSettings-EmailVerified: true
user: 'dandan69'
user-profile-firstName: 'Danny'
user-profile-mainPicture: null
user-profile-mainPicture-isPublic: true
...
```

You can obscure your state keys by automatically turning them into GUIDs so that your state will look something like this:

```
...
206ca40e-e643-17b6-da3c-616b90800f4e: true
335a8849-9bff-bd2c-9a1a-6f26d61e0f88: 'dandan69'
ae771d1a-f563-c876-3132-b958e62ca205: 'Danny'
1721716f-4d92-ea42-56ca-5df95c175413: null
e04659d7-38a6-bae8-b513-36cfcb300ba7: true
...
```
To obscure your keys, simply set up your ReduxX ([Step 1](#step-1-install-reduxx-and-set-your-initial-global-state)), like this:

```.js
'use strict';

const ReduxX = require( 'reduxx' );


module.exports = ReduxX({

    // adding this will obscure your state keys
    obscureStateKeys: true,

    initialState: [

        ... // the same initial state objects go here
    ],    
});
```


### Old Fashioned State Managment

You can also access and alter the global state manually. The `store` (or equivalently the `globalStateStorageInstance`) and its state, is just a normal React Component instance and state.

```.js
'use strict';

// some other module

const React = require( 'react' );

const reduxX = require( /*path to reduxx.js file, the file created in Step 1*/ );


function handleClick() {

    /*
       Old Fashioned State Setting and Getting:
    */

    const { store } = reduxX;
    // Note that the above line is a shorthand for and is equivalent to:
    // const { globalStateStorageInstance } = reduxX;

    // You can get and set regular state keys
    // in the global state storage component instance:

    store.setState({ hello: 'world' });

    setTimeout( () => {

        const world = store.state.hello;

        console.log( 'hello:', world, '🌏🐙🐼👽🐲🌍' );

        // should log: hello: world 🌏🐙🐼👽🐲🌍

    }, 0 );

    /*
        Using the stateKeyMapper and
        using the REDUXX_SPECIAL_KEY,
        you can work with regular ReduxX type keys
        OR obscured state keys.
        See the "Obscure Your State Keys" section above
        for more information about that topic.
    */

    const { stateKeyMapper, REDUXX_SPECIAL_KEY } = reduxX;

    // setting the state:
    // this will produce the same state change as in Step 3

    const newState = {};

    newState[

        stateKeyMapper.monkey.favoriteFood[ REDUXX_SPECIAL_KEY ]

    ] = 'apple';

    newState[

        stateKeyMapper.hippo.status.mood[ REDUXX_SPECIAL_KEY ]

    ] = 'full';

    store.setState( newState );

    // getting the state:
    // once again its the same as getting the state like in Step 3

    const monkeyHeight = (

        store.state[

            stateKeyMapper.monkey.height[ REDUXX_SPECIAL_KEY ]
        ]
    );

    console.log( `The reduxX monkey is ${ monkeyHeight } tall!` );

    // should log: The reduxX monkey is 69cm tall!
}


module.exports = class SomeDiv extends React.Component {

    render() {

        return <div onClick={this.handleClick} />;
    }
}
```


### Optimize Your ReduxX App

One of ReduxX's *principles* is to be very easy to learn and to work in a similar way to React's regular state. As a result, optimizing your web app that uses ReduxX is similar to optimizing any other React app.

One thing to note is having a global state in the most parent component means that all the children of that parent component can re-render upon **any** state change. This re-rendering occurs even if those children don't need to be changed themselves due to a state change (the component will render the same element but it won't change the DOM because the new rendered element was the same as the last). This results in "wasted" renders. As noted in the [Official React Optimization Documentation](https://reactjs.org/docs/optimizing-performance.html#avoid-reconciliation), these "wasted" renders in many cases don't affect performance.

In the case where you would like to optimize your ReduxX app, here is a way to optimize your components to avoid unnecessary re-rendering:


###### Example: Optimizing a "p" Based Component that Displays Text

Suppose you have a "p" (html paragraph) based component that displays text. Next suppose that text is based on the global state value whose key is `pText` and you only want that "p" component to re-render when `pText` changes.

First of all, here is what our original unoptimized "p" component looks like, let's call it the `MegaPComponent`:

```.js
'use strict';

const React = require( 'react' );

const {

    globalStateStorageInstance

} = require( '../path to reduxx.js file created in Step 1' );


module.exports = class MegaPComponent extends React.Component {

    render() {

        const { pText } = globalStateStorageInstance.state;

        return <p> {pText} </p>;
    }
}
```

Here is what you do, put that "p" component in a div container, lets call that container `Container`:

```.js
'use strict';

const React = require( 'react' );

const MegaPComponent = require( '...path to MegaPComponent' );

const {

    globalStateStorageInstance

} = require( /*path to reduxx.js file, the file created in Step 1*/ );


module.exports = class Container extends React.Component {

    render() {

        const { backgroundColor } = globalStateStorageInstance.state;

        const divStyle = { backgroundColor };

        return(
            <div style={divStyle}>

                <MegaPComponent/>

            </div>
        );
    }
}
```

This is still unoptimized, the `MegaPComponent` will do a no-op render (a "wasted" render) if the `backgroundColor` state value or any other global state value changes.

To avoid this, what you need to do is set the `pText` as a prop of the `MegaPComponent`, and extend the `MegaPComponent` from the `React.PureComponent` class like this:

```.js
'use strict';

const React = require( 'react' );


module.exports = class MegaPComponent extends React.PureComponent {

    render() {

        const { pText } = this.props;

        return <p> {pText} </p>;
    }
}

```

and change your `Container` to be like this:

```.js
'use strict';

const React = require( 'react' );

const MegaPComponent = require( '...path to MegaPComponent' );

const {

    globalStateStorageInstance

} = require( /*path to reduxx.js file, the file created in Step 1*/ );


module.exports = class Container extends React.Component {

    render() {

        const {

            backgroundColor,
            pText

        } = globalStateStorageInstance.state;

        const divStyle = { backgroundColor };

        return(
            <div style={divStyle}>

                <MegaPComponent pText={pText}/>

            </div>
        );
    }
}
```
In the `MegaPComponent`, by setting the `pText` value as a prop, and by making the `MegaPComponent` extend from the `React.PureComponent` class, it will now only do a render when the `pText` value changes. You can apply this optimization technique to any component where you want to avoid "wasted" renders. In some cases, you may need to adjust the `shouldComponentUpdate` React component method in order to achieve the same effect because React PureComponents only do a shallow comparison of the previous and next props and state. Here is a more detailed explanation of how this works from the [Official React Documentation on Pure Components](https://reactjs.org/docs/react-api.html#reactpurecomponent).


### Examples of ReduxX Usage

- [NeverCodeAlone.ca](https://nevercodealone.ca): a sample website using ReduxX ([GitHub repo with code](https://github.com/msteckyefantis/never_code_alone))

---


Check out [LessonShop.net](https://lessonshop.net) to take or teach coding lessons!!
Market yourself as a developer teacher for free and get free marketing!
