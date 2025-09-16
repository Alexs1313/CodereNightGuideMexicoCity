import {
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CoderenightBg from '../../coderenightcmpnts/CoderenightBg';
import LinearGradient from 'react-native-linear-gradient';
import { useState } from 'react';
import Coderenightbtn from '../../coderenightcmpnts/Coderenightbtn';
import { useNavigation } from '@react-navigation/native';

type entrydta = {
  coderenightttl: string;
  coderenightdesc: string;
  coderenightimg: ImageSourcePropType;
  coderenightbtnlbl: string;
};

const coderenightentrydta: entrydta[] = [
  {
    coderenightttl:
      Platform.OS === 'ios'
        ? `Welcome to Codere Night Guide`
        : `Welcome to Spin 
Around Mexico City`,
    coderenightdesc:
      'Discover Mexico City like never before. Unlock hidden gems, explore iconic night spots, and let our guide lead you through the city after dark.',
    coderenightimg: require('../../../assets/images/coderenightentr1.png'),
    coderenightbtnlbl: 'Start the journey',
  },
  {
    coderenightttl: `Explore with the Map`,
    coderenightdesc:
      ' Use the interactive map to navigate the city’s nightlife. Tap any pin to learn more, check in, and start your journey at each location.',
    coderenightimg: require('../../../assets/images/coderenightentr2.png'),
    coderenightbtnlbl: 'Proceed',
  },
  {
    coderenightttl: `All Spots in One Place`,
    coderenightdesc:
      ' Browse through the full list of night locations. Sort, save your favorites, and track which ones are unlocked or still waiting to be discovered.',
    coderenightimg: require('../../../assets/images/coderenightentr3.png'),
    coderenightbtnlbl: 'Next',
  },
  {
    coderenightttl: `Play & Unlock Secrets`,
    coderenightdesc:
      'At each spot, answer a short quiz tied to the location. Earn in-app dollars, reveal fun facts, and unlock exclusive secret places.',
    coderenightimg: require('../../../assets/images/coderenightentr1.png'),
    coderenightbtnlbl: 'Start your journey',
  },
];

const Coderenightentrscr = () => {
  const [codereNightSlide, setCodereNightSlide] = useState(0);
  const coderenightnav = useNavigation();

  return (
    <CoderenightBg>
      <View style={styles.coderenightcontainer}>
        <LinearGradient
          style={styles.coderenightheadgrad}
          colors={['rgba(136, 136, 136, 1)', 'rgba(42, 42, 42, 0.7)']}
        >
          <View style={styles.coderenighthead}>
            <Text style={styles.coderenighttitle}>
              {coderenightentrydta[codereNightSlide].coderenightttl}
            </Text>
            <Text style={styles.coderenightdesctext}>
              {coderenightentrydta[codereNightSlide].coderenightdesc}
            </Text>
          </View>
        </LinearGradient>

        <Image
          source={coderenightentrydta[codereNightSlide].coderenightimg}
          style={[
            { top: 50, left: -20 },
            codereNightSlide === 2 && { left: 0 },
          ]}
        />

        <View style={styles.container}>
          <Coderenightbtn
            codereImg={require('../../../assets/images/coderenightmainbt.png')}
            codereBtnStyles={{ borderRadius: 12 }}
            coderePropsLabel={
              coderenightentrydta[codereNightSlide].coderenightbtnlbl
            }
            onPress={() =>
              codereNightSlide === 3
                ? coderenightnav.replace('Coderenighttabs')
                : setCodereNightSlide(codereNightSlide + 1)
            }
          />
        </View>
      </View>
    </CoderenightBg>
  );
};

const styles = StyleSheet.create({
  coderenightcontainer: { alignItems: 'center', marginBottom: 40 },
  coderenightheadgrad: {
    width: '100%',
    borderRadius: 13,
  },
  coderenighthead: {
    width: '100%',
    padding: 55,
    paddingTop: 105,
    alignItems: 'center',
  },
  coderenighttitle: {
    fontFamily: 'Sansation-Bold',
    fontSize: 22,
    color: '#fff',
    lineHeight: 26,
    marginBottom: 34,
    textAlign: 'center',
    height: 50,
  },
  coderenightdesctext: {
    fontFamily: 'Sansation-Bold',
    fontSize: 20,
    color: '#fff',
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default Coderenightentrscr;
