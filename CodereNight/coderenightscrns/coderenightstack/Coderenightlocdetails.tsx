import { useCallback, useState } from 'react';
import Coderenightbtn from '../../coderenightcmpnts/Coderenightbtn';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';
import { useCodereRouteStore } from '../../coderenightstr/coderenightcontxt';
import Coderenightquizbtn from '../../coderenightcmpnts/Coderenightquizbtn';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Image,
  ImageBackground,
  Modal,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';

const Coderenightlocdetails = ({ route }) => {
  const [isVisibleCodereNightQuiz, setIsVisibleCodereNightQuiz] =
    useState(false);
  const coderenightnav = useNavigation();
  const [showCodereFanFact, setShowCodereFanFact] = useState(false);
  const [isVisibleMdl, setIsVisibleMdl] = useState(false);
  const [selectedCodereOption, setSelectedCodereOption] = useState('');
  const [corrCodereAnswer, setCorrCodereAnswer] = useState(false);
  const [isDsbldCodereBtn, setIsDsbldCodereBtn] = useState(false);
  const [codereNightIconColor, setCodereNightIconColor] = useState(false);
  const {
    codereNightCoins,
    setCodereNightCoins,
    saveCodereCoins,
    codereNightUnlockedLoc,
    saveCodereNightUnlockedLoc,
    fetchCodereNightUnlockedLoc,
    isEnabledCodereNotifications,
    saveCodereNightPlace,
    removeCodereNightPlace,
    fetchCodereNightPlace,
    isEnabledCodereVibrations,
  } = useCodereRouteStore();
  const loc = route.params;

  useFocusEffect(
    useCallback(() => {
      fetchCodereNightUnlockedLoc();
      renderSavedCodereNightLocations(loc);
      fetchCodereNightPlace();
    }, []),
  );

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

  const handleShowCodereFact = () => {
    if (codereNightCoins < 10) setIsVisibleMdl(true);
    else
      setShowCodereFanFact(true),
        setCodereNightCoins(codereNightCoins - 10),
        saveCodereCoins(codereNightCoins - 10);
  };

  const handleSelectCodereAnsw = selectedOption => {
    if (selectedOption) setIsDsbldCodereBtn(true);

    const isCorrectAnsw = loc.coderenightanswer === selectedOption;
    setSelectedCodereOption(selectedOption);
    setCorrCodereAnswer(isCorrectAnsw);
    if (isCorrectAnsw)
      setCodereNightCoins(codereNightCoins + 10),
        saveCodereCoins(codereNightCoins + 10);

    if (!isCorrectAnsw && isEnabledCodereVibrations) {
      Vibration.vibrate(500);
      console.log('vibro');
    }
  };

  const handleShowCodereQuiz = () => {
    if (isEnabledCodereNotifications) {
      Toast.show({
        text1: 'Location confirmed successfully!',
      });
    }
    setIsVisibleCodereNightQuiz(true),
      setCodereNightCoins(codereNightCoins + 5);

    const isConfirmed = codereNightUnlockedLoc.map(location => {
      if (location.id === loc.id) {
        return { ...location, coderenightconfirmed: true };
      }
      return location;
    });

    saveCodereNightUnlockedLoc(isConfirmed);
  };

  const toggleSaved = () => {
    if (codereNightIconColor)
      removeCodereNightPlace(loc), setCodereNightIconColor(false);
    else saveCodereNightPlace(loc), setCodereNightIconColor(true);
  };

  const shareCodereNightLocation = async () => {
    try {
      await Share.share({
        message: `${loc.coderenightname}
${loc.coderenightlat} ${loc.coderenightlong}
${loc.coderenightdesc}
      `,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  console.log('corrCodereAnswer', corrCodereAnswer);

  return (
    <ImageBackground
      source={require('../../../assets/images/coderenightbluredbg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View
          style={[
            styles.coderenightcontainer,
            Platform.OS === 'android' &&
              isVisibleMdl && { filter: 'blur(10px)' },
          ]}
        >
          <View style={styles.coderenightheader}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.coderenightheadtttlwrap}
              onPress={() => coderenightnav.goBack()}
            >
              <Image
                source={require('../../../assets/icons/coderenightarr.png')}
              />
            </TouchableOpacity>
            <Text style={styles.coderenightheadttl}>{loc.coderenightname}</Text>

            <View style={styles.coderenightcoinwrap}>
              <Text style={styles.coderenightquant}>{codereNightCoins}</Text>
              <Image
                source={require('../../../assets/icons/coderenightcoin.png')}
              />
            </View>
          </View>

          <Image
            source={loc.coderenightimg}
            style={{ width: 205, height: 139, borderRadius: 12 }}
          />

          <View style={styles.coderenightwrap}>
            <Image
              source={require('../../../assets/icons/coderenighpoint.png')}
            />
            <Text style={styles.coderenightcoordctext}>
              {loc.coderenightlat} {loc.coderenightlong}
            </Text>
          </View>
          <Text style={styles.coderenightdesctext}>{loc.coderenightdesc}</Text>

          {isVisibleCodereNightQuiz ? (
            <View style={{ alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', gap: 5 }}>
                <Text style={styles.coderenottxt}>
                  Your location is confirmed successfully you earned 5
                </Text>
                <Image
                  source={require('../../../assets/icons/coderenightcoin.png')}
                  style={{ width: 18, height: 18 }}
                />
              </View>
              <View style={{ flexDirection: 'row', gap: 5 }}>
                <Text style={styles.coderenottxt}>
                  Answer the question correctly to earn 10
                </Text>
                <Image
                  source={require('../../../assets/icons/coderenightcoin.png')}
                  style={{ width: 18, height: 18 }}
                />
              </View>

              <Text style={styles.coderenightquizquestxt}>
                {loc.coderenightquestion}
              </Text>

              <View style={{ flexDirection: 'row', gap: '5%' }}>
                {loc.coderenightopt.map(opt => (
                  <View key={opt}>
                    <Coderenightquizbtn
                      codereFontSize={12}
                      coderePropsLabel={opt}
                      isDisabled={isDsbldCodereBtn}
                      codereBtnStyles={styles.coderequizbtnstyle}
                      codereImg={
                        selectedCodereOption === opt
                          ? corrCodereAnswer
                            ? require('../../../assets/images/coderenighttruebtn.png')
                            : require('../../../assets/images/coderenightfalsebtn.png')
                          : require('../../../assets/images/coderenightqzbtn.png')
                      }
                      onPress={() => {
                        handleSelectCodereAnsw(opt);
                      }}
                    />
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <>
              {!loc.coderenightconfirmed && (
                <TouchableOpacity
                  style={[styles.coderenightbtn, { zIndex: 100 }]}
                  activeOpacity={0.8}
                  onPress={() => {
                    handleShowCodereQuiz();
                  }}
                >
                  <Text style={[styles.coderenighttxt]}>
                    Confirm location to get
                  </Text>
                  <View style={{ flexDirection: 'row', gap: 4 }}>
                    <Text style={[styles.coderenighttxt]}>Quiz and earn 5</Text>
                    <Image
                      source={require('../../../assets/icons/coderenightcoin.png')}
                      style={{ width: 18, height: 18 }}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </>
          )}

          {showCodereFanFact ? (
            <>
              <Text style={styles.coderefacttxt}>{loc.coderenightfact}</Text>
              <Image
                source={require('../../../assets/anim/conf.gif')}
                style={{
                  width: 230,
                  height: 370,
                  top: -280,
                }}
              />
            </>
          ) : (
            <TouchableOpacity
              style={[
                styles.coderenightbtn,
                {
                  width: 164,
                  height: 39,
                  paddingHorizontal: 5,
                  marginTop: 100,
                },
                isVisibleCodereNightQuiz && { marginTop: 25 },
              ]}
              activeOpacity={0.8}
              onPress={handleShowCodereFact}
            >
              <View style={{ flexDirection: 'row', gap: 4 }}>
                <Text style={[styles.coderenighttxt]}>
                  Read fan fact for 10
                </Text>
                <Image
                  source={require('../../../assets/icons/coderenightcoin.png')}
                  style={{ width: 18, height: 18 }}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <View style={styles.coderenightfootr}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={shareCodereNightLocation}
          >
            <Image
              source={require('../../../assets/icons/coderenightshr.png')}
            />
          </TouchableOpacity>
          <Coderenightquizbtn
            codereFontSize={16}
            coderePropsLabel={'Map'}
            codereBtnStyles={styles.coderebtnstyle}
            codereImg={require('../../../assets/images/coderenightregbtn.png')}
            onPress={
              () =>
                coderenightnav.navigate('Coderenighttabs', {
                  screen: 'Coderenightmapscr',
                  params: loc,
                }) // 🔑
            }
          />
          <TouchableOpacity activeOpacity={0.6} onPress={() => toggleSaved()}>
            {codereNightIconColor ? (
              <Image
                source={require('../../../assets/icons/coderenightliked.png')}
              />
            ) : (
              <Image
                source={require('../../../assets/icons/coderenightlike.png')}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Modal transparent animationType="fade" visible={isVisibleMdl}>
        {Platform.OS === 'ios' && (
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={0}
          />
        )}

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            flex: 1,
          }}
        >
          <View style={styles.coderenightheadermdl}>
            <Text style={[styles.coderenightheadttlmdl]}>
              You don’t have enough currency to read Fan fact.Complete quizzes
              and verify your location to get more coins.
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
              codereImg={require('../../../assets/images/coderenightmainbt.png')}
              coderePropsLabel={'Got it'}
              codereBtnStyles={{ borderRadius: 12 }}
              onPress={() => setIsVisibleMdl(false)}
            />
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  coderenightcontainer: { alignItems: 'center', paddingBottom: 120 },
  coderenightheadgrad: {
    width: '100%',
    borderRadius: 13,
  },
  coderebtnstyle: {
    width: 111,
    height: 41,
  },
  coderequizbtnstyle: {
    width: 103,
    height: 52,
    borderRadius: 12,
    zIndex: 100,
  },
  coderenightheader: {
    width: '100%',
    padding: 18,
    paddingTop: 70,
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
  coderenighttitle: {
    fontFamily: 'Sansation-Bold',
    fontSize: 22,
    color: '#fff',
    lineHeight: 26,
    marginBottom: 34,
    textAlign: 'center',
    height: 50,
  },
  coderenightcoordctext: {
    fontFamily: 'Sansation-Regular',
    fontSize: 14,
    color: '#fff',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  coderefacttxt: {
    fontFamily: 'Sansation-Regular',
    fontSize: 14,
    color: '#fff',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 30,
    width: '80%',
  },
  coderenightdesctext: {
    fontFamily: 'Sansation-Regular',
    fontSize: 14,
    color: '#fff',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 17,
    marginBottom: 10,
  },
  coderenightheadttl: {
    fontFamily: 'Sansation-Bold',
    fontSize: 16,
    color: '#fff',
    width: '50%',
    textAlign: 'center',
    bottom: 10,
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
    bottom: 9,
  },
  coderenightheadtttlwrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    position: 'absolute',
    left: 18,
    bottom: 13,
  },
  coderenightwrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 17,
    marginTop: 8,
  },
  coderenightbtn: {
    backgroundColor: '#006633',
    width: 194,
    height: 54,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: 'rgba(160, 160, 160, 1)',
  },
  coderenighttxt: {
    fontFamily: 'Sansation-Bold',
    fontSize: 14,
    color: '#fff',
  },
  coderenightfootr: {
    width: '100%',
    paddingBottom: 35,
    paddingHorizontal: 60,
    paddingTop: 28,

    backgroundColor: '#004D26',
    borderWidth: 1,
    borderColor: '#A0A0A0',
    borderRadius: 12,
    borderBottomColor: '#004D26',

    gap: 8,
    position: 'absolute',
    bottom: 0,
  },
  coderenottxt: {
    fontFamily: 'Sansation-Bold',
    fontSize: 14,
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  coderenightquizquestxt: {
    fontFamily: 'Sansation-Regular',
    fontSize: 14,
    color: '#fff',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: 23,
    lineHeight: 17,
    marginBottom: 27,
  },
  coderenightcoinwrapmdl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

export default Coderenightlocdetails;
