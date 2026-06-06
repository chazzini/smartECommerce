import { StyleSheet, FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import AppSafeAreaView from "@/components/views/AppSafeAreaView";
import StackHeader from "@/components/headers/StackHeader";
import OrderCard from "@/components/card/OrderCard";
import { sharedPaddingHorizontal } from "@/styles/sharedStyles";
import { vs } from "react-native-size-matters";
import { useSelector } from "react-redux";
import { getUserOrders } from "@/config/dataService";
import moment from "moment";
import { useTranslation } from "react-i18next";

const MyOrder = () => {
  const user = useSelector((state: any) => state.user);
  const [orders, setOrders] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getUserOrders(user?.user?.uid).then((orders) => setOrders(orders));
  }, []);

  console.log("orders:", orders);

  const calculateTotals = (items: any[]) => {
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
  return (
    <AppSafeAreaView>
      <StackHeader headerTitle={t("my-orders")} />
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <OrderCard
            orderNumber={item.id}
            orderDate={moment(item.orderDate).format("DD-MMM-YYYY HH:mm:ss A")}
            orderItems={item.items.length}
            orderTotal={calculateTotals(item.items).total}
            trackOrder={() => {
              console.log(`Tracking order: ${item.id}`);
            }}
          />
        )}
      />
    </AppSafeAreaView>
  );
};

export default MyOrder;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: sharedPaddingHorizontal,
    paddingVertical: vs(12),
  },
  separator: {
    height: vs(16),
  },
});
