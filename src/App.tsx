import React from "react";
import { Provider } from "react-redux";

import store from "./store";
import Root from "./navigation";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

export default App;
