import React from 'react';
import { View } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';

export default function Coderenightshdwcnt() {
  return (
    <View style={{ flex: 1 }}>
      <Svg height="100%" width="100%">
        <Defs>
          <RadialGradient
            id="grad"
            cx="50%"
            cy="50%"
            rx="50%"
            ry="50%"
            fx="50%"
            fy="50%"
          >
            <Stop offset="0%" stopColor="rgba(0, 77, 38, 1)" stopOpacity="1" />
            <Stop offset="100%" stopColor="#fad0c4" stopOpacity="1" />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
      </Svg>
    </View>
  );
}
