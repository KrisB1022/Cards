This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Development

Dependencies:

-   [node v10.x](https://nodejs.org/en/)
-   [yarn v1.15.X](https://yarnpkg.com/en/)

Start up

-   `yarn start` (npm packages will auto install and will launch the app)

## Testing

Tests are implemented using [Jest](https://jestjs.io/) and [Enzyme](https://airbnb.io/enzyme/)

-   `yarn test` will run tests in "watch" mode
-   `yarn test --coverage` will print out test coverage for the app

## Concepts

The main concept for this app, was to first, provide a working production style app for code review. Secondly, it was to provde a simple design and feature set to better allow for more focused questions during an interview.

Testing was done so that coverage is above 98%, and is meant to showcase a few different methods on how to test a React based project. `Test` duplication of code, was intentional where found, based on the idea that each test has it's own scope and logic and should be easily modified without changing other tests - futher helping to protect the codebase from unintential changes.

The Enzyme testing framework was choses as it, in my opinion, is best for Unit tests and is easy to mock and stub data.

I chose to stay with a more standard, 'prop drilling' style of app due to the size, reduced complexity and provided time contraint on this interview test. Full testing and archetecture of a Redux and React Context based app have been done prior at my current job. I would be willing to talk about what the pros and cons are for each approach especially with testing those.

With the styling, I chose to go simple and use [Bootstrap](https://getbootstrap.com/), [ReactStrap](https://reactstrap.github.io/) (React wrapped Bootstrap markup), and [Emotion](https://github.com/emotion-js/emotion). Each I'm currently using in production for my current job, after some investigation on the most efficient 3rd party or hand-rolled direction.

I'm a fan of PropTypes and using them to help in removing comming type errors in data. You'll see some usage of PropTypes in some components. I tend to be more specific about my props instead of relying on a simple PropTypes.object or PropTypes.array style of checking; often instead using .shape({}) or other more specific methods available.

## Improvements

The design is a simple one and if given the time, would have attempted a little more complex and robust design.

I chose to implement a filter menu that houses a few different filter options as well as the total count of cards. If I had more time, I think I would first add a loading indicator to this filter menu (one exists when cards are loading) as well as maybe rethink how the UX of this menus works. I feel like having the menu options available always on desktop and the current menu shown on a mobile device would be a better direction.

I wasn't able to fully integrate a toast or messaging based component on the page for the user to review any errors. I did simply just log out the error to the console for the time being.

I felt satisfied with the testing; however, if given more time, I would also look at adding integration and/or end-to-end testing using something like the [react-testing-library](https://github.com/testing-library/react-testing-library) or better [cypress.io](https://www.cypress.io/).

I did add a few comments in the code for further explaination on a few things. I did not do any in the tests as I felt if would be easier to rely those in person.
