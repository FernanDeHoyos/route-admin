"use client";

import styles from "./page.module.css";
import Dashboard from "./dashboard/Dashboard";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";

export default function Home() {
  return (
    <Provider store={store}>
      <BrowserRouter>
    <main >
      <div >
         <Dashboard/>
      </div>
    </main>
      </BrowserRouter>
    </Provider>
  );
}
