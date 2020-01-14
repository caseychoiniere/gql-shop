export const addItemToCart = (cartItems, cartItem) => {
    const existingItem = cartItems.find(
        item => item.id === cartItem.id
    );
    if(existingItem) {
        return cartItems.map(
            item => item.id === cartItem.id ?
            {...item, quantity: item.quantity +1} :
            item
        )
    }
    return [...cartItems, {...cartItem, quantity: 1}]
};

export const removeItemFromCart = (cartItems, cartItem) => {
    const existingItem = cartItems.find(
        item => item.id === cartItem.id
    );
    if(existingItem.quantity === 1) {
        return cartItems.filter(
            item => item.id !== cartItem.id
        )
    }
    return cartItems.map(item =>
        item.id === cartItem.id ?
            {...item, quantity: item.quantity -1} :
            item
    );
};

export const clearItemFromCart = (cartItems, cartItem) => {
    return cartItems.filter(item => item.id !== cartItem.id);
};