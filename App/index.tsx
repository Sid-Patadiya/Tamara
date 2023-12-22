import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Alert, BackHandler, Linking, AppState } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from '@react-native-community/netinfo';
import Routes from '@Routes/index';
import { store, persistor } from '@Stores/index';
import { AppContext, AppContextProvider } from '@AppContext/index';
import { NoConnection } from '@SubComponents/index';
import CommonStyle from '@Theme/CommonStyle';
import 'AppInterceptor';
import 'react-native-gesture-handler';
import VersionCheck from 'react-native-version-check';

const App = () => {
  const [isConnected, setIsConnected] = useState(true);
  const { translations } = useContext(AppContext);

  useEffect(() => {
    let netInfoSubscription: NetInfoSubscription | null = null;
    const manageConnection = () => {
      retryConnection();
      netInfoSubscription = NetInfo.addEventListener(handleConnectivityChange);
    };
    // Check network connection
    const retryConnection = async () => {
      handleConnectivityChange(await NetInfo.fetch());
    };
    manageConnection();
    return () => {
      if (netInfoSubscription) {
        netInfoSubscription();
      }
    };
  }, []);

  useEffect(() => {
    checkUpdateNeeded();
  }, []);

  const retryConnection = async () => {
    handleConnectivityChange(await NetInfo.fetch());
  };

  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: any) => {

      setAppState(nextAppState);
    };
    AppState.addEventListener('change', handleAppStateChange);

    if (AppState.currentState === 'active') {
      checkUpdateNeeded();
    }
    return () => {};
  }, [appState]);

  // Managed internet connection
  const handleConnectivityChange = (info: NetInfoState) => {
    if (info.type === 'none' || !info.isConnected) {
      setIsConnected(false);
    } else {
      setIsConnected(true);
    }
  };

  const checkUpdateNeeded = useCallback(async () => {
    let updateNeeded = await VersionCheck.needUpdate();
    console.log('updateNeeded', updateNeeded);

    if (updateNeeded && updateNeeded.isNeeded) {
      //Alert the user and redirect to the app url
      Alert.alert('', translations.UPDATE_LATEST, [
        {
          text: translations.UPDATE,
          onPress: () => {
            BackHandler.exitApp();
            updateNeeded?.storeUrl && Linking.openURL(updateNeeded?.storeUrl);
          },
        },
      ]);
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContextProvider>
          <View style={CommonStyle.flexContainer}>
            <Routes />
            {(!isConnected && (
              <NoConnection retryConnection={retryConnection} />
            )) ||
              null}
          </View>
        </AppContextProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
