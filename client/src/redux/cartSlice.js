import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        total: 0,
        price: 0,
    },
    reducers: {
        addProduct: (state, action) => {         // action: bu metodla birlikte gönderdiğimiz veriler ---- state: initialstate deki veriler
            state.cartItems.push(action.payload);
        }
    },
});

export const { addProduct } = cartSlice.actions;   // reducers içerisinde yazılanlar actions diye geçiyo ---- bi yerde çağırmak istiyorsak export olarak yazılmalı
export default cartSlice.reducer;