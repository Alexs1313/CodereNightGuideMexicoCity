import { NavigationContainer } from '@react-navigation/native';
import Royalcourtstcknv from './CodereNight/coderenightnav/Coderenightstack';
import { CodereRouteContextProvider } from './CodereNight/coderenightstr/coderenightcontxt';
import Coderenightmnldr from './CodereNight/coderenightcmpnts/Coderenightmnldr';
import Toast from 'react-native-toast-message';
import { useEffect, useState } from 'react';

const App = () => {
  const [showCodereNightLdr, setShowCodereNightLdr] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowCodereNightLdr(true);
    }, 5000);
  }, []);

  return (
    <NavigationContainer>
      <CodereRouteContextProvider>
        {showCodereNightLdr ? <Royalcourtstcknv /> : <Coderenightmnldr />}
      </CodereRouteContextProvider>
      <Toast position="top" topOffset={50} />
    </NavigationContainer>
  );
};

export default App;
