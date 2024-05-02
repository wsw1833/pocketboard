import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import SplashScreen from './components/splashscreen';
import CreateWallet from './components/createwallet';
import ImportWallet from './components/importwallet';
import Welcome from './components/welcome';
import Landing from './components/Landing';
import CreateProfile from './components/createProfile';
import Profile from './components/profile';
import CreateNew from './components/createnew';
import PayBtc from './components/paybtc';
import CreateIdentity from './components/createidentity';
import IdentityCreated from './components/identitycreated';
import PassportMinting from './components/passportminting';
import MintedSuccess from './components/mintedsuccess';
import LoadingImage from './components/loadingImage';
import IndividualIdentity from './components/myidentityindividual';
import ThreedView from './components/threedview';
import TestIframe from './components/testiframe';
import ClientProfile from './components/clientProfile';
import BountyDetailClient from './components/BountyDetailClient';
import BountySetup from './components/bountysetup';
import { DataProvider } from './components/datacontext';
import BountyStep2 from './components/bountystep2';
import BountiesPage from './components/BountiesPage';
import BountyDetailTalent from './components/bountyDetailTalent';
import BountySubmission from './components/bountysubmission';

const Stack = createStackNavigator();
const App = () => {

  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerShown: false, 
        }}
        >
          <Stack.Screen name="Landing" component={Landing}/>
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerTitle: '' }}/>
          <Stack.Screen name="CreateWallet" component={CreateWallet}/>
          <Stack.Screen name="Welcome" component={Welcome}/>
          <Stack.Screen name="CreateProfile" component={CreateProfile}/>
          <Stack.Screen name="Profile" component={Profile}/>
          <Stack.Screen name="BountySetup" component={BountySetup}/>
          <Stack.Screen name="BountyStep2" component={BountyStep2}/>
          <Stack.Screen name="ClientProfile" component={ClientProfile}/>
          <Stack.Screen name="BountyDetailClient" component={BountyDetailClient}/>
          <Stack.Screen name="BountyDetailTalent" component={BountyDetailTalent}/>
          <Stack.Screen name="BountiesPage" component={BountiesPage}/>
          <Stack.Screen name="BountySubmission" component={BountySubmission}/>
        </Stack.Navigator>
      </NavigationContainer>
      </DataProvider>
     
  );
};

export default App;
