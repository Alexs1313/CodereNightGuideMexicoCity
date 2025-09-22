import CoderenightBg from '../../coderenightcmpnts/CoderenightBg';
import { useCallback, useEffect, useState } from 'react';
import Coderenightbtn from '../../coderenightcmpnts/Coderenightbtn';
import Coderenightloccard from '../../coderenightcmpnts/Coderenightloccard';
import { BlurView } from '@react-native-community/blur';
import { useCodereRouteStore } from '../../coderenightstr/coderenightcontxt';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sound from 'react-native-sound';
import {
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

const Coderenightlocscr = () => {
  const [toggleLocked, setToggleLocked] = useState(true);
  const [isVisibleMdl, setIsVisibleMdl] = useState(false);
  const [isVisibleCongratsMdl, setIsVisibleCongratsMdl] = useState(false);
  const {
    codereNightUnlockedLoc,
    fetchCodereCoins,
    codereNightCoins,
    setIsEnabledCodereBgMusic,
    isEnabledCodereBgMusic,
    setIsEnabledCodereNotifications,
    setIsEnabledCodereVibrations,
    volume,
    isEnabledCodereNotifications,
  } = useCodereRouteStore();
  const [desertEnigmaTrackIndex, setDesertEnigmaTrackIndex] =
    useState<number>(0);
  const [sound, setSound] = useState<Sound | null>(null);
  const desertEnigmaTracks: string[] = [
    'streets-of-mexico-305595.mp3',
    'streets-of-mexico-305595.mp3',
  ];

  useEffect(() => {
    playDesertEnigmaTrack(desertEnigmaTrackIndex);

    return () => {
      if (sound) {
        sound.stop(() => {
          sound.release();
        });
      }
    };
  }, [desertEnigmaTrackIndex]);

  const playDesertEnigmaTrack = (index: number) => {
    if (sound) {
      sound.stop(() => {
        sound.release();
      });
    }

    const trackPath = desertEnigmaTracks[index];

    const newPartyDareSound = new Sound(trackPath, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('❌ Error', error);
        return;
      }

      newPartyDareSound.play(success => {
        if (success) {
          console.log('✅ Successfully');
          setDesertEnigmaTrackIndex(
            prevIndex => (prevIndex + 1) % desertEnigmaTracks.length,
          );
        } else {
          console.log('❌ Error ');
        }
      });
      setSound(newPartyDareSound);
    });
  };

  useFocusEffect(
    useCallback(() => {
      fetchCodereCoins();
      loadCodereMusic();
      loadCodereVibration(), loadCodereNotifications();
    }, []),
  );

  useEffect(() => {
    const setVolumeBasedOnPartydareMusic = async () => {
      try {
        const partyDareMusicValue = await AsyncStorage.getItem('isMusicOn');

        const isPartyMusicOn = JSON.parse(partyDareMusicValue);
        setIsEnabledCodereBgMusic(isPartyMusicOn);
        if (sound) {
          sound.setVolume(isPartyMusicOn ? volume : 0);
        }
      } catch (error) {
        console.error('Error', error);
      }
    };

    setVolumeBasedOnPartydareMusic();
  }, [sound, volume]);

  useEffect(() => {
    if (sound) {
      sound.setVolume(isEnabledCodereBgMusic ? volume : 0);
    }
  }, [volume, isEnabledCodereBgMusic]);

  const loadCodereMusic = async () => {
    try {
      const partyDareMusicValue = await AsyncStorage.getItem('isMusicOn');

      const isPartyMusicOn = JSON.parse(partyDareMusicValue);
      setIsEnabledCodereBgMusic(isPartyMusicOn);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const loadCodereNotifications = async () => {
    try {
      const enigmaNotifValue = await AsyncStorage.getItem('isNotificationsOn');
      if (enigmaNotifValue !== null) {
        const isEnigmaNotOn = JSON.parse(enigmaNotifValue);
        setIsEnabledCodereNotifications(isEnigmaNotOn);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const loadCodereVibration = async () => {
    try {
      const enigmaNotifValue = await AsyncStorage.getItem('isVibrationsOn');
      if (enigmaNotifValue !== null) {
        const isEnigmaNotOn = JSON.parse(enigmaNotifValue);

        setIsEnabledCodereVibrations(isEnigmaNotOn);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const toggleFilteredCodereNightLocations = codereNightUnlockedLoc.filter(
    loc => loc.coderenightunlocked === toggleLocked,
  );

  return (
    <CoderenightBg>
      <View
        style={[
          styles.coderenightcontainer,
          isVisibleMdl && { filter: 'blur(10px)' },
          isVisibleCongratsMdl && { filter: 'blur(10px)' },
        ]}
      >
        <View style={styles.coderenightheader}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.coderenightheadtttlwrap}
            onPress={() => {
              setToggleLocked(toggleLocked ? false : true);
              if (isEnabledCodereNotifications) {
                Toast.show({
                  text1: toggleLocked
                    ? 'Locked locations list'
                    : 'Unlocked locations list',
                });
              }
            }}
          >
            <Text style={styles.coderenightheadttl}>
              {toggleLocked ? 'Unlocked' : 'Locked'}
            </Text>
            <Image
              source={require('../../../assets/icons/coderenightunlock.png')}
            />
          </TouchableOpacity>

          <View style={styles.coderenightcoinwrap}>
            <Text style={styles.coderenightquant}>{codereNightCoins}</Text>
            <Image
              source={require('../../../assets/icons/coderenightcoin.png')}
            />
          </View>
        </View>

        {toggleFilteredCodereNightLocations.map(coderelocation => (
          <Coderenightloccard
            loc={coderelocation}
            key={coderelocation.id}
            setIsVisibleMdl={setIsVisibleMdl}
            setIsVisibleCongratsMdl={setIsVisibleCongratsMdl}
          />
        ))}
      </View>

      <Modal transparent animationType="fade" visible={isVisibleMdl}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            flex: 1,
          }}
        >
          {Platform.OS === 'ios' && (
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="light"
              blurAmount={1}
            />
          )}

          <View style={styles.coderenightheadermdl}>
            <Text style={[styles.coderenightheadttlmdl]}>
              You don’t have enough currency to unlock this area.Complete
              quizzes and verify your location to get more coins.
            </Text>

            <View style={styles.coderenightcoinwrapmdl}>
              <Text style={styles.coderenightquant}>
                Your balance: {codereNightCoins}
              </Text>
              <Image
                source={require('../../../assets/icons/coderenightcoin.png')}
              />
            </View>
          </View>
          <View style={{ position: 'absolute', bottom: 40 }}>
            <Coderenightbtn
              codereFontSize={16}
              coderePropsLabel={'Got it'}
              codereImg={require('../../../assets/images/coderenightmainbt.png')}
              codereBtnStyles={{
                borderRadius: 12,
              }}
              onPress={() => setIsVisibleMdl(false)}
            />
          </View>
        </View>
      </Modal>

      <Modal transparent animationType="fade" visible={isVisibleCongratsMdl}>
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'flex-start',
          }}
        >
          {Platform.OS === 'ios' && (
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="light"
              blurAmount={1}
            />
          )}

          <View style={styles.coderenightheadermdl}>
            <Text
              style={[
                styles.coderenightquant,
                { marginBottom: 35, fontSize: 20 },
              ]}
            >
              Well done!
            </Text>
            <Text style={[styles.coderenightheadttlmdl]}>
              You’ve unlocked a new location. Continue your journey through
              Mexico City’s nightlife.
            </Text>
          </View>

          <View
            style={{
              marginTop: 50,
            }}
          >
            <Image
              source={require('../../../assets/anim/coderenightsal.gif')}
              style={{ width: 300, height: 280 }}
            />
          </View>
          <View style={{ position: 'absolute', bottom: 40 }}>
            <Coderenightbtn
              codereFontSize={16}
              coderePropsLabel={'Got it'}
              codereImg={require('../../../assets/images/coderenightmainbt.png')}
              codereBtnStyles={{
                borderRadius: 12,
              }}
              onPress={() => setIsVisibleCongratsMdl(false)}
            />
          </View>
        </View>
      </Modal>
    </CoderenightBg>
  );
};

const styles = StyleSheet.create({
  coderenightcontainer: { alignItems: 'center', paddingBottom: 140 },
  coderenightheadgrad: {
    width: '100%',
    borderRadius: 12,
  },
  coderenightheadermdl: {
    width: '100%',
    padding: 18,
    paddingTop: 98,
    alignItems: 'center',
    backgroundColor: '#004D26',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#A0A0A0',
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
  coderenightheader: {
    width: '100%',
    padding: 18,
    paddingTop: 97,
    alignItems: 'center',
    backgroundColor: '#004D26',
    borderWidth: 1,
    borderColor: '#A0A0A0',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopColor: '#004D26',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 31,
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
});

export default Coderenightlocscr;
