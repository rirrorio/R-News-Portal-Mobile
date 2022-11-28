import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Posts, Categories } from "../../queries";

const baseUrl =
  "https://ea72-2001-448a-304f-338e-f00b-bf2f-8b2f-9028.ap.ngrok.io";
export default function HomePage({ navigation }) {
  const { loading, error, data: posts } = useQuery(Posts);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const renderDetail = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Detail", { id: item.id })}
      >
        <View style={styles.card}>
          <Image
            source={{ uri: item.imgUrl }}
            style={{ height: windowHeight * 0.2, width: 0.93*windowWidth }}
          />
          <Text style={styles.FontFam}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const {
    loading: loadingCat,
    error: errorCat,
    data: cat,
  } = useQuery(Categories);
  const renderCategoryList = ({ item }) => {
    return (
      <>

      <TouchableOpacity style={{marginTop:7}} onPress={() => navigation.navigate("PBC", { id: item.id })}>
        <View
          style={{
            width: 0.5 * windowWidth,
            height: 0.05 * windowHeight,
            backgroundColor: "black",
            borderColor:"black",
            borderRadius:5,
            marginRight:2,
            verticalAlign:"Center"
          }}
        >
          <Text style={{ fontFamily: "sans-serif", color: "#F4FAFB", textAlign:"center", padding:1 }}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
          </>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={{ color: "white", fontSize: 24, textAlign: "center" }}>
          r-News-Portal
        </Text>
        <View>
        <Text style={{color:"white", textAlign:"center", fontSize:12}}>Bringing you news from around the world, as you pleased</Text>
          {loadingCat ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <FlatList
              horizontal
              data={cat.Categories}
              renderItem={renderCategoryList}
              keyExtractor={(el) => el.id}
            />
          )}
        </View>
        <View style={styles.cardContainer}>
          {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <FlatList
              data={posts.Posts}
              renderItem={renderDetail}
              keyExtractor={(el) => el.id}
            />
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
    paddingTop: 10,
    backgroundColor: "#006e7f",
  },
  FontFam: {
    fontFamily: "sans-serif",
    color: "#F4FAFB",
  },
  cardContainer: {
    flex: 2,
    padding: 5,
    flexDirection: "row",
    gap: 1,
  },
  card: {
    flex: 1,
    backgroundColor: "#00B3A4",
    padding:5,
    marginBottom: 5,
    borderRadius: 8,
  },
  cardCategories: {
    flex: 1,
    backgroundColor: "yellow",
    height: 60,
  },
});
