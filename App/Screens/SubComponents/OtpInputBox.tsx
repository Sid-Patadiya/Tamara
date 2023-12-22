import React from 'react';
import {StyleSheet} from 'react-native';
import OtpInputs from 'react-native-otp-inputs';

const OtpInputBox =(props: any)=>{
    const { textInputStyle, onChangeText, numberOfInputs,} = props;
    const { OtpInputStyle,  } = styles;
   return(
    <OtpInputs
    inputStyles={[OtpInputStyle,textInputStyle]}
    handleChange={onChangeText}
    numberOfInputs={numberOfInputs}
    autofillFromClipboard={false}
  />
   ) 
}

const styles = StyleSheet.create({
    OtpInputStyle: {
        height: 35,
        width: 40,
        backgroundColor: 'black',
        margin: 4,
        textAlign: 'center',
        fontSize: 13,
        borderRadius: 5,
        fontWeight: 'bold',
        borderColor: 'white',
        borderWidth: 1.5,
      },
});

export { OtpInputBox };
