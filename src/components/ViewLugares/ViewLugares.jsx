import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
} from "react-native";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import {
  FontAwesome6,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";

import styles from "./styles";
import CustomBox from "../../components/CheckBox";
export default function ViewLugares() {
  const auth = getAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const dia = new Date();
  const opciones = { day: "numeric", month: "long" };
  const fechaFormateada = dia.toLocaleDateString("es-ES", opciones);

  const opcionesHora = { hour: "2-digit", minute: "2-digit" };
  const horaFormateada = dia.toLocaleTimeString("es-ES", opcionesHora);
  const arregloObjetos = [
    {
        ubicacion: "Ciudad de México",
        precio: 150,
        created_by: "Usuario1",
        scooter_id: "ABC123",
        fecha: fechaFormateada,
        hora: horaFormateada,
      },
      {
        ubicacion: "Ciudad de México",
        precio: 150,
        created_by: "Usuario1",
        scooter_id: "ABC123",
        fecha: fechaFormateada,
        hora: horaFormateada,
      },  {
        ubicacion: "Ciudad de México",
        precio: 150,
        created_by: "Usuario1",
        scooter_id: "ABC123",
        fecha: fechaFormateada,
        hora: horaFormateada,
      },  {
        ubicacion: "Ciudad de México",
        precio: 150,
        created_by: "Usuario1",
        scooter_id: "ABC123",
        fecha: fechaFormateada,
        hora: horaFormateada,
      },
    {
      ubicacion: "Ciudad de México",
      precio: 150,
      created_by: "Usuario1",
      scooter_id: "ABC123",
      fecha: fechaFormateada,
      hora: horaFormateada,
    },
    {
      ubicacion: "Guadalajara",
      precio: 120,
      created_by: "Usuario2",
      scooter_id: "DEF456",
      fecha: fechaFormateada,
      hora: horaFormateada,
    },
    {
      ubicacion: "Monterrey",
      precio: 130,
      created_by: "Usuario3",
      scooter_id: "GHI789",
      fecha: fechaFormateada,
      hora: horaFormateada,
    },
    {
      ubicacion: "Monterrey",
      precio: 130,
      created_by: "Usuario3",
      scooter_id: "GHI789",
      fecha: fechaFormateada,
      hora: horaFormateada,
    },
    {
        ubicacion: "Monterrey",
        precio: 130,
        created_by: "Usuario3",
        scooter_id: "GHI789",
        fecha: fechaFormateada,
        hora: horaFormateada,
      },{
        ubicacion: "Monterrey",
        precio: 130,
        created_by: "Usuario3",
        scooter_id: "GHI789",
        fecha: fechaFormateada,
        hora: horaFormateada,
      },{
        ubicacion: "Monterrey",
        precio: 130,
        created_by: "Usuario3",
        scooter_id: "GHI789",
        fecha: fechaFormateada,
        hora: horaFormateada,
      },
      {
        ubicacion: "Monterrey",
        precio: 130,
        created_by: "Usuario3",
        scooter_id: "GHI789",
        fecha: fechaFormateada,
        hora: horaFormateada,
      },{
        ubicacion: "Monterrey",
        precio: 130,
        created_by: "Usuario3",
        scooter_id: "GHI789",
        fecha: fechaFormateada,
        hora: horaFormateada,
      },{
        ubicacion: "Monterrey",
        precio: 130,
        created_by: "Usuario3",
        scooter_id: "GHI789",
        fecha: fechaFormateada,
        hora: horaFormateada,
      },{
        ubicacion: "Monterrey",
        precio: 130,
        created_by: "Usuario3",
        scooter_id: "GHI789",
        fecha: fechaFormateada,
        hora: horaFormateada,
      },{
        ubicacion: "Monterrey",
        precio: 130,
        created_by: "Usuario3",
        scooter_id: "GHI789",
        fecha: fechaFormateada,
        hora: horaFormateada,
      },{
        ubicacion: "Monterrey",
        precio: 130,
        created_by: "Usuario3",
        scooter_id: "GHI789",
        fecha: fechaFormateada,
        hora: horaFormateada,
      },{
        ubicacion: "Monterrey",
        precio: 130,
        created_by: "Usuario3",
        scooter_id: "GHI789",
        fecha: fechaFormateada,
        hora: horaFormateada,
      },
  ];
  useEffect(() => {
    const getTravels = () => {
      const places = [];
      const newPLaces = arregloObjetos.map((item) => places.push(item));
      setData(places);
      setLoading(false);
    };
    getTravels();
  }, []);
  if (loading) {
    return (
      <View style={{ marginTop: "70%", alignItems: "center" }}>
        <ActivityIndicator color="#6BB8FF" size="large" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {data.map((item, key) => {
        return (
          <TouchableOpacity style={styles.viewMain} key={key}>
            <View style={styles.viewBox}>
              <CustomBox
                //onPress={() => handlerNavigation()}
                style={styles.box}
                //isChecked={selectedOption === 1}
                //toggleBox={() => setSelectedOption(1)}
              />
            </View>
            <View style={styles.viewImage}>
              <Image
                source={require("../../../assets/Icons/Scooter.png")}
                style={[
                  styles.Icon,
                  { height: 35, width: 70, marginRight: 10 },
                ]}
              />
            </View>
            <View style={styles.viewDates}>
              <Text>{item.ubicacion}</Text>
              <Text>
                {item.fecha} / {item.hora} / ${item.precio}
              </Text>
            </View>
            <View style={styles.viewStars}>
              <AntDesign name="star" size={20} color="#4772A9" />
              <AntDesign name="star" size={20} color="#4772A9" />
              <AntDesign name="star" size={20} color="#4772A9" />
              <AntDesign name="star" size={20} color="#4772A9" />
              <AntDesign name="star" size={20} color="green" />
            </View>
          </TouchableOpacity>
        );
      })}
      {/* <FlatList
        data={arregloObjetos}
        renderItem={({ item, key }) => (
          <View style={styles.viewMain} key={key}>
            <View style={styles.viewBox}>
              <CustomBox
                //onPress={() => handlerNavigation()}
                style={styles.box}
                //isChecked={selectedOption === 1}
                //toggleBox={() => setSelectedOption(1)}
              />
            </View>
            <View style={styles.viewImage}>
              <Image
                source={require("../../../assets/Icons/Scooter.png")}
                style={[
                  styles.Icon,
                  { height: 35, width: 70, marginRight: 10 },
                ]}
              />
            </View>
            <View style={styles.viewDates}>
              <Text>{item.ubicacion}</Text>
              <Text>
                {item.fecha} / {item.hora} / {item.precio}
              </Text>
            </View>
            <View style={styles.viewStars}>
              <AntDesign name="star" size={20} color="#4772A9" />
              <AntDesign name="star" size={20} color="#4772A9" />
              <AntDesign name="star" size={20} color="#4772A9" />
              <AntDesign name="star" size={20} color="#4772A9" />
              <AntDesign name="star" size={20} color="green" />
            </View>
          </View>
        )}
      /> */}
    </View>
  );
}
