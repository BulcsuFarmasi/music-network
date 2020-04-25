import React, { FunctionComponent } from "react";
import { BrowserRouter } from "react-router-dom";
import { Store } from "redux";
import { Provider } from "react-redux";
import styles from "./App.module.scss";

import Navigation from "./components/navigation/Navgiation";
import Routes from "./components/routes/Routes";
import initStore from "./store/init/init-store";

const App: FunctionComponent = () => {
  const store: Store = initStore();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className={styles.app}>
          <Navigation />
          <Routes />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
