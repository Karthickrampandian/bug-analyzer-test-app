import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { ShoppingCart } from "../utils/shopping-cart";
import { ROUTES } from "../utils/Constants";
import "./CartButton.css";

const CartButton = (props) => {
  const { history } = props;
  let cartBadge = "";
  const [cartContents, setCartContents] = useState(
    ShoppingCart.getCartContents()
  );
  // Strangely enough this is being called, but not covered in the report
  /* istanbul ignore next */
  const cartListenerRef = React.useRef(null);

  if (!cartListenerRef.current) {
    cartListenerRef.current = {
      forceUpdate: () => setCartContents(ShoppingCart.getCartContents()),
    };
  }

  useEffect(() => {
    const listener = cartListenerRef.current;
    ShoppingCart.registerCartListener(listener);
    return () => {
      const index = ShoppingCart.LISTENERS.indexOf(listener);
      if (index > -1) {
        ShoppingCart.LISTENERS.splice(index, 1);
      }
    };
  }, []);

  if (cartContents.length > 0) {
    cartBadge = (
      <span className="shopping_cart_badge" data-test="shopping-cart-badge">
        {cartContents.length}
      </span>
    );
  }

  return (
    <a
      className="shopping_cart_link"
      onClick={() => history.push(ROUTES.CART)}
      data-test="shopping-cart-link"
    >
      {cartBadge}
    </a>
  );
};

CartButton.propTypes = {
  /**
   * The history
   */
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(CartButton);
