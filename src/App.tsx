import "text-encoding-polyfill";
import "react-native-get-random-values";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { AppInitializer } from "./shared/wrappers";
import { store, persistor } from "./store";
import Root from "./navigation";

const App: React.FC = () => {
  return (
    <AppInitializer>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Root />
        </PersistGate>
      </Provider>
    </AppInitializer>
  );
};

export default App;
