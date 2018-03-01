# ReduxX

[![npm version](https://badge.fury.io/js/reduxx.svg)](https://badge.fury.io/js/reduxx) [![Build Status](https://travis-ci.org/msteckyefantis/reduxx.svg?branch=master)](https://travis-ci.org/msteckyefantis/reduxx)

[![ReduxX](https://s18.postimg.org/643pjzgyx/Redux_X_1.png)](https://lessonshop.net)
### **ReduxX**, similar to SpaceX and iPhoneX, ReduxX is the **next generation** React state management tool.

**(with 100% code coverage😉👍🏿👍🏽👍🏻)**

#### ReduxX is a lightweight yet super-powerful, very easy to learn, and very easy to set up React state management library.

---
#### **ReduxX News:** ReduxX v3 out now!

##### Breaking Changes:

1. The section [How ReduxX Works - Step 2: Set up ReduxX](#step-2-set-up-reduxx), now works differently

2. `globalStateComponent` has been renamed to `globalStateStorageInstance`

##### Updates:
Read the brief documentation to see the 🐸🐉 **powerful new updates!!** 🐉🐸

#####


---


### Table of Contents:

#### 1. [Why Use ReduxX](#why-use-reduxx)

#### 2. [How ReduxX Works](#how-reduxx-works)

- [Step 1: Install ReduxX and Set Your Initial Global State](#step-1-install-reduxx-and-set-your-initial-global-state)
- [Step 2: Set up ReduxX](#step-2-set-up-reduxx)
- [Step 3: Easily Get and Set Values to the Global State](#step-3-easily-get-and-set-values-to-the-global-state)

## Why Use ReduxX:

In larger React apps, it's really nice to have global state (global as in globally accessible, **NOT** stored as a global browser variable). But when normally dealing with a global state object, you may encounter a problem, your state may look something like this:

```
...
accountSettingsEmailVerified: true
user: 'dandan69',
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
user: 'dandan69',
user-profile-firstName: 'Danny'
user-profile-mainPicture: null
user-profile-mainPicture-isPublic: true
...
```
and to get and set the state, you just need to do this:


```.js
// cleanly get a global state value with ReduxX:

const mainPicture = reduxX.getState({

    key1: 'user',
    key2: 'profile',
    key3: 'mainPicture'
});

// smoothly set a global state value with ReduxX:

reduxX.setState({

    key1: 'user',
    key2: 'profile',
    key3: 'mainPicture',
    value: 'https://image.png'
});


// Note: you can use any number of keys
// to set and get values from the global state
```


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

const React;

const ReduxX = require( 'reduxx' );


module.exports = ReduxX({

    React,

    initialState: [

        {
            key1: 'monkey',
            key2: 'favoriteFood',
            value: 'banana',
        },
        {
            key1: 'monkey',
            value: 'curious george',
        },
        {
            key1: 'monkey',
            key2: 'height',
            value: '69cm',
        },
        {
            key1: 'hippo',
            key2: 'status',
            key3: 'mood',
            value: 'hungry',
        }
    ]    
});
```
> Notes:
>
> a) you can use any number of keys
>
> b) technically you can put this reduxx.js file anywhere, but it makes most sense to put it in your root folder based on how you access it (in Step 3)

### Step 2: Set up ReduxX

In the most parent component itself, the component that contains all your other components, create a React element using the `StateStorageComponent` and add this element as a child of your most parent component:


```.js
'use strict';

const React = require( 'react' );

const YourOtherComponent = require( '...' );

const AnotherOneOfYourComponents = require( '...' );

// import the following component from the file you created in Step 1
// (note: this particular path below assumes the reduxx.js file
// is in the same directory as this file)
const { StateStorageComponent } = require( './reduxx.js' );


module.exports = class App extends React.Component {

    render() {

        return (
            <div id="Your Main Component">

                <YourOtherComponent/>

                <AnotherOneOfYourComponents/>

               	// Step 2) create the React element like this
                <StateStorageComponent/>
            </div>
        )
    }
}
```
Essentially, to always have access to the global state, you just need to create and mount this React element in a place where it will always stay mounted.


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
            key1: 'monkey',
            key2: 'favoriteFood',
            value: 'apple',
        },
        {
            key1: 'hippo',
            key2: 'status',
            key3: 'mood',
            value: 'full',
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



    /*
      Old Fashioned State Changing:

        You can also access and alter the global state manually.
        The globalStateStorageInstance (and its state)
        is just a normal React Component instance (and state).
    */

    const { globalStateStorageInstance } = reduxX;

    // setting the state:
    // this will produce the same state change as above

    globalStateStorageInstance.setState({

        'monkey-favoriteFood': 'apple',
        'hippo-status-mood': 'full',
    });

    // getting the state:
    // once again its the same as getting the state like above

    const secondMonkeyHeight = (

    	globalStateStorageInstance.state[ 'monkey-height' ]

    );

    // (monkeyHeight === secondMonkeyHeight) is true
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

Check out [LessonShop.net](https://lessonshop.net) to take or teach coding lessons!!
Market yourself as a developer teacher for free and get free marketing!
