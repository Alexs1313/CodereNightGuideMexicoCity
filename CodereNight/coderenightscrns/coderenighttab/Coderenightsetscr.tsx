import CoderenightBg from '../../coderenightcmpnts/CoderenightBg';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCodereRouteStore } from '../../coderenightstr/coderenightcontxt';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from '@react-native-community/blur';
import Coderenightquizbtn from '../../coderenightcmpnts/Coderenightquizbtn';
import {
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Coderenightsetscr = () => {
  const {
    fetchCodereNightPlace,
    codereNightCoins,
    setIsEnabledCodereBgMusic,
    isEnabledCodereBgMusic,
    isEnabledCodereNotifications,
    setIsEnabledCodereNotifications,
    isEnabledCodereVibrations,
    setIsEnabledCodereVibrations,
  } = useCodereRouteStore();

  const [isVisibleMdl, setIsVisibleMdl] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchCodereNightPlace();
    }, []),
  );

  const toggleCodereMusic = async value => {
    try {
      await AsyncStorage.setItem('isMusicOn', JSON.stringify(value));
      setIsEnabledCodereBgMusic(value);
    } catch (error) {
      console.log('Error saving music setting:', error);
    }
  };

  const toggleCodereVibration = async value => {
    try {
      await AsyncStorage.setItem('isVibrationsOn', JSON.stringify(value));
      setIsEnabledCodereVibrations(value);
    } catch (error) {
      console.log('Error saving not setting:', error);
    }
  };

  const toggleCodereNotifications = async value => {
    try {
      await AsyncStorage.setItem('isNotificationsOn', JSON.stringify(value));
      setIsEnabledCodereNotifications(value);
    } catch (error) {
      console.log('Error saving not setting:', error);
    }
  };

  const handleDeleteCodereNightFav = async () => {
    try {
      await AsyncStorage.setItem(
        'codere_night_saved_locations',
        JSON.stringify([]),
      );
    } catch (e) {
      console.error('Failed', e);
    }
  };

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

        <LinearGradient
          style={styles.coderenightheadgrad}
          colors={['rgba(136, 136, 136, 1)', 'rgba(42, 42, 42, 0.7)']}
        >
          <View style={styles.coderenightsetcont}>
            <Text style={styles.coderenightsetttl}>Settings</Text>

            <View style={{ gap: 27 }}>
              {Platform.OS === 'ios' && (
                <View style={styles.coderenightbtnswrp}>
                  <Text style={styles.coderenightsettxt}>Music</Text>
                  <Pressable
                    onPress={() => toggleCodereMusic(!isEnabledCodereBgMusic)}
                  >
                    {isEnabledCodereBgMusic ? (
                      <Image
                        source={require('../../../assets/icons/coderenighttogon.png')}
                      />
                    ) : (
                      <Image
                        source={require('../../../assets/icons/coderenighttogoff.png')}
                      />
                    )}
                  </Pressable>
                </View>
              )}
              <View style={styles.coderenightbtnswrp}>
                <Text style={styles.coderenightsettxt}>Vibration</Text>
                <Pressable
                  onPress={() =>
                    toggleCodereVibration(!isEnabledCodereVibrations)
                  }
                >
                  {isEnabledCodereVibrations ? (
                    <Image
                      source={require('../../../assets/icons/coderenighttogon.png')}
                    />
                  ) : (
                    <Image
                      source={require('../../../assets/icons/coderenighttogoff.png')}
                    />
                  )}
                </Pressable>
              </View>
              <View style={styles.coderenightbtnswrp}>
                <Text style={styles.coderenightsettxt}>Notifications</Text>
                <Pressable
                  onPress={() =>
                    toggleCodereNotifications(!isEnabledCodereNotifications)
                  }
                >
                  {isEnabledCodereNotifications ? (
                    <Image
                      source={require('../../../assets/icons/coderenighttogon.png')}
                    />
                  ) : (
                    <Image
                      source={require('../../../assets/icons/coderenighttogoff.png')}
                    />
                  )}
                </Pressable>
              </View>
              <View style={styles.coderenightbtnswrp}>
                <Text style={styles.coderenightsettxt}>Clear Favorites</Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => setIsVisibleMdl(true)}
                >
                  <Image
                    source={require('../../../assets/icons/coderenightclearfav.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>

      {isVisibleMdl && (
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={0}
        />
      )}

      <Modal transparent animationType="fade" visible={isVisibleMdl}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            flex: 1,
          }}
        >
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={0}
          />

          <View style={styles.coderenightheadermdl}>
            <Text style={[styles.coderenightheadttlmdl]}>
              Are you sure you want to delete all saved locations from your
              favorites? This action cannot be undone.
            </Text>
          </View>

          <View style={{ flexDirection: 'row', gap: 13 }}>
            <Coderenightquizbtn
              codereFontSize={20}
              coderePropsLabel={'Yes'}
              codereBtnStyles={styles.coderequizbtnstyle}
              codereImg={require('../../../assets/images/coderenightfalsebtn.png')}
              onPress={() => {
                handleDeleteCodereNightFav();
                setIsVisibleMdl(false);
              }}
            />

            <Coderenightquizbtn
              codereFontSize={20}
              coderePropsLabel={'No'}
              codereBtnStyles={styles.coderequizbtnstyle}
              codereImg={require('../../../assets/images/coderenighttruebtn.png')}
              onPress={() => setIsVisibleMdl(false)}
            />
          </View>
        </View>
      </Modal>
    </CoderenightBg>
  );
};

const styles = StyleSheet.create({
  coderenightcontainer: { alignItems: 'center', paddingBottom: 150 },
  coderenightheadgrad: {
    width: '90%',
    borderRadius: 12,
  },
  coderequizbtnstyle: {
    width: 103,
    height: 52,
    borderRadius: 12,
  },
  coderenightsetcont: { padding: 30, paddingBottom: 60 },
  coderenightheader: {
    width: '100%',
    padding: 18,
    paddingTop: 97,
    alignItems: 'center',
    backgroundColor: '#004D26',
    borderWidth: 1,
    borderColor: '#A0A0A0',
    borderRadius: 12,
    borderTopColor: '#004D26',
    justifyContent: 'center',
    gap: 8,
    height: 130,
    marginBottom: 131,
  },
  coderenightsetttl: {
    fontFamily: 'Sansation-Bold',
    fontSize: 22,
    color: '#fff',
    lineHeight: 26,
    marginBottom: 57,
    textAlign: 'center',
  },
  coderenightsettxt: {
    fontFamily: 'Sansation-Bold',
    fontSize: 20,
    color: '#fff',
  },
  coderenightbtnswrp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  coderenightheadermdl: {
    width: '100%',
    padding: 55,
    paddingTop: 70,
    paddingBottom: 40,
    alignItems: 'center',
    backgroundColor: '#004D26',
    borderWidth: 1,
    borderColor: '#A0A0A0',
    borderRadius: 12,
    borderTopColor: '#004D26',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 31,
  },
  coderenightheadttlmdl: {
    fontFamily: 'Sansation-Bold',
    fontSize: 20,
    color: '#fff',
    width: '90%',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 24,
  },
  coderenightcoinwrapmdl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

export default Coderenightsetscr;
