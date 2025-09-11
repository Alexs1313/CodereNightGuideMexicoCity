import LinearGradient from 'react-native-linear-gradient';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform, StyleSheet, View } from 'react-native';
import Coderenightmapscr from '../coderenightscrns/coderenighttab/Coderenightmapscr';
import Coderenightlocscr from '../coderenightscrns/coderenighttab/Coderenightlocscr';
import Coderenightfavscr from '../coderenightscrns/coderenighttab/Coderenightfavscr';
import Coderenightsetscr from '../coderenightscrns/coderenighttab/Coderenightsetscr';

const Tab = createBottomTabNavigator();

const Coderenighttabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Coderenightlocscr"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.royalcourttb,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#000',
        tabBarBackground: () => (
          <View style={{}}>
            <LinearGradient
              colors={['#A0A0A0', '#A0A0A0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 12 }}
            >
              <LinearGradient
                colors={['#004D26', '#004D26']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.royalcourttbbrd}
              ></LinearGradient>
            </LinearGradient>
          </View>
        ),
      }}
    >
      <Tab.Screen
        name="Coderenightmapscr"
        component={Coderenightmapscr}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/icons/coderenightmap.png')}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Coderenightlocscr"
        component={Coderenightlocscr}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/icons/coderenightloc.png')}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Coderenightfavscr"
        component={Coderenightfavscr}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/icons/coderenightfav.png')}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Coderenightsetscr"
        component={Coderenightsetscr}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/icons/coderenightsett.png')}
              tintColor={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  royalcourttbbrd: {
    height: Platform.OS === 'ios' ? 64 : 64,
    padding: 1,
    paddingTop: 1,
    margin: Platform.OS === 'android' && 1,
    marginTop: Platform.OS === 'android' && 1.5,
    borderRadius: 12,
  },
  royalcourttb: {
    marginHorizontal: 90,
    elevation: 0,
    paddingTop: 14,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 65,
    borderRadius: 12,
    backgroundColor: 'transparent',
    paddingBottom: Platform.OS === 'ios' ? 2 : 22,
  },
});

export default Coderenighttabs;
