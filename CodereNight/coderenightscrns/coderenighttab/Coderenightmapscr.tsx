import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { useCallback, useState } from 'react';
import Coderenightloccard from '../../coderenightcmpnts/Coderenightloccard';
import { useFocusEffect } from '@react-navigation/native';
import { useCodereRouteStore } from '../../coderenightstr/coderenightcontxt';
import MapView, { Marker } from 'react-native-maps';
import { coderenightlocdta } from '../../coderenightcnsts/coderenightlocdta';
import Orientation from 'react-native-orientation-locker';

const Coderenightmapscr = ({ route }) => {
  const {
    fetchCodereNightPlace,
    codereNightCoins,
    fetchCodereNightUnlockedLoc,
  } = useCodereRouteStore();
  const selectedCodereLoc = route.params;
  const [selectedMarker, setSelectedMarker] = useState(null);

  useFocusEffect(
    useCallback(() => {
      fetchCodereNightPlace();
      fetchCodereNightUnlockedLoc();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => Orientation.unlockAllOrientations();
    }, []),
  );

  const filteredCodereLocations = coderenightlocdta.filter(
    loc => loc.coderenightunlocked,
  );

  return (
    <View>
      <View style={styles.coderenightcontainer}>
        <View style={styles.coderenightheader}>
          <View style={styles.coderenightcoinwrap}>
            <Text style={styles.coderenightquant}>{codereNightCoins}</Text>
            <Image
              source={require('../../../assets/icons/coderenightcoin.png')}
            />
          </View>
        </View>

        <MapView
          userInterfaceStyle="dark"
          style={{ width: '100%', height: '100%' }}
          initialRegion={{
            latitude: 19.3467,
            longitude: 99.1617,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
        >
          {selectedCodereLoc === undefined ? (
            <>
              {filteredCodereLocations.map(marker => (
                <Marker
                  key={marker.id}
                  coordinate={{
                    latitude: marker.coderenightlat,
                    longitude: marker.coderenightlong,
                  }}
                  onPress={() =>
                    selectedMarker !== null
                      ? setSelectedMarker(null)
                      : setSelectedMarker(marker)
                  }
                >
                  {Platform.OS === 'ios' ? (
                    <>
                      {selectedMarker?.id === marker.id ? (
                        <Image
                          source={require('../../../assets/icons/coderenightlocmarkersel.png')}
                        />
                      ) : (
                        <Image
                          source={require('../../../assets/icons/coderenightlocmarker.png')}
                        />
                      )}
                    </>
                  ) : null}
                </Marker>
              ))}
            </>
          ) : (
            <>
              <Marker
                coordinate={{
                  latitude: selectedCodereLoc.coderenightlat,
                  longitude: selectedCodereLoc.coderenightlong,
                }}
                onPress={() =>
                  selectedMarker !== null
                    ? setSelectedMarker(null)
                    : setSelectedMarker(selectedCodereLoc)
                }
              >
                {Platform.OS === 'ios' ? (
                  <Image
                    source={require('../../../assets/icons/coderenightlocmarkersel.png')}
                  />
                ) : null}
              </Marker>
            </>
          )}
        </MapView>

        {selectedMarker && (
          <View
            style={{
              position: 'absolute',
              zIndex: 120,
              top: 150,
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Coderenightloccard loc={selectedMarker} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  coderenightcontainer: { alignItems: 'center' },
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
    borderColor: '#A0A0A0',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopColor: '#004D26',
    justifyContent: 'center',
    gap: 8,
    height: 130,
    position: 'absolute',
    top: 0,
    zIndex: 100,
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

export default Coderenightmapscr;
