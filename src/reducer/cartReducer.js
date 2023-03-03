const cartReducer = (state, action) => {
    if (action.type === "ADD_TO_CART") {
      let { _id, color, amount, product } = action.payload;
  
      let cartProduct;
  
      cartProduct = {
        _id: _id + color,
        name: product.name,
        color,
        amount,
        image: product.image[0],
        price: product.price,
        max: product.stock,
      };
  
      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };
    }
  
    if (action.type === "REMOVE_ITEM") {
      let updatedCart = state.cart.filter(
        (curItem) => curItem._id !== action.payload
      );
      return {
        ...state,
        cart: updatedCart,
      };
    }
  
    return state;
  };
  
  export default cartReducer;