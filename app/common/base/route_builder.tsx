import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import { screens } from "@/config/screen";
import { useAppDispatch } from "@/global/hooks/redux";
import { loadDownloadedList } from "@/redux/thunks";

const Stack = createStackNavigator();
export default function RouteBuilder() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(loadDownloadedList());
  }, []);
  return (
    <Stack.Navigator
      initialRouteName={screens[0].name}
      screenOptions={{ headerShown: false }}
    >
      {screens.map((e, i) => (
        <Stack.Screen key={i} name={e.name} component={e.screen} />
      ))}
    </Stack.Navigator>
  );
}
