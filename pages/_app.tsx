import "@/styles/globals.scss"
import type { AppProps } from "next/app"
import Layout from "@/components/Layout/Layout"
import Head from "next/head"
import authReducer from "./../state/index"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { PersistGate } from "redux-persist/integration/react"

// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css"

import { config } from "@fortawesome/fontawesome-svg-core"
// Tell Font Awesome to skip adding the CSS automatically
// since it's already imported above
config.autoAddCss = false

export default function App({ Component, pageProps }: AppProps) {
  const persistConfig = { key: "root", storage, version: 1 }
  const persistedReducer = persistReducer(persistConfig, authReducer)
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <Head>
          <link rel='icon' type='image/png' href='/nnnn.png'></link>
        </Head>

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  )
}
