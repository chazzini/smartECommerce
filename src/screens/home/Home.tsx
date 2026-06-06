import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import AppSafeAreaView from "@/components/views/AppSafeAreaView";
import HomeHeader from "@/components/headers/HomeHeader";
import ProductCard from "@/components/card/ProductCard";
import { s, vs } from "react-native-size-matters";
import { sharedPaddingHorizontal } from "@/styles/sharedStyles";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/store/reducer/CartSlice";
import { showMessage } from "react-native-flash-message";
import { useState } from "react";
import { getAllProducts } from "@/config/dataService";
import { AppColors } from "@/styles/colors";

const Home = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<any>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const fetchProducts = async () => {
    setProducts(await getAllProducts());
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchProducts();
    setIsRefreshing(false);
  };

  const addToCart = (product) => {
    dispatch(addItemToCart(product));
    showMessage({
      message: "Product added to cart",
      description: `${product.title} has been added to your cart.`,
      type: "success",
    });
  };
  return (
    <AppSafeAreaView>
      <HomeHeader />
      <View>
        <FlatList
          onRefresh={handleRefresh}
          refreshing={isRefreshing}
          data={products}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }: { item: any }) => {
            return (
              <ProductCard
                key={item.id}
                onPress={() => {}}
                addToCart={() => {
                  addToCart({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    image: item.imageURL,
                  });
                }}
                image={item.imageURL}
                title={item.title}
                price={item.price}
              />
            );
          }}
        />
      </View>
    </AppSafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
    marginBottom: vs(10),
  },
  contentContainer: {
    paddingVertical: s(10),
    paddingHorizontal: sharedPaddingHorizontal,
  },
});
