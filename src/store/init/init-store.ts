import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Reducer,
  Store,
} from "redux";
import { SagaMiddleware } from "redux-saga";

import { initSagaMiddleware } from "./init-saga";
import { authReducer } from "../reducers/auth";
import { profileReducer } from "../reducers/profile";
import { trackReducer } from "../reducers/track";
import { watchAuth, watchTrack } from "../sagas";
import { AppState } from "../../models/state/app-state";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
  }
}

const development: string = "development";

const initStore = (): Store => {
  const composeEnhancers =
    process.env.NODE_ENV === development
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : null || compose;

  const rootReducer: Reducer<AppState> = combineReducers<AppState>({
    auth: authReducer,
    profile: profileReducer,
    track: trackReducer,
  });

  const sagaMiddleware: SagaMiddleware = initSagaMiddleware();

  const store: Store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(watchAuth);
  sagaMiddleware.run(watchTrack);

  return store;
};

export default initStore;
