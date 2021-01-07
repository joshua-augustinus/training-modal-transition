import { createAction, createReducer } from '@reduxjs/toolkit';
import { RootState } from '@src/types';

/**
 * This is the modern way of creating reducers using redux-toolkit
 * https://redux-toolkit.js.org/api/createReducer
 */

/**
 * If you call updateLoadingVisibility(false) it will return an action:
 * {type:'overlay/update', payload:false}
 */

export const updateLoadingVisibility = createAction<boolean>('overlay/update')


/**
 * Initial State
 */
const initialState: RootState = {
    isLoadingOverlayVisible: true
};

/**
 * createReducer uses 'immer' to let you write reducers and allow you to mutate state
 * directly without having to use  ... spread operator.
 * https://redux-toolkit.js.org/api/createReducer
 */
const rootReducer = createReducer(initialState, (builder) => {
    builder.addCase(updateLoadingVisibility, (state, action) => {
        state.isLoadingOverlayVisible = action.payload;
    })
});

export default rootReducer;