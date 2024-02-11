import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";

import RouteBuilder from "@/common/base/route_builder";
import ReduxProvider from "@/global/providers/redux";
import ReactQueryProvider from "@/global/providers/react_query";
import { ToastProvider } from "react-native-toast-notifications";
import { PaperProvider } from "react-native-paper";

export default function Application() {
  return (
    <ReduxProvider>
      <NavigationContainer>
        <ReactQueryProvider>
          <ToastProvider>
            <PaperProvider>
              <RouteBuilder />
            </PaperProvider>
          </ToastProvider>
        </ReactQueryProvider>
      </NavigationContainer>
    </ReduxProvider>
  );
}
