import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Chat from './screens/Messages/Chat';
import Messages from './screens/Messages';
import Main from './screens/Main';
import Option from './screens/Messages/Option';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Messages" component={Messages} />
        <Stack.Screen name="Option" component={Option} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
