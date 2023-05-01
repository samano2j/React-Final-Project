import { createSlice } from '@reduxjs/toolkit'
import { getData } from '../middleware/api'

const initialState = {
    data: [],
    loading: 'idle',
    error: null,
    selectedItem: null,
}

const mainSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getData.pending, (state) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending'
                }
            })
            .addCase(getData.fulfilled, (state, action) => {
                if (state.loading === 'pending') {
                    state.loading = 'idle'
                    state.data = action.payload
                }
            })
            .addCase(getData.rejected, (state, action) => {
                if (state.loading === 'pending') {
                    state.loading = 'idle'
                    state.error = action.error.message
                }
            })
    }
})

// export const { setData } = mainSlice.actions
export default mainSlice.reducer