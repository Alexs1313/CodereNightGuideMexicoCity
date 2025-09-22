import { Image, StyleSheet, Text, View } from 'react-native';
import CoderenightBg from '../../coderenightcmpnts/CoderenightBg';
import { useCallback } from 'react';
import Coderenightloccard from '../../coderenightcmpnts/Coderenightloccard';
import { useFocusEffect } from '@react-navigation/native';
import { useCodereRouteStore } from '../../coderenightstr/coderenightcontxt';
import LinearGradient from 'react-native-linear-gradient';

const Coderenightfavscr = () => {
  const { fetchCodereNightPlace, savedCodereNightPlaces, codereNightCoins } =
    useCodereRouteStore();

  useFocusEffect(
    useCallback(() => {
      fetchCodereNightPlace();
    }, []),
  );

  return (
    <CoderenightBg>
      <View style={styles.coderenightcontainer}>
        <View style={styles.coderenightheader}>
          <View style={styles.coderenightcoinwrap}>
            <Text style={styles.coderenightquant}>{codereNightCoins}</Text>
            <Image
              source={require('../../../assets/icons/coderenightcoin.png')}
            />
          </View>
        </View>

        {savedCodereNightPlaces.length === 0 && (
          <>
            <LinearGradient
              style={[
                styles.coderenightheadgrad,
                { width: '90%', marginBottom: 90 },
              ]}
              colors={['rgba(136, 136, 136, 1)', 'rgba(42, 42, 42, 0.7)']}
            >
              <View style={{ padding: 20, paddingTop: 30 }}>
                <Text style={styles.coderenightempyscrtxt}>
                  You haven’t added any locations to your favorites. Explore the
                  locations list and tap the heart icon to save the places you
                  want to revisit.
                </Text>
              </View>
            </LinearGradient>

            <Image
              source={require('../../../assets/icons/coderenightempt.png')}
            />
          </>
        )}

        {savedCodereNightPlaces.map(coderelocation => (
          <Coderenightloccard loc={coderelocation} key={coderelocation.id} />
        ))}
      </View>
    </CoderenightBg>
  );
};

const styles = StyleSheet.create({
  coderenightcontainer: { alignItems: 'center', paddingBottom: 140 },
  coderenightheadgrad: {
    width: '100%',
  },
  coderenightheader: {
    width: '100%',
    padding: 18,
    paddingTop: 97,
    alignItems: 'center',
    backgroundColor: '#004D26',
    borderWidth: 1,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderColor: '#A0A0A0',
    borderTopColor: '#004D26',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 31,
    height: 130,
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
  coderenightheadttl: {
    fontFamily: 'Sansation-Bold',
    fontSize: 18,
    color: '#fff',
  },
  coderenightquant: {
    fontFamily: 'Sansation-Bold',
    fontSize: 24,
    color: '#fff',
  },
  coderenightcoinwrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    position: 'absolute',
    right: 18,
    bottom: 18,
  },
  coderenightheadtttlwrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  coderenightempyscrtxt: {
    fontFamily: 'Sansation-Bold',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default Coderenightfavscr;
