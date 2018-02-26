# ReduxX

[![npm version](https://badge.fury.io/js/reduxx.svg)](https://badge.fury.io/js/reduxx)

### ReduxX, similar to SpaceX and iPhoneX


#### Way better React State Management than [Dan Abramov's](https://twitter.com/dan_abramov?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor) super-overly-complicated [Redux](https://redux.js.org/introduction). 😉



## How it works:


#### Step 1:

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



#### Step 2:

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


#### Step 3:

Now anywhere you normally do a React [setState](https://reactjs.org/docs/react-component.html#setstate), you can now setState with ReduxX to access a global state and never have to worry about collisions, so exciting!:

```.js

'use strict';

// some other module

const reduxX = require( <path to reduxx.js file> );

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

module.exports = class App someDiv React.Component {


    render() {

        ...

        return <div onClick={handleClick}/>;
    }
}
```


Wow that's it, <b>so easy!</b>

All you need to do is require your `./reduxx.js` file you created in Step 1 and then use `reduxX.setState` and `reduxX.getState` to manage your global state (like in Step 3).

![ReduxX Rocks!](https://media1.tenor.com/images/8d99bca02126d5d1e16a6000efb34e7b/tenor.gif "Jar Jar Approves!")

---

Check out [LessonShop.net](https://lessonshop.net) to take or teach coding lessons!!
Market yourself as a developer teacher for free and get free marketing!
