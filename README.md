# ReduxX

[![npm version](https://badge.fury.io/js/reduxx.svg)](https://badge.fury.io/js/reduxx) [![Build Status](https://travis-ci.org/msteckyefantis/reduxx.svg?branch=master)](https://travis-ci.org/msteckyefantis/reduxx)

[![ReduxX](https://s18.postimg.org/643pjzgyx/Redux_X_1.png)](https://lessonshop.net)
### ReduxX, similar to SpaceX and iPhoneX

**(with 100% code coverage😉👍🏿👍🏽👍🏻)**

#### ReduxX is a lightweight yet super-powerful, very easy to learn, and very easy to set up React state management library.

### ReduxX News: ReduxX v2 coming soon! Still keeping it very simple, with a few key modifications that seem to be the natural next steps for this tool.

### Table of Contents:

#### 1. [Why Use ReduxX](#why-use-reduxx)

#### 2. [How ReduxX Works](#how-reduxx-works)


## Why Use ReduxX:

In larger React apps, it's really nice to have global state (global as in globally accessible, **NOT** stored as a global browser variable). But when normally dealing with a global state object you may encounter a problem, your state looks like this:

```
...
userProfileMainPicture: null
userProfileFirstName: 'Danny'
accountSettingsEmailVerified: true
...
```

And when getting and setting the global state, it looks something like this:

```.js
// the old way: getting value from the global state
const mainPicture = (

    globalStateStore.state.userProfileMainPicture
);

// the old way: setting a value in the global state
globalStateStore.setState({

    userProfileMainPicture: 'https://image.png'
});
```

Alternatively, you can use nested React state to have nicer variable names to deal with. The problem with that is it gets unnecessarily confusing and messy looking:

```.js
/*
the old way: updating a nested component

    in this example, assume the state key "userProfile"
    has an associated value which is an
    object with several properties


    Below is how you would update
    a single property of the userProfile object
    while preserving the other properties
*/
this.setState( previousState => {

    return {

        userProfile: Object.assign(

            {},

            previousState.userProfile,

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
userProfile-mainPicture: null
userProfile-firstName: 'Danny'
accountSettings-emailVerified: true
...
```
and to get and set the state, you just need to do this:


```.js
// cleanly get a global state value with ReduxX:

const mainPicture = reduxX.getState({

    key1: 'userProfile',
    key2: 'mainPicture'
});


// smoothly set a global state value with ReduxX:

reduxX.setState({

    key1: 'userProfile',
    key2: 'mainPicture',
    value: 'https://image.png'
});

```


#### Why is ReduxX better than the other old fashioned React state management libraries?

**ReduxX is incredibly simple** to install and learn. Everything you need to know is contained in this README.md file. **For ReduxX you only need to follow the 3 simple steps in the [How ReduxX Works Section](#how-reduxx-works) below!** Essentially, you only need to be concerned with two functions: `reduxX.getState`, and `reduxX.setState`. These functions work exactly like normal React state, except you can use them anywhere in your code to access a global state, wow!

---


## How ReduxX works:


### Step 1: Install ReduxX and Set Your Initial State

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
```

Alternatively, you can set the initial state using an object. The following code sample works exactly the same as the code sample above:

```.js
'use strict';

const ReduxX = require( 'reduxx' );


module.exports = ReduxX({

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
```


### Step 2: Set up ReduxX

In the most parent component itself, the component that contains all your other components, add the following:

```.js
'use strict';

const React = require( 'react' );

const reduxX = require( './reduxx.js' );


module.exports = class App extends React.Component {

    constructor( props ) {

        super( props );

        // Step 2: a) add this here
        reduxX.setMainComponent( this );
    }

    componentDidMount() {

        // Step 2: b) also add this here
        reduxX.setInitialState();
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

const e = React.createElement;

const reduxX = require( /*path to reduxx.js file, the file created in Step 1*/ );


function handleClick() {

    // set the global state for one or more items like this:

    reduxX.setState(

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

    // get the global state for an item like this:

    const monkeyHeight = reduxX.getState({

        key1: 'monkey',
        key2: 'height'
    });

    console.log(

        `The reduxX monkey is ${ monkeyHeight } tall!`
    );

    // should log: The reduxX monkey is 69cm tall!
}


module.exports = class SomeDiv extends React.Component {

    render() {

        return e(

            'div',

            {
                onClick: () => {

                    handleClick();
                }
            }
        );
    }
}
```
This example also includes a `reduxX.getState` invocation. You can use this function anywhere and this function gets the requested value from the global state! Extreme #swaggy🐸🎅🏿👳🏽🐉!

<br/><br/>


Wow that's it, <b>so easy!</b>

All you need to do is require your `./reduxx.js` file you created in Step 1 and then use `reduxX.setState` and `reduxX.getState` to manage your global state (like in Step 3).

![ReduxX Rocks!](https://media1.tenor.com/images/8d99bca02126d5d1e16a6000efb34e7b/tenor.gif "Jar Jar Approves!")

---

Check out [LessonShop.net](https://lessonshop.net) to take or teach coding lessons!!
Market yourself as a developer teacher for free and get free marketing!
