
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
} from "react-native";

// konten : sambo, hiv bandung, bensin, begal dibegal balik, juventus roma seri,
export default function LandingPage({navigation}) {
  const thumbNail = [
    {
      id:1,
      title:
        "Fakta Rekonstruksi Pembunuhan Brigadir J: Korban Sempat Minta Ampun",
      image:
        "https://statik.tempo.co/data/2022/08/10/id_1131674/1131674_720.jpg",
    },
    {
      id:2,
      title:
        "50% Dana Donasi yang Masuk ke Aksi Cepat Tanggap Masuk ke Kantong Pribadi",
      image:
        "https://images-tm.tempo.co/mbm/cover/2606/cover_Edisi_2_Juli_2022_-_Kantong_Bocor_Dana_Umat.jpeg",
    },
    {
      id:3,
      title:
        "BBM Per 1 september 2022 akan berubah harga lagi",
      image:
        "https://images-tm.tempo.co/mbm/cover/2614/cover_Edisi_27_Agustus_2022_-_Setengah_Mati_Subsidi.jpeg",
    },
    {
      id:4,
      title: "'Berdamai' dengan Virus Corona",
      image:
        "https://images-tm.tempo.co/mbm/cover/2590/cover_Edisi_12_Maret_2022.jpg",
    },
  ];
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const renderDetail = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: item.image }}
          style={{ height: windowHeight * 0.7, width: windowWidth}}
        />
          <Text style={{ fontSize: 14,textAlign:"center", flexWrap:"wrap", width:windowWidth*0.9, color:"#E5FCFF"}}>{item.title}</Text>
      </View>
    );
  };
  return (
    <View style={styles.cardContainer}>
      <Text style={{ fontSize: 30, textAlign: "center", color:"#E5FCFF" }}>LATEST NEWS:</Text>
      <FlatList
        horizontal
        data={thumbNail}
        renderItem={renderDetail}
        keyExtractor={(el) => el.id}
      />
      <View style={styles.button}>
      <Button title='Read All Available News' onPress={()=>navigation.navigate('Home')} color='#00B3A4'/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex:1,
    backgroundColor: "#006e7f",
    padding: 5,
    flexDirection: "column",
  },
  card: {
    flex: 1,
    padding: 5,
    marginBottom: 5,
    borderRadius: 8,
    alignItems:"center"
  },
  button:{
    marginBottom:20
  }
});
