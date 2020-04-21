import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import React, {PropsWithChildren} from 'react';

const DismissKeyboardHOC = (Comp: typeof View) => {
  return ({children, ...props}: PropsWithChildren<any>) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props} style={{flex: 1}}>
        {children}
      </Comp>
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboardHOC(View);
