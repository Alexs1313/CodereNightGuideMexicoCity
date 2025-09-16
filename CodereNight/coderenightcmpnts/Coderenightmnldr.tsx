import React from 'react';
import { View, StyleSheet, Image, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import CoderenightBg from './CoderenightBg';

const Coderenightmnldr = () => {
  const loaderHTML = `
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
          body {
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background: transparent;
          }
          .loader {
            width: 85px;
            height: 85px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-content: space-between;
            animation: loading-rotate 3s linear infinite;
          }
          .item {
            width: 40px;
            height: 40px;
            display: block;
            box-sizing: border-box;
          }
          .item:nth-of-type(1) {
            background-color: #50DE68;
            border-radius: 20px 20px 0 20px;
            border-left: #ffffff 4px solid;
            border-top: #f7f7f7 4px solid;
          }
          .item:nth-of-type(2) {
            background-color: rgb(32, 80, 46);
            border-radius: 20px 20px 20px 0;
            border-right: #ffffff 4px solid;
            border-top: #f7f7f7 4px solid;
          }
          .item:nth-of-type(3) {
            background-color: rgb(0, 255, 55);
            border-radius: 20px 0 20px 20px;
            border-left: #ffffff 4px solid;
            border-bottom: #f7f7f7 4px solid;
          }
          .item:nth-of-type(4) {
            background-color: rgb(32, 182, 32);
            border-radius: 0 20px 20px 20px;
            border-right: #ffffff 4px solid;
            border-bottom: #f7f7f7 4px solid;
          }
          @keyframes loading-rotate {
            0% { transform: scale(1) rotate(0); }
            20% { transform: scale(1) rotate(72deg); }
            40% { transform: scale(0.5) rotate(144deg); }
            60% { transform: scale(0.5) rotate(216deg); }
            80% { transform: scale(1) rotate(288deg); }
            100% { transform: scale(1) rotate(360deg); }
          }
        </style>
      </head>
      <body>
        <div class="loader">
          <span class="item"></span>
          <span class="item"></span>
          <span class="item"></span>
          <span class="item"></span>
        </div>
      </body>
    </html>
  `;

  return (
    <CoderenightBg>
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          {Platform.OS === 'ios' ? (
            <Image
              source={require('../../assets/images/coderenightldrlogo.png')}
            />
          ) : (
            <Image
              source={require('../../assets/images/coderespinlogo.png')}
              style={{
                width: 400,
                height: 400,
                borderRadius: 12,
                marginTop: 50,
              }}
            />
          )}
        </View>

        <WebView
          originWhitelist={['*']}
          source={{ html: loaderHTML }}
          style={{ backgroundColor: 'transparent', top: -100 }}
          scrollEnabled={false}
        />
      </View>
    </CoderenightBg>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 800,
  },
});

export default Coderenightmnldr;
