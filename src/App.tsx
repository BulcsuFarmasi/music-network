import React, { FunctionComponent } from "react";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Store } from "redux";

import Layout from "./components/UI/Layout/Layout";
import initStore from "./store/init/init-store";

export const App: FunctionComponent = () => {
  const store: Store = initStore();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  );
};
