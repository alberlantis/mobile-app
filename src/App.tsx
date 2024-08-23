import React from "react";
import { Provider } from "react-redux";

import { AppInitializer } from "./shared/wrappers";
import store from "./store";
import Root from "./navigation";

const App: React.FC = () => {
  return (
    <AppInitializer>
      <Provider store={store}>
        <Root />
      </Provider>
    </AppInitializer>
  );
};

export default App;
