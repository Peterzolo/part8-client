import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import store from "./redux/store";
import { client } from "./apolo/apoloService";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
);
