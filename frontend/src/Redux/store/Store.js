import { configureStore } from '@reduxjs/toolkit'

import thunk from 'redux-thunk'
import RootReducer from '../reducers';

const store = configureStore({
    reducer: RootReducer,
    middleware: [thunk]
})

export default store;