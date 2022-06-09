import Main from "./components/MainComponent";
import React, { Component } from "react";
import "./style.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";
const store = ConfigureStore();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            {/* Pass data to child */}
            <Main />
            {/* Pass data to child */}
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
