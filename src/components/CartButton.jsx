useEffect(() => {
    ShoppingCart.registerCartListener(cartListener);
    return () => {
      const index = ShoppingCart.LISTENERS.indexOf(cartListener);
      if (index > -1) {
        ShoppingCart.LISTENERS.splice(index, 1);
      }
    };
  }, [cartListener]);