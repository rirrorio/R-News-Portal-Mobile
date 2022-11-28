import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";

import { Post } from "../../queries";
import { useQuery } from "@apollo/client";
const baseUrl =
  "https://ea72-2001-448a-304f-338e-f00b-bf2f-8b2f-9028.ap.ngrok.io";
// const baseUrl = 'http://10.0.2.2:4002'
export default function DetailPage({ route }) {
  const { id } = route.params;

  const { loading, error, data } = useQuery(Post, {
    variables: { postId: id },
  });
  // console.log(loading, error, data);

  return (
    <View style={styles.content}>
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <>
          <Image source={{ uri: data.Post.imgUrl }} style={{ height: 300 }} />
          <Text style={{ fontSize: 20, textAlign: "center", color:"#F4FAFB" }}>
            {data.Post.title}
          </Text>
          <Text style={{paddingLeft:7,paddingTop:10, fontSize:10, color:"#F4FAFB"}}> From {data.Post.Category.name} category {'\n'} Submitted by {data.Post.User.email}</Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: "left",
              marginTop: 10,
              padding: 10,
              color:"#F4FAFB"
            }}
          >
            {data.Post.content}
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "#006e7f",
    padding: 7,
  },
});
