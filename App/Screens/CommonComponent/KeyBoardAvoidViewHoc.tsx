import React from 'react';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';
import CommonStyle from '@Theme/CommonStyle';
import { isIOS } from '@Utils/Constant';

const KeyBoardAvoidView = (Comp: any) => {
  return ({
    children,
    keyBoardStyle,
    addScrollView,
    scrollViewStyle,
    scrollViewContentStyle,
    ...props
  }: any) => {
    return (
      <KeyboardAvoidingView
        style={[CommonStyle.flex1, keyBoardStyle]}
        behavior={isIOS ? 'height' : 'height'}>
        {addScrollView ? (
          <ScrollView
            contentContainerStyle={[
              CommonStyle.scrollViewContentStyle,
              scrollViewContentStyle,
            ]}
            keyboardShouldPersistTaps="handled"
            style={[scrollViewStyle]}
            showsVerticalScrollIndicator={false}>
            <Comp style={CommonStyle.flex1} {...props}>
              {children}
            </Comp>
          </ScrollView>
        ) : (
          <Comp style={CommonStyle.flex1} {...props}>
            {children}
          </Comp>
        )}
      </KeyboardAvoidingView>
    );
  };
};

const KeyBoardAvoidViewHoc = KeyBoardAvoidView(View);
export { KeyBoardAvoidViewHoc };
