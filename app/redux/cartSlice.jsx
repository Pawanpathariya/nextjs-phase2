import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "addtocart",
    initialState: {
        cart: []
    },
    reducers: {
        add: (state, action) => {
            const data = state.cart.filter((item) => item.id == action.payload.id)
            if (data.length > 0) {
              alert("Product Already Added")
            }
            else {
                state.cart.push(action.payload);
                alert("Product Added Successfully")
            }
        },
        remove: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload);
        },
        increaseQuantity: (state, action) => {
            for (let i = 0; i < state.cart.length; i++) {
                if (state.cart[i].id == action.payload.id) {
                    state.cart[i].quantity += 1;
                    break;
                }
            }
        },
        decreaseQuantity: (state, action) => {
            for (let i = 0; i < state.cart.length; i++) {
                if (state.cart[i].id == action.payload.id && state.cart[i].quantity > 1) {
                    state.cart[i].quantity -= 1;
                    break;
                }
            }
        },

        removeProduct: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        },

        removeallProduct: (state, action) => {
            state.cart = [];
        },
    }

})

export const { add, remove, increaseQuantity, decreaseQuantity ,removeProduct,removeallProduct} = cartSlice.actions;
export default cartSlice.reducer

