import { createAction, createReducer } from '@reduxjs/toolkit';
import { PressInfo, RootState } from '@src/types';

/**
 * This is the modern way of creating reducers using redux-toolkit
 * https://redux-toolkit.js.org/api/createReducer
 */

/**
 * If you call updateLoadingVisibility(false) it will return an action:
 * {type:'overlay/update', payload:false}
 */

export const updateSmallPressInfo = createAction<PressInfo>('smallPressInfo/update');
export const updateMediumPressInfo = createAction<PressInfo>('mediumPressInfo/update');


/**
 * Initial State
 */
const initialState: RootState = {
    smallPressInfo: null,
    mediumPressInfo: null
};

/**
 * createReducer uses 'immer' to let you write reducers and allow you to mutate state
 * directly without having to use  ... spread operator.
 * https://redux-toolkit.js.org/api/createReducer
 */
const rootReducer = createReducer(initialState, (builder) => {
    builder.addCase(updateSmallPressInfo, (state, action) => {
        state.smallPressInfo = action.payload;
    })

    builder.addCase(updateMediumPressInfo, (state, action) => {
        state.mediumPressInfo = action.payload;
    })
});

export default rootReducer;