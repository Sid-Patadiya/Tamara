import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { showToast } from '@Utils/Helper';
import { NativeModules } from 'react-native';
const { RNTwitterSignIn } = NativeModules;


const fetchFacebookProfile = async (data: any) => {
  if (data && data.userID && data.accessToken) {
    console.log(data, "facebook");
    var api =
      'https://graph.facebook.com/v2.8/' +
      data.userID +
      '?fields=name,email,picture.type(large)&access_token=' +
      data.accessToken;
    try {
      const response = await fetch(api);
      const responseData = await response.json();
      if (responseData.name && responseData.email) {
        return responseData;
      } else {
        showToast('Something went wrong.');
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  return false;
};
const APIKEY = {
  TWITTER_API_KEY: 'qZxqYfgFVxY4YArLalwQqMGwI',
  TWITTER_SECRET_KEY: 'LqNGLFdqRkLC9lmXWeQvQCJ2BxNhxXnJ3qtEh1BIRP0tjSnOqz'
}
// RNTwitterSignIn.init(APIKEY.TWITTER_API_KEY, APIKEY.TWITTER_SECRET_KEY).then(() =>
//   console.log('Twitter SDK initialized'),
// );
const fetchTwitterProfile = async (authToken: any, authTokenSecret: any) => {
  console.log(authToken, authTokenSecret, "hello")
  // if (data && data.userID && data.accessToken) {
  //   var api =
  //     'https://graph.facebook.com/v2.8/' +
  //     data.userID +
  //     '?fields=name,email,picture.type(large)&access_token=' +
  //     data.accessToken;
  //   try {
  //     const response = await fetch(api);
  //     const responseData = await response.json();
  //     if (responseData.name && responseData.email) {
  //       return responseData;
  //     } else {
  //       showToast('Something went wrong.');
  //       return false;
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     return false;
  //   }
  // }
  // return false;
};
export async function onTwitterButtonPress() {
  //   RNTwitterSignIn.init(APIKEY.TWITTER_API_KEY, APIKEY.TWITTER_SECRET_KEY)
  //   RNTwitterSignIn.logIn()
  //     .then((loginData: any) => {
  //       const { authToken, authTokenSecret } = loginData;
  //       console.log(loginData, "loginData");
  //       if (authToken && authTokenSecret) {
  //         console.log(authToken, authTokenSecret, "datat");
  //       }
  //     })
  //     .catch((error: any) => {
  //       console.log(error, "twitter error");
  //     }
  //     )
  // }
  // Perform the login request
  const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();
  const response = await fetchTwitterProfile(authToken, authTokenSecret);
  console.log(response, "response")
  // if (response) {
  //   return response;
  // }
  // return false;

  // Create a Twitter credential with the tokens
  // const twitterCredential = auth.TwitterAuthProvider.credential(authToken, authTokenSecret);

  // Sign-in the user with the credential
  // return auth().signInWithCredential(twitterCredential);
}
// RNTwitterSignIn.init(APIKEY.TWITTER_API_KEY, APIKEY.TWITTER_SECRET_KEY)
// try {
//   const { authToken, email } = await RNTwitterSignIn.login()
//   console.log('yes', authToken);
//   console.log('user email', email);

//   // .then((loginData: string) => {
//   //   console.log("loginData", loginData)
//   //   setIsLoading(false);
//   // }).catch((e: string) => {
//   //   console.log("e", e)
//   // })
// } catch (e) {
//   console.log(e, 'twitter error');
//   return false;
// }
// }

export async function onFacebookButtonPress() {
  try {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      return false;
    }
    const response = await fetchFacebookProfile(data);
    if (response) {
      return response;
    }
    return false;
  } catch (e) {
    console.log(e, 'facebook error');
    return false;
  }
}

export async function onGoogleButtonPress() {
  try {
    const params = {
      androidClientId:
        '294430602405-i4qgd9k76hrhqkac4smh1oqtk8uaidc0.apps.googleusercontent.com',
      iosClientId:
        '294430602405-5u3lkbveclfqgljbslrikh540qotjt45.apps.googleusercontent.com',
    };

    await GoogleSignin.configure(params);
    const result = await GoogleSignin.hasPlayServices()
      .then(async hasPlayService => {
        if (hasPlayService) {
          const response = await GoogleSignin.signIn()
            .then(userInfo => {
              return userInfo;
            })
            .catch(e => {
              console.log('ERROR IS: ' + JSON.stringify(e));
            });
          return response;
        }
      })
      .catch(e => {
        console.log('ERROR IS: ' + JSON.stringify(e));
      });
    return result;
  } catch (e) {
    console.log(e, 'facebook error');
    return false;
  }
}

const appleSignInResponse = (data: any) => {
  let params: any = {
    token: data.user,
  };
  if (data?.fullName?.givenName) {
    params.name = `${data.fullName.givenName}`;
    if (data.fullName.familyName) {
      params.name = `${params.name} ${data.fullName.familyName}`;
    }
    params.email = data.email;
  }
  return params;
};

export const appleSignIn = async () => {
  try {
    let response: any = '';
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      nonceEnabled: true,
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    console.log('response', appleAuthRequestResponse)

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );
    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
      response = appleSignInResponse(appleAuthRequestResponse);
    }
    return response;
  } catch (error) {
    console.log('appleSignIn', error);
  }
};
