import {
  Alert,
  EmitterSubscription,
  Platform,
  StyleSheet,
  Text,
  View,
  Modal,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import {
  AppHeader,
  AppViewHoc,
  AssetImage,
  CustomText,
  KeyBoardAvoidViewHoc,
  Loading,
  SubscriptionPlanOption,
} from '@CommonComponent/index';
import { AppContext } from '@AppContext/index';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AppImages from '@Theme/AppImages';
import { Space, spaceType } from '@CommonComponent/Space';
import CommonStyle from '@Theme/CommonStyle';
import RNIap, {
  purchaseUpdatedListener,
  finishTransaction,
  Subscription,
  InAppPurchase,
  SubscriptionPurchase,
  purchaseErrorListener,
  PurchaseError,
} from 'react-native-iap';
import {
  subscriptionPlanDetils,
  subscriptionService,
  updateProfileService,
} from '@Services/UserService';
import { showToast } from '@Utils/Helper';

var packType = null;

const data = [
  {
    autoRenewingAndroid: false,
    developerPayloadAndroid: '',
    isAcknowledgedAndroid: true,
    obfuscatedAccountIdAndroid: '',
    obfuscatedProfileIdAndroid: '',
    orderId: 'GPA.3342-4639-2343-91255',
    packageNameAndroid: 'com.tamara.tech',
    productId: 'tamara_1.3',
    purchaseStateAndroid: 1,
    purchaseToken:
      'bccfkigfedhcoogmdkhdakkn.AO-J1OxAyOFFrTWGC_VAWGgfrkC9jWl0K6wEsRSYMvep2FKuCT81LdiUgnTIsO6Kyc10Whda_r0GYor-gEhZPSE4dn9LMWHprA',
    signatureAndroid:
      'Skrgz7SWhIA2aN9WjSPf8f91vpPuvw1/WdjM83SjLzn6OKXOhSYTAhYqpZkKtpki1OKy33xs1b2V4AJ9Zher18FPhNzsCiIrjgAxOqQ0C/UgeHRAF5ZKBkoIPdvJk9ezUH88aQcLccVXtDoF8aNTO0WVyX4XBJA+vyEDfZRjfNqMis2fQHCyhQLeVOhGSjj7YqCezPQGFG4tpkPK4iXxhd9d+3FpEn05v7wFXwjRBIPOrcnCnPgPIc4qGLZAaTs9/24+doe1GQU0OZ5nAljKPPVC5e7N0p68xoKRAYwfIzRAxEJppGCvM5KaA/Shuu0HRDnfQOZEVmRXp16Em1oW+Q==',
    transactionDate: 1684499681924,
    transactionId: 'GPA.3342-4639-2343-91255',
    transactionReceipt:
      '{"orderId":"GPA.3342-4639-2343-91255","packageName":"com.tamara.tech","productId":"test1","purchaseTime":1684499681924,"purchaseState":0,"purchaseToken":"bccfkigfedhcoogmdkhdakkn.AO-J1OxAyOFFrTWGC_VAWGgfrkC9jWl0K6wEsRSYMvep2FKuCT81LdiUgnTIsO6Kyc10Whda_r0GYor-gEhZPSE4dn9LMWHprA","quantity":1,"autoRenewing":false,"acknowledged":true}',
  },
  {
    autoRenewingAndroid: true,
    developerPayloadAndroid: '',
    isAcknowledgedAndroid: true,
    obfuscatedAccountIdAndroid: '',
    obfuscatedProfileIdAndroid: '',
    orderId: 'GPA.3377-5608-3961-43541',
    packageNameAndroid: 'com.tamara.tech',
    productId: 'tamara_1.1',
    purchaseStateAndroid: 1,
    purchaseToken:
      'dbcpnelchhdcmaoejmikkmea.AO-J1Oy9BKWCfatPI6Gu97RegklOabgmtTITTymMaRtTF1QALmlaDO5xkfdMlG_uYIB8qcZQZRmW_9FGWVVtKtHbnFZuAwPsdA',
    signatureAndroid:
      'fem5WFAYcQ7JzNZsWXVosrQQRAXF5LX6pBpvTA78wsP7wlZ6ElK2HLgbwn96z+oXwuneJI7ulXf1rTow0SDWwlRRyGbZXJGkPh4rifGLrtG3JAzdW8D4S/HUIV4AZHIQr56OGx7VYnVk/XEKjnvfvOVM1BL6zwBKPfFztrjiKosXnIQYfHN/q9XRjv8iP4xb7KZvvvrg4hiayqwwjKaNcZBrCpZoRky1Jyzb0WCaN2tTrZDG+Odk7n4U4kXtDBFXWqRNjEi3a2pxSuq9kLlNgIlhtsFLlVmQMTXumoiDU1qACvdui37B+82WWJrj9ORoNkwHu4dsGhphyTR8Lnd4oA==',
    transactionDate: 1684558970004,
    transactionId: 'GPA.3377-5608-3961-43541',
    transactionReceipt:
      '{"orderId":"GPA.3377-5608-3961-43541","packageName":"com.tamara.tech","productId":"test2","purchaseTime":1684558970004,"purchaseState":0,"purchaseToken":"dbcpnelchhdcmaoejmikkmea.AO-J1Oy9BKWCfatPI6Gu97RegklOabgmtTITTymMaRtTF1QALmlaDO5xkfdMlG_uYIB8qcZQZRmW_9FGWVVtKtHbnFZuAwPsdA","quantity":1,"autoRenewing":false,"acknowledged":true}',
  },
];
export const productId = Platform.select({
  ios: ['tamara_1.3', 'tamara_1.1'],
  android: ['test1', 'test2'],
});

let purchaseUpdateSubscription: EmitterSubscription;
let purchaseErrorSubscription: EmitterSubscription;
const SubscriptionPlan = () => {
  const { translations, appTheme, userDetail } = useContext(AppContext);
  const categoryDefault = [
    {
      index: 0,
      price: '2.99',
      token: translations.REQUEST_HOUR,
      visible: false,
    },
    {
      index: 1,
      price: '5.99',
      token: translations.UNLIMITED_ACCESS,
      visible: false,
    },
  ];

  const [selectedPlan, setSelectedPlan] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();
  const IsFocused = useIsFocused();

  const [category, setCategory] = useState([]);

  const getSubscriptionDetils = async () => {
    try {
      // const result = await RNIap.initConnection();

      const detils = await subscriptionPlanDetils();
      console.log('detils',detils)

      const temp = [];
      detils.data.map((itm, idx) => {
        temp.push({ ...itm, visible: false, index: idx });
      });

      var purchasesDetails = await RNIap.getAvailablePurchases();
      // console.log('purchasesDetails', purchasesDetails);
      if (Platform.OS === 'android') {
        var filter = purchasesDetails.filter(
          item => item.autoRenewingAndroid === true,
        );
      } else {
        var filter = [];
        productId?.map((itm, idx) => {
          purchasesDetails.filter(item => {
            if (item.productId === itm) {
              console.log(item.productId);
              console.log(itm);
              filter.push({ productId: item.productId });
            }
          });
        });
      }
      console.log('filter', filter);
      if (filter.length !== 0) {
        filter.map((filItm, filInx) => {
          productId?.map((prdItem, prdIdx) => {
            if (filItm.productId === prdItem) {
              temp.map((categoryItm, categoryInx) => {
                if (categoryItm.index === prdIdx) {
                  temp[categoryInx] = { ...categoryItm, visible: true };
                }
              });
            }
          });
        });
        console.log('temp', temp);
        // console.log('filter', filter);

        setCategory([...temp]);
        setIsVisible(false);
      } else {
        setCategory(temp);
        setIsVisible(false);
      }
    } catch (error: any) {
      console.log('error', error);
      setIsVisible(false);
    }
  };

  const _initIAP = async () => {
    try {
      if (Platform.OS === 'ios') {
        await RNIap.clearProductsIOS();
      }
      const result = await RNIap.initConnection();

      // await RNIap.clearProductsIOS();

      await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
      if (result === false) {
        showToast("couldn't get in-app-purchase information");
        return;
      }
    } catch (err: any) {
      console.log('err', err);
      // showToast('fail to get in-app-purchase information');
    }
    const subscriptions = await RNIap.getSubscriptions(productId);
    // console.log('subscriptions~~', subscriptions);

    purchaseUpdateSubscription = purchaseUpdatedListener(
      (purchase: InAppPurchase | SubscriptionPurchase) => {
        console.log('purchaseUpdatedListener');
        const receipt =
          Platform.OS === 'ios'
            ? purchase.transactionReceipt
            : purchase.transactionReceipt;

        // console.log(receipt);
        if (receipt) {
          // console.log('receipt~~', receipt);
          finishTransaction(purchase)
            .then(() => {
              setTimeout(() => {
                getSubscriptionDetils();
                sendReceiptToServer();

                setIsVisible(false);
              }, 100);
            })
            .catch((error: any) => {
              setTimeout(() => {
                setIsVisible(false);
                showToast(translations.PURCHASED_FAILED);
              }, 100);
            });
        } else {
        }
      },
    );

    purchaseErrorSubscription = purchaseErrorListener(
      (error: PurchaseError) => {
        setTimeout(() => {
          setIsVisible(false);
          showToast(translations.PURCHASED_FAILED);
        }, 100);
      },
    );
  };

  useEffect(() => {
    setIsVisible(true);
    getSubscriptionDetils();
    _initIAP();
    return (): void => {
      RNIap.endConnection();
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
      }
      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
      }
    };
  }, [IsFocused]);

  const [state, setState] = useState({
    name: userDetail?.name,
    email: userDetail?.email,
    // token:userDetail?.userToken,
    dob: userDetail?.dob,
    gender: userDetail?.gender,
    phone: userDetail?.mobileNo,
    isProcessing: false,
    image: userDetail?.profilePicture,
  });
  const { name, email, dob, gender, phone, image, isProcessing } = state;

  console.log('state', state);
  const sendReceiptToServer = async () => {
    try {
      const params = {
        name,
        mobileNo: phone,
        gender,
        dob,
        profilePicture: image,
        packType: packType === 0 ? 1 : packType === 1 ? 2 : null,
      };
      const response = await updateProfileService(params);

      console.log('response', response);
      if (response.status === 200) {
        setTimeout(() => {
          showToast(translations.PURCHASED_SUCCESSFULLY);
        }, 100);
      }
    } catch (error: any) {
      setTimeout(() => {
        Alert.alert('Alert', error.message);
      }, 100);
    }
  };

  const _requestSubscription = async (item: any) => {
    setIsVisible(true);
    // setSelectedPlan(item);
    packType = item.index;
    try {
      if (Platform.OS === 'android') {
        const purchase = await RNIap.requestSubscription(
          productId[item?.index],
          false,
        );
        console.log('Purchase Request:', purchase);
      } else if (Platform.OS === 'ios') {
        const purchase = await RNIap.requestPurchase(productId[item?.index]);
        // Purchase request sent successfully
        console.log('Purchase Request:', purchase);
      }
    } catch (error: any) {
      setIsVisible(false);
      showToast(translations.PURCHASED_FAILED);
      // Alert.alert('errorerror', JSON.stringify(error));
      // Alert.alert('errorerror', error.message);
    }
  };

  return (
    <AppViewHoc addSafeAreaView={false} addScrollView={false}>
      <View style={CommonStyle.flex1}>
        <AppHeader
          title={translations.SUBSCRIPTION_PLAN}
          showDrawer={true}
          navigation={navigation}
        />
        <KeyBoardAvoidViewHoc addScrollView={true}>
          <View style={styles.margin}>
            <AssetImage
              localImage
              source={AppImages.tamaraLogo}
              imageStyle={styles.tamaraLogo}
              resizeMode={'contain'}
            />
            <CustomText
              medium
              fontWeight400
              xlarge20
              style={[
                styles.text,
                {
                  color: appTheme.whiteText,
                },
              ]}>
              {translations.MONTHLY_SUBSCRIPTION_PLAN}
            </CustomText>
            <SubscriptionPlanOption
              onPress={(item: any) => {
                if (item.visible === true) {
                  showToast(translations.ALREADY_PURCHASED);
                } else {
                  _requestSubscription(item);
                }
              }}
              selectedPlan={selectedPlan}
              category={category}
            />
            <Space type={spaceType.large} />
            {/* <GradientButton
                  title={translations.SUBSCRIPTION_PLAN_TEXT}
                  onPress={() => {}}
                  backgroundGradient={
                    selectedPlan ? appTheme.gradient : appTheme.grayGradient
                  }
                /> */}
          </View>
        </KeyBoardAvoidViewHoc>
        {isVisible && (
          <View
            style={{
              flex: 1,
              position: 'absolute',
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Loading />
            {/* <ActivityIndicator size={30} color={appTheme.whiteText} /> */}
          </View>
        )}
      </View>
    </AppViewHoc>
  );
};

export default SubscriptionPlan;

const styles = StyleSheet.create({
  tamaraLogo: {
    height: 40,
    width: 200,
    alignSelf: 'center',
    marginTop: 30,
  },
  text: {
    textAlign: 'center',
    marginTop: 20,
  },
  margin: {
    marginHorizontal: 20,
  },
});
