import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import AppSafeAreaView from "@/components/views/AppSafeAreaView";
import HomeHeader from "@/components/headers/HomeHeader";
import EmptyCart from "@/components/card/EmptyCard";
import CartItem from "@/components/cart/CartItem";
import TotalsItem from "@/components/cart/TotalsItem";
import { products, Product } from "@/data/products";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  addItemToCart,
  removeItemFromCart,
  removeProductFromCart,
} from "@/store/reducer/CartSlice";
import { showMessage } from "react-native-flash-message";

interface CartItemType extends Product {
  quantity: number;
}

const Cart = () => {
  const { items } = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();

  console.log("items:", items);

  const [totals, setTotals] = useState<{
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
  }>({ subtotal: 0, tax: 0, shipping: 0, total: 0 });

  const handleIncrease = (item: CartItemType) => {
    dispatch(addItemToCart(item));
    showMessage({
      message: "Quantity increased",
      description: `${item.title} quantity increased successfully`,
      type: "success",
    });
  };

  const handleDecrease = (item: CartItemType) => {
    if (item.quantity > 1) {
      dispatch(removeItemFromCart(item));
      showMessage({
        message: "Quantity decreased",
        description: `${item.title} quantity decreased successfully`,
        type: "success",
      });
    }
  };

  const handleDelete = (item: CartItemType) => {
    dispatch(removeProductFromCart(item));
    showMessage({
      message: "Product Removed",
      description: `${item.title} removed successfully`,
      type: "success",
    });
  };

  const calculateTotals = () => {
    return {
      subtotal: items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      ),
      tax: items.reduce(
        (acc, item) => acc + item.price * item.quantity * 0.1,
        0,
      ),
      shipping: items.reduce(
        (acc, item) => acc + item.price * item.quantity * 0.05,
        0,
      ),
      total: items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    };
  };

  useEffect(() => {
    setTotals(calculateTotals());
  }, [items]);

  return (
    <AppSafeAreaView>
      <HomeHeader />
      {items.length == 0 ? (
        <EmptyCart />
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CartItem
                key={item.id}
                image={item.image}
                title={item.name}
                price={item.price.toFixed(2)}
                handleDelete={() => handleDelete(item)}
                handleIncrease={() => handleIncrease(item)}
                handleDecrease={() => handleDecrease(item)}
                quantity={item.quantity}
              />
            )}
          />

          <TotalsItem
            subtotal={totals.subtotal ?? 0.0}
            tax={totals.tax ?? 0.0}
            shipping={totals.shipping ?? 0.0}
            total={totals.total ?? 0.0}
          />
        </>
      )}
    </AppSafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({});
