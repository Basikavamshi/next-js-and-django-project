
import { createSlice } from '@reduxjs/toolkit'
export const counterSlice = createSlice({
  name: 'userdata',
  initialState: {
     auth:false,
     user:'unknown',
     access:'',
     refresh:''
  },
  reducers: {
    handledata: (state,action) => {
    const {user,access,refresh,auth}=action.payload.payload
    return {
       ...state,
       auth,
       user,
       access,
       refresh
    }
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { handledata, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer