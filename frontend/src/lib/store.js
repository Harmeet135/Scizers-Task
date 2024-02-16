import { configureStore} from '@reduxjs/toolkit'
import coursesSlice from './state-management'
export const store = configureStore({
    reducer : coursesSlice
})