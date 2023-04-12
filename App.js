import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BoardScreen from "./screens/BoardScreen";
import HomeScreen from "./screens/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createStackNavigator();

const App = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);

  const checkIfAppFirstLaunched = async () => {
    const appData = await AsyncStorage.getItem("isAppFirstLaunched");
    if (appData == null) {
      setIsAppFirstLaunched(true);
      await AsyncStorage.setItem("isAppFirstLaunched", "false");
    } else {
      setIsAppFirstLaunched(false);
    }
  };

  useEffect(() => {
    checkIfAppFirstLaunched();
  }, []);

  return (
    isAppFirstLaunched != null && (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* expo cli kullanıyorsanız ve tekrardan slider görüntülemek istiyorsanız
           !isAppFirstLaunched bu formata getiriniz  */}

          {/* Eğer ReactNative CLi kullanıyorsanız olduğu gibi bırakıp
            emülatördeki storage kısmını temizlemeniz gerekiyor */}
          {isAppFirstLaunched && (
            <Stack.Screen name="OnboardingScreen" component={BoardScreen} />
          )}
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
};

export default App;
