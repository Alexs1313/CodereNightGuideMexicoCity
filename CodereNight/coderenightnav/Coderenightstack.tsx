import { createStackNavigator } from '@react-navigation/stack';

import Coderenighttabs from './Coderenighttabs';
import Coderenightentrscr from '../coderenightscrns/coderenightstack/Coderenightentrscr';
import Coderenightlocdetails from '../coderenightscrns/coderenightstack/Coderenightlocdetails';

const Stack = createStackNavigator();

const Royalcourtstcknv = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Coderenightentrscr" component={Coderenightentrscr} />
      <Stack.Screen name="Coderenighttabs" component={Coderenighttabs} />
      <Stack.Screen
        name="Coderenightlocdetails"
        component={Coderenightlocdetails}
      />
    </Stack.Navigator>
  );
};

export default Royalcourtstcknv;
