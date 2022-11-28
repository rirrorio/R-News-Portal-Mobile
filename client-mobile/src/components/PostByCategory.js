import { useQuery } from "@apollo/client";
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
import { PostByCategory } from "../../queries";

const baseUrl =
  "https://ea72-2001-448a-304f-338e-f00b-bf2f-8b2f-9028.ap.ngrok.io";
export default function SortPostByCategory({ navigation, route }) {
  const { id } = route.params;
  const {
    loading,
    error,
    data: sortByCategory,
  } = useQuery(PostByCategory, {
    variables: { categoryId: id },
  });
  console.log(loading,error,sortByCategory);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const renderDetail = ({ item }) => {
    // console.log(item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Detail", { id: item.id })}
      >
        <View style={styles.card}>
          <Image
            source={{ uri: item.imgUrl }}
            style={{ height: windowHeight * 0.2, width: 0.93 * windowWidth }}
          />
          <Text style={styles.FontFam}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={{ color: "white", fontSize: 24, textAlign: "center" }}>
          r-News-Portal
        </Text>
        <View style={styles.cardContainer}>
          {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : sortByCategory.PostByCategory.length === 0 ? (
            <View style={{flex:1,alignContent:"center"}}>
              <Text
                style={{ color: "#F4FAFB", textAlign: "center", fontSize: 16 }}
              >
                OOPS! No news available in this category
              </Text>
              <Image
                source={{
                  uri: "https://media0.giphy.com/media/6S9AnvCaMRItO/200.gif",
                }}
                style={{
                  height: windowHeight * 0.4,
                  width: windowWidth*0.95,
                }}
              />
            </View>
          ) : (
            <FlatList
              data={sortByCategory.PostByCategory}
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
    padding: 5,
    marginBottom: 5,
    borderRadius: 8,
  },
  cardCategories: {
    flex: 1,
    backgroundColor: "yellow",
    height: 60,
  },
});
