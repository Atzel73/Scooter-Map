import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import CustomInput from '../../components/TextInput/textInput';
import CustomTouchable from '../../components/TouchableOpacity/touchableOpacity';
import Funcionalidades from '../../functions/funcionalidades/functions';
import CustomModal from '../../components/Modal/Modal';
import CustomImage from '../../components/Image/Image';
import pickImage from '../../functions/cameraPîcker/imagePicker';

export default function MainScreen() {
    const [user, setUser] = useState({ name: "", nick: "", image: null });
    const [newUser, setNewUser] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newData, setNewData] = useState(null);
    const [image, setImage] = useState(null);


    const handleUser = () => {
        setNewUser([...newUser, { ...user }]);
        setUser({ name: "", nick: "", image: null });
    }

    const handlerImage = async () => {
        const result = await pickImage();
        setUser({ ...user, image: result })

    }


    const toggleModal = () => setModalVisible(!modalVisible);



    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={[styles.container, modalVisible && styles.containerModal]}>


                <StatusBar style="auto" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        margin: 10,
    },
    containerModal: {
        backgroundColor: '#202020',
        opacity: 0.5,
    },
    inputContainer: {
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
        padding: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'grey',
    },
    input: {
        backgroundColor: 'white',
        color: '#202020',
        marginVertical: 10,
        width: '100%',
        padding: 10,
        borderRadius: 5,
        borderColor: 'grey',
        borderWidth: 1,
    },
    button: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey',
        alignItems: 'center',
        padding: 10,
        marginVertical: 10,
        width: '80%',
    },
    userList: {
        marginVertical: 20,
        flex: 1,
        marginHorizontal: 5,
    },
    userCard: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        margin: 10,
        alignItems: 'center',
        width: 150,
    },
    userName: {
        fontStyle: 'italic',
        color: 'violet',
        fontSize: 16,
        marginBottom: 5,
    },
    userNick: {
        fontStyle: 'italic',
        marginBottom: 5,
    },
    img: {
        width: 150,
        height: 100,
        borderRadius: 10,
        marginVertical: 10,
    },
    funcionalidadesContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
});
