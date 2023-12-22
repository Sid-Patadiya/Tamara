// import RNIap, {
//   initConnection,
//   purchaseErrorListener,
//   endConnection,
//   purchaseUpdatedListener,
//   requestSubscription,
//   flushFailedPurchasesCachedAsPendingAndroid,
//   getProducts,
//   finishTransaction,
//   requestPurchase,
//   getSubscriptions,
// } from 'react-native-iap';
// import { Alert, Platform } from 'react-native';
// import { updateToken } from '@Services/UserService';
// import { subscriptionService } from '@Services/SubscriptionService';

// var packType = null;

// export const productId = Platform.select({
//   ios: ['tamara_1.3'],
//   android: ['test1', 'tamara_0.2'],
// });
// purchaseUpdateSubscription = null;
// purchaseErrorSubscription = null;

// export const initInApp = async () => {
//   // Alert.alert('connection init');
//   console.log('connection init');
//   try {
//     let connection = await initConnection();
//     console.log(connection, 'connection');
//     await flushFailedPurchasesCachedAsPendingAndroid();
//   } catch (err) {
//     console.log('error', err);
//   }

//   try {
//     const products = await RNIap.getSubscriptions(productId);
//     // Alert.alert('products :: ' + JSON.stringify(products));
//     console.log(products, '1234');
//   } catch (err) {
//     console.log('product error', err);
//   }

//   purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(async purchase => {
//     Alert.alert('purchaseUpdateSubscription :: ' + JSON.stringify(purchase));
//     const receipt = purchase.transactionReceipt
//       ? purchase.transactionReceipt
//       : purchase.originalJson;
//     console.log(receipt, '12345');

//     let token = 0;

//     // if (purchase.productId == "tamara.1.10") {
//     //   token = 10;
//     // } else if (purchase.productId == "tamara_2_20") {
//     //   token = 20
//     // } else if (purchase.productId == "tamara_3_50") {
//     //   token = 50
//     // } else if (purchase.productId == "tamara_4_100") {
//     //   token = 100
//     // }
//     Alert.alert('receipt : ' + JSON.stringify(receipt));

//     if (receipt) {
//       Alert.alert('IFFFreceipt : ' + JSON.stringify(receipt));

//       const payload = {
//         purchaseResponse: JSON.stringify(receipt),
//         packType: 1,
//       };

//       const response = await subscriptionService(payload);
//       Alert.alert('response : ', JSON.stringify(response));
//       console.log('response:', response);

      
//       const finish = await RNIap.finishTransaction(purchase, true);

//       Alert.alert('success :: ' + JSON.stringify(finish));
//       let param = {
//         orderid: receipt?.orderId,
//         purchaseTime: receipt?.purchaseTime,
//         tokens: token,
//       };
//       try {
//         const response = await updateToken(param);
//         console.log(response, 'responce');
//         Alert.alert('response : ' + JSON.stringify(response));
//         // }
//         // debuglog(purchase.transactionId)
//         // try {
//         // if (Platform.OS === 'ios') {

//         //   finishTransactionIOS(purchase.transactionId);
//         //     debugLog(purchase.transactionId)

//         //   } else if (Platform.OS === 'android'){

//         //     await consumeAllItemsAndroid(purchase.purchaseToken);
//         //     await acknowledgePurchaseAndroid(purchase.purchaseToken);

//         //   }

//         //  console.log(receipt,purchase,'0000')
//       } catch (ackErr) {
//         console.log('ackErr :: ', ackErr);
//         Alert.alert('ackErr : ' + JSON.stringify(ackErr));
//       }
//     } else {
//       Alert.alert('else receipt : ');
//     }
//   });

//   purchaseErrorSubscription = purchaseErrorListener(error => {
//     // debugLog('purchaseErrorListener', error);
//     console.log(error);
//     Alert.alert('purchaseError', JSON.stringify(error.message));
//   });
// };

// export const endInApp = async () => {
//   // if (purchaseUpdateSubscription) {
//   //   purchaseUpdateSubscription.remove();
//   //   purchaseUpdateSubscription = null;
//   // }
//   // if (purchaseErrorSubscription) {
//   //   purchaseErrorSubscription.remove();
//   //   purchaseErrorSubscription = null;
//   // }
//   // endConnection();
// };

// export const requestPurchaseSubscription = async (sku, item) => {
//   try {
//     // Alert.alert('requestPurchaseSubscription');
//     // // await
//     // //   getSubscriptions(productId)
//     // // await initConnection();
//     // // await requestSubscription({ sku: JSON.stringify(skus) });
//     packType = item === 0 ? 1 : item === 1 ? 2 : null;
//     console.log('response~~~', packType);
//     requestPurchase(sku);
//     // console.log('sku', sku);
//     // const initConnection = await RNIap.initConnection();
//     // console.log('initConnection', initConnection);
//     // const products = await RNIap.getSubscriptions([sku]);
//     // console.log('products', products);
//     // // Alert.alert(JSON.stringify(products));
//     // const purchase = await RNIap.requestPurchase(sku);
//     // console.log('Purchase:', purchase);
//     // Alert.alert('purchase1 :: '+JSON.stringify(purchase));
//     // const payload = {
//     //   purchaseResponse: JSON.stringify(purchase),
//     // };
//     // const response = await subscriptionService(payload);
//     // console.log('response:', response);
//   } catch (err) {
//     console.warn('err :: ', err);
//     Alert.alert('err : ', JSON.stringify(err.message));
//   }
// };
