import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PersistGate } from "redux-persist/integration/react";
import App from './app/App.tsx';
import './app/styles/index.css';
import TabsPanel from './components/TabsPanel/index.tsx';
import { persistor, store } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <TabsPanel />,
        index: true,
        path: "/:tabPath"
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </PersistGate>
  </React.StrictMode>,
)
