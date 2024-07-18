import cartReducer from './cartReducer'
import { configureStore } from '@reduxjs/toolkit'
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// const stripe = require('stripe')(
// 	'sk_test_51OxRKuKWDUhtPxm0s0y72HQHvvIHJzknJidsXFoXPVO4eFOHSn8Mzp1bKOJ8hgbaMkxjk438V4sI7P7dqSOu08za007JXIJ39W'
// )

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
}

const persistedReducer = persistReducer(persistConfig, cartReducer)

export const store = configureStore({
	reducer: {
		cart: persistedReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})

export let persistor = persistStore(store)
