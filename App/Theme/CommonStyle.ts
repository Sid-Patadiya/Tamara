import { StyleSheet } from 'react-native';
import { fontSizes } from '@Utils/Constant';
import { isIOS } from '@Utils/Constant';

const CommonStyle = StyleSheet.create({
  outer: {
    width: '85%',
    alignSelf: 'center',
    flex: 1,
    marginTop: isIOS ? 80 : 60,
  },
  absoluteView: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  clearBack: {
    backgroundColor: 'transparent',
  },
  textDecorationLine: {
    textDecorationLine: 'underline',
  },
  rowDirection: {
    flexDirection: 'row',
  },
  flexContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowAlignItems: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
  marginTop30: {
    marginTop: 30,
  },

  //Input Style
  input: {
    height: 55,
    fontSize: fontSizes.medium,
  },
  inputBg: {
    borderRadius: 10,
  },
  inputIcon: {
    height: 50,
    width: 50,
  },
  inputLeftImage: {
    width: 17,
    height: 17,
  },
  inputImg: {
    height: 20,
    width: 20,
  },

  // Header
  drawerIcon: {
    width: 25,
    height: 25,
  },
  leftHeaderIcon: {
    width: 25,
    height: 25,
  },
  leftArrow: {
    width: 25,
    height: 20,
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  androidRipple: {
    color: 'black',
    foreground: true,
  },
  flex1: { flex: 1 },
  alignEnd: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  overFlowHidden: { overflow: 'hidden' },
  alignSelfEnd: {
    alignSelf: 'flex-end',
  },
  marginHorizontal5: {
    marginHorizontal: 5,
  },
  appBackgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollViewContentStyle: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  tamaraLogo: {
    width: '70%',
    height: 43,
    alignSelf: 'center',
  },
  alignItems: {
    alignItems: 'center',
  },
  listPaddingHorizontal: {
    paddingHorizontal: 15,
  },
  listPaddingVertical: {
    paddingVertical: 15,
    paddingBottom: 100,
  },
});

export default CommonStyle;
