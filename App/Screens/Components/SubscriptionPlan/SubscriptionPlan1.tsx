import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import CommonStyle from '@Theme/CommonStyle';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '@AppContext/index';
import {
    AppHeader,
    AppViewHoc,
    AssetImage,
    CustomText,
    KeyBoardAvoidViewHoc,
    SubscriptionPlanOption,
} from '@CommonComponent/index';
import AppImages from '@Theme/AppImages';
import { Space, spaceType } from '@CommonComponent/Space';
import { GradientButton } from '@SubComponents/index';
import { productId, requestPurchaseSubscription } from '@CommonComponent/SubscriptionIAP';

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

const SubscriptionPlan1 = () => {
    const { translations, appTheme } = useContext(AppContext);
    const [selectedPlan, setSelectedPlan] = useState('');
    const navigation = useNavigation();
    const categoryDefault = [
        {
            index: 0,
            price: '2.99',
            token: '3 requests/hour',
        },
        {
            index: 1,
            price: '5.99',
            token: 'Unlimited access',
        },
    ];
    // const categoryDefault = [
    //   {
    //     index: 0,
    //     price: '9.99',
    //     token: '10',
    //   },
    //   {
    //     index: 1,
    //     price: '19.99',
    //     token: '20',
    //   },
    //   {
    //     index: 2,
    //     price: '49.99',
    //     token: '50',
    //   },
    //   {
    //     index: 3,
    //     price: '99.99',
    //     token: '100',
    //   },
    // ];

    const [category, setCategory] = useState(categoryDefault);


    // console.log(category,'mmmm')
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSelectedPlan('');
        });
        return unsubscribe;
    }, [navigation]);

    const onPress = (item: any) => {
        setSelectedPlan(item);
        console.log(productId[item?.index], item.index);
        requestPurchaseSubscription(productId[item?.index])
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
                            {'Monthly Subscription Plans'}
                        </CustomText>
                        <SubscriptionPlanOption
                            onPress={onPress}
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
            </View>
        </AppViewHoc>
    );
};

export default SubscriptionPlan1;
