import R from 'ramda';


export const routesFilter = (state, userInput) => {
    const routesList = state.get('routes');
    return routesList.filter(route => {
        return R.take(userInput.length, route) === userInput;
    });
}