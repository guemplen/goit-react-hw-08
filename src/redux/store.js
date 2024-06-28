import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './auth/slice';
import contactsReducer from './contacts/slice';
import filtersReducer from './filters/slice';

// Настройка персистентности для секции авторизации
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'], // только 'token' будет сохраняться
};

// Применяем persistReducer к редьюсеру авторизации
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Настройка персистентности для секции контактов
const contactsPersistConfig = {
  key: 'contacts',
  storage,
  blacklist: ['loading', 'error'], // 'loading' и 'error' не сохраняем
};

// Применяем persistReducer к редьюсеру контактов
const persistedContactsReducer = persistReducer(
  contactsPersistConfig,
  contactsReducer
);

// Конфигурация store
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    contacts: persistedContactsReducer, // Используем персистентный редьюсер для контактов
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

export const persistor = persistStore(store); // Создаем persistor для управления персистентностью
export default store;
