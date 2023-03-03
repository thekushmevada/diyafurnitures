const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let { _id, color, amount, product } = action.payload;

    //tackle the existing product
    let existingProduct = state.cart.find(
      (curItem) => curItem._id === _id + color
    );

    if (existingProduct) {
      let updatedProduct = state.cart.map((curElem) => {
        if (curElem._id === _id + color) {
          let newAmount = curElem.amount + amount;

          if (newAmount >= curElem.max) {
            newAmount = curElem.max;
          }
          return {
            ...curElem,
            amount: newAmount,
          };
        } else {
          return curElem;
        }
      });
      return {
        ...state,
        cart: updatedProduct,
      };
    } else {
      let cartProduct = {
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

  //to clear the carrt
  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }

  return state;
};

export default cartReducer;
