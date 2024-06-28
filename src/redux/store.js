import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/slice';
import contactsReducer from './contacts/slice';
import filtersReducer from './filters/slice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const contactsPersistConfig = {
  key: 'contacts',
  storage,
  blacklist: ['loading', 'error'],
};

const persistedContactsReducer = persistReducer(
  contactsPersistConfig,
  contactsReducer
);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    contacts: persistedContactsReducer,
    filters: filtersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
