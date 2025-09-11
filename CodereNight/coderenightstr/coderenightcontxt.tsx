import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { coderenightlocdta } from '../coderenightcnsts/coderenightlocdta';

export interface CodereNightPlace {
  id: string;
  [key: string]: any;
}

export interface CodereNightLoc {
  id: string;
  name: string;
  [key: string]: any;
}

interface StoreContextType {
  saveCodereNightPlace: (data: CodereNightPlace) => Promise<void>;
  fetchCodereNightPlace: () => Promise<void>;
  removeCodereNightPlace: (selectedPlace: CodereNightPlace) => Promise<void>;
  savedCodereNightPlaces: CodereNightPlace[];
  setSavedCodereNightPlaces: React.Dispatch<
    React.SetStateAction<CodereNightPlace[]>
  >;

  codereNightCoins: number;
  codereNightUnlockedLoc: CodereNightLoc[];
  fetchCodereNightUnlockedLoc: () => Promise<void>;
  saveCodereNightUnlockedLoc: (data: CodereNightLoc[]) => Promise<void>;
  setCodereNightUnlockedLoc: React.Dispatch<
    React.SetStateAction<CodereNightLoc[]>
  >;
  setCodereNightCoins: React.Dispatch<React.SetStateAction<number>>;
  fetchCodereCoins: () => Promise<void>;
  saveCodereCoins: (data: number) => Promise<void>;

  isEnabledCodereBgMusic: boolean;
  setIsEnabledCodereBgMusic: React.Dispatch<React.SetStateAction<boolean>>;

  volume: number;
  setVolume: (newLevel: number) => Promise<void>;

  isEnabledCodereNotifications: boolean;
  setIsEnabledCodereNotifications: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  isEnabledCodereVibrations: boolean;
  setIsEnabledCodereVibrations: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StoreContext = createContext<StoreContextType | undefined>(
  undefined,
);

export const useCodereRouteStore = () => {
  return useContext(StoreContext);
};

export const CodereRouteContextProvider = ({ children }) => {
  const [savedCodereNightPlaces, setSavedCodereNightPlaces] = useState<
    CodereNightPlace[]
  >([]);
  const [codereNightUnlockedLoc, setCodereNightUnlockedLoc] =
    useState(coderenightlocdta);
  const [codereNightCoins, setCodereNightCoins] = useState<number>(0);
  const [isEnabledCodereBgMusic, setIsEnabledCodereBgMusic] =
    useState<boolean>(false);
  const [isEnabledCodereVibrations, setIsEnabledCodereVibrations] =
    useState<boolean>(false);
  const [isEnabledCodereNotifications, setIsEnabledCodereNotifications] =
    useState<boolean>(false);
  const [soundLevel, updateSoundLevel] = useState<number>(1.0);

  const saveCodereNightPlace = async (data: CodereNightPlace) => {
    try {
      const storedNote = await AsyncStorage.getItem(
        'codere_night_saved_locations',
      );
      let places = storedNote !== null ? JSON.parse(storedNote) : [];

      const updatedPlaces = [...places, data];

      await AsyncStorage.setItem(
        'codere_night_saved_locations',
        JSON.stringify(updatedPlaces),
      );
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const fetchCodereNightPlace = async () => {
    try {
      const savedData = await AsyncStorage.getItem(
        'codere_night_saved_locations',
      );
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setSavedCodereNightPlaces(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeCodereNightPlace = async (selectedPlace: CodereNightPlace) => {
    const jsonValue = await AsyncStorage.getItem(
      'codere_night_saved_locations',
    );
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];

    const filtered = data.filter(item => item.id !== selectedPlace.id);

    setSavedCodereNightPlaces(filtered);
    await AsyncStorage.setItem(
      'codere_night_saved_locations',
      JSON.stringify(filtered),
    );
  };

  // locations

  const saveCodereNightUnlockedLoc = async (data: CodereNightLoc[]) => {
    try {
      await AsyncStorage.setItem(
        'codere_night_unlocked_locations',
        JSON.stringify(data),
      );
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const fetchCodereNightUnlockedLoc = async () => {
    try {
      const savedData = await AsyncStorage.getItem(
        'codere_night_unlocked_locations',
      );
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setCodereNightUnlockedLoc(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // coins

  const saveCodereCoins = async (data: number) => {
    try {
      await AsyncStorage.setItem('codere_night_coins', JSON.stringify(data));
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const fetchCodereCoins = async () => {
    try {
      const savedData = await AsyncStorage.getItem('codere_night_coins');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setCodereNightCoins(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // music

  useEffect(() => {
    (async () => {
      try {
        const fetchedVol = await AsyncStorage.getItem('volume');
        if (fetchedVol !== null && !isNaN(parseFloat(fetchedVol))) {
          updateSoundLevel(parseFloat(fetchedVol));
        }
      } catch (err) {
        console.log('Error retrieving stored volume data:', err);
      }
    })();
  }, []);

  const adjustVolumeLevel = async newLevel => {
    try {
      const stringifiedLevel = `${newLevel}`;
      await AsyncStorage.setItem('volume', stringifiedLevel);
      updateSoundLevel(newLevel);
    } catch (err) {
      console.log('Error while storing volume:', err);
    }
  };

  const value = {
    saveCodereNightPlace,
    fetchCodereNightPlace,
    removeCodereNightPlace,
    savedCodereNightPlaces,
    setSavedCodereNightPlaces,
    codereNightCoins,
    codereNightUnlockedLoc,
    fetchCodereNightUnlockedLoc,
    saveCodereNightUnlockedLoc,
    setCodereNightUnlockedLoc,
    setCodereNightCoins,
    fetchCodereCoins,
    saveCodereCoins,
    setIsEnabledCodereBgMusic,
    isEnabledCodereBgMusic,
    volume: soundLevel,
    setVolume: adjustVolumeLevel,
    isEnabledCodereNotifications,
    setIsEnabledCodereNotifications,
    isEnabledCodereVibrations,
    setIsEnabledCodereVibrations,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
