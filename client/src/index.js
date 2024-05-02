import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
{/* <React.StrictMode> is used to highlight potential problems in an application. It activates additional checks and warnings for its descendants.
<Provider> is a React component provided by react-redux which makes the Redux store available to any nested components that need to access it.
<PersistGate> delays rendering the application's UI until persisted state has been retrieved and saved to redux. It shows a loading indicator (which is set to null here indicating no specific loading component) while this process is underway.
<App /> represents the root component of the application, which will be wrapped with Redux store and persistence functionality. */}


// store and persistor are provided by the Redux store configuration, which is likely set up to include middleware for persistence through Redux Persist.