
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducer'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persitcon={
   key:'root',
   storage
}
const persistedReducer=persistReducer(persitcon,counterReducer)
const store=configureStore({
  reducer:{
    counter:persistedReducer,
  }
})

export default store