"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({});

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export function Providers({ children }) {
  const [data, setData] = useState({});

  return (
    <Provider store={store}>
      <DataProvider value={{ data, setData }}>{children}</DataProvider>
    </Provider>
  );
}
