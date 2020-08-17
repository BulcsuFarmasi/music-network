import React, { FunctionComponent } from "react";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Store } from "redux";

import { Main } from "./components/Main/Main";
import initStore from "./store/init/init-store";

export const App: FunctionComponent = () => {
  const store: Store = initStore();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  );
};
