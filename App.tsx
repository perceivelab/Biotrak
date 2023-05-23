import React from "react";
import NavigatorParent from "./src/navigation";
import { Provider } from "react-redux";
import store from "./src/store";

const App = () => {

  return (
    <Provider store={store}>
      <NavigatorParent />
    </Provider>
  );
};
export default App;
