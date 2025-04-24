import { createSlice } from "@reduxjs/toolkit";

const favSlice = createSlice({
    name: "addtofav",
    initialState: {
        fav: []
    },
    reducers: {
        addfav: (state, action) => {
            const data = state.fav.filter((item) => item.id == action.payload.id)
            if (data.length > 0) {
              alert("Product Already Added")
            }
            else {
                state.fav.push(action.payload);
                alert("Product Added Successfully")
            }
        },
        removefav: (state, action) => {
            state.fav = state.fav.filter((item) => item.id !== action.payload);
        },
       
    }

})

export const { addfav, removefav} = favSlice.actions;
export default favSlice.reducer

