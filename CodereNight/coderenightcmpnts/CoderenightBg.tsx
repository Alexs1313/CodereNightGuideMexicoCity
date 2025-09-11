import { ImageBackground, ScrollView } from 'react-native';

const CoderenightBg = ({ children }: any) => {
  return (
    <ImageBackground
      source={require('../../assets/images/coderenightbg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

export default CoderenightBg;
