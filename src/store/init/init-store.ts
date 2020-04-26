import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Reducer,
  Store,
} from "redux";
import { SagaMiddleware } from "redux-saga";

import initSagaMiddleware from "./init-saga";
import trackReducer from "../reducers/track";
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
    track: trackReducer,
  });

  const sagaMiddleware: SagaMiddleware = initSagaMiddleware();

  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
};

export default initStore;
