import { CommonActions } from '@react-navigation/native';

let _navigator: any;

function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}

function navigate(routeName: any, params = {}) {
  _navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    }),
  );
}

function resetNavigator(routeName: any, params = {}) {
  _navigator.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName, params }],
    }),
  );
}

function dispatch(action: any) {
  if (!_navigator) {
    return;
  }
  _navigator.dispatch(action);
}

const NavigationService = {
  navigate,
  setTopLevelNavigator,
  dispatch,
  resetNavigator,
};
export default NavigationService;
