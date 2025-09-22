import LinearGradient from 'react-native-linear-gradient';
import Coderenightbtn from './Coderenightbtn';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCodereRouteStore } from '../coderenightstr/coderenightcontxt';
import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Dimensions,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Coderenightloccard = ({
  loc,
  setIsVisibleMdl,
  setIsVisibleCongratsMdl,
  screen,
}) => {
  const [codereNightIconColor, setCodereNightIconColor] = useState(false);
  const coderenightnav = useNavigation();
  const {
    saveCodereNightPlace,
    removeCodereNightPlace,
    fetchCodereNightPlace,
    codereNightCoins,
    codereNightUnlockedLoc,
    saveCodereNightUnlockedLoc,
    fetchCodereNightUnlockedLoc,
    setCodereNightUnlockedLoc,
    setCodereNightCoins,
    saveCodereCoins,
  } = useCodereRouteStore();

  useFocusEffect(
    useCallback(() => {
      renderSavedCodereNightLocations(loc);
      fetchCodereNightPlace();
      fetchCodereNightUnlockedLoc();
    }, []),
  );

  const toggleSaved = selectedLocation => {
    if (codereNightIconColor)
      removeCodereNightPlace(selectedLocation), setCodereNightIconColor(false);
    else saveCodereNightPlace(selectedLocation), setCodereNightIconColor(true);
  };

  const renderSavedCodereNightLocations = async item => {
    const jsonValue = await AsyncStorage.getItem(
      'codere_night_saved_locations',
    );

    const favoritesList = JSON.parse(jsonValue);

    if (favoritesList != null) {
      let data = favoritesList.find(fav => fav.id === item.id);

      return data == null
        ? setCodereNightIconColor(false)
        : setCodereNightIconColor(true);
    }
  };

  const shareCodereNightLocation = async () => {
    try {
      await Share.share({
        message: `${loc.coderenightname}
Coordinates: ${loc.coderenightlat} ${loc.coderenightlong}
    `,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleUnlockCodereLocation = () => {
    if (codereNightCoins < 20) setIsVisibleMdl(true);
    else {
      setIsVisibleCongratsMdl(true);

      const isUnlockedCodereLoc = codereNightUnlockedLoc.map(location => {
        if (location.id === loc.id) {
          return { ...location, coderenightunlocked: true };
        }
        return location;
      });
      setCodereNightUnlockedLoc(isUnlockedCodereLoc),
        saveCodereNightUnlockedLoc(isUnlockedCodereLoc);

      setCodereNightCoins(codereNightCoins - 20),
        saveCodereCoins(codereNightCoins - 20);
    }
  };

  return (
    <LinearGradient
      style={styles.coderenightheadgrad}
      colors={['rgba(136, 136, 136, 1)', 'rgba(42, 42, 42, 0.7)']}
    >
      <View style={styles.coderenighthead}>
        <View style={{}}>
          <Image
            source={loc.coderenightimg}
            style={{
              height: 140,
              width: 0.33 * SCREEN_WIDTH,
              borderRadius: 12,
            }}
          />

          {!loc.coderenightunlocked && (
            <View style={styles.coderenightimgoverlay}>
              <Image
                source={require('../../assets/icons/coderenightlock.png')}
              />
            </View>
          )}
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'space-around' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.coderenighttitle, { flexShrink: 1 }]}>
              {loc.coderenightname}
            </Text>

            <View style={styles.coderenightwrap}>
              <Image
                source={require('../../assets/icons/coderenighpoint.png')}
              />
              <Text style={styles.coderenightdesctext}>
                {loc.coderenightlat}, {loc.coderenightlong}
              </Text>
            </View>
          </View>

          {loc.coderenightunlocked ? (
            <View
              style={{
                flexDirection: 'row',
                gap: 5,
                justifyContent: 'center',
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={shareCodereNightLocation}
              >
                <Image
                  source={require('../../assets/icons/coderenightshr.png')}
                />
              </TouchableOpacity>
              <Coderenightbtn
                codereFontSize={14}
                coderePropsLabel={'Open'}
                codereBtnStyles={styles.coderebtnstyle}
                codereImg={require('../../assets/images/coderenightcardbtn.png')}
                onPress={() =>
                  coderenightnav.navigate('Coderenightlocdetails', loc)
                }
              />
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => toggleSaved(loc)}
              >
                {codereNightIconColor ? (
                  <Image
                    source={require('../../assets/icons/coderenightliked.png')}
                  />
                ) : (
                  <Image
                    source={require('../../assets/icons/coderenightlike.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: 'row', gap: 8, bottom: 10 }}>
              <Coderenightbtn
                codereFontSize={14}
                coderePropsLabel={'Buy for 20'}
                codereIcon
                codereBtnStyles={{ width: 115, height: 34, borderRadius: 12 }}
                codereImg={require('../../assets/images/coderenightcardbtnic.png')}
                onPress={() => handleUnlockCodereLocation(loc)}
              />
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  coderenightheadgrad: {
    width: '90%',
    borderRadius: 13,
    marginBottom: 19,
  },
  coderenighthead: {
    width: '100%',
    flexDirection: 'row',
    gap: 8,
  },
  coderenighttitle: {
    fontFamily: 'Sansation-Bold',
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
    width: 180,
    top: 7,
  },
  coderenightdesctext: {
    fontFamily: 'Sansation-Regular',
    fontSize: 14,
    color: '#fff',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  coderenightwrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  coderebtnstyle: {
    width: 91,
    height: 34,
    borderRadius: 12,
  },
  coderenightimgoverlay: {
    flex: 1,
    backgroundColor: 'rgba(42, 42, 42, 0.647)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Coderenightloccard;
