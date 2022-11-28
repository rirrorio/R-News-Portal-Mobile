import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./src/components/HomePage";
import DetailPage from "./src/components/DetailPage";
import LandingPage from "./src/components/LandingPage";
import PostByCategory from './src/components/PostByCategory'

import { ApolloProvider } from "@apollo/client";
import client from "./config/apolloClient";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Landing" component={LandingPage} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Detail" component={DetailPage} />
          <Stack.Screen name="PBC" component={PostByCategory} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
