import React, { FunctionComponent } from "react";
import { BrowserRouter } from "react-router-dom";
import { Store } from "redux";
import { Provider } from "react-redux";

import initStore from "./store/init/init-store";

import Layout from "./components/layout/Layout";

const App: FunctionComponent = () => {
  const store: Store = initStore();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
