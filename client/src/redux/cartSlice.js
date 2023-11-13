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
            const findCartItem = state.cartItems.find(      // tüm itemlerı gez, gezdiğin item ile tıklanan item aynı ise fC ye at
                (item) => item._id === action.payload._id
            );

            if (findCartItem) {
                findCartItem.quantity += 1;
            } else {
                state.cartItems.push(action.payload);
            }
        },
    },
});

export const { addProduct } = cartSlice.actions;   // reducers içerisinde yazılanlar actions diye geçiyo ---- bi yerde çağırmak istiyorsak export olarak yazılmalı
export default cartSlice.reducer;