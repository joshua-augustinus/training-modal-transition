import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@src/reducers'

//configureStore auto adds redux-thunk
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }),
});

export { store };
