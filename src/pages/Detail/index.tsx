import React from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView,
} from "react-native";
import Constants from "expo-constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather as Icon, FontAwesome } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";

// import { Container } from './styles';

interface Params {
    point_id: number;
}

const Detail: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const params = route.params as Params;

    function handleNavigationBack() {
        navigation.goBack();
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigationBack}>
                    <Icon name="arrow-left" size={20} color="#34cb79" />
                </TouchableOpacity>
                <Image
                    style={styles.pointImage}
                    source={{
                        uri:
                            "https://images.unsplash.com/photo-1506484381205-f7945653044d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
                    }}
                />
                <Text style={styles.pointName}>Mercadão do João</Text>
                <Text style={styles.pointItems}>Lâmpadas, Óleo de cozinha</Text>

                <View style={styles.address}>
                    <Text style={styles.addressTitle}>Endereço</Text>
                    <Text style={styles.addressContent}>Belo Horizonte</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={() => {}}>
                    <FontAwesome color="#fff" size={20} name="whatsapp" />
                    <Text style={styles.buttonText}>Whatsapp</Text>
                </RectButton>
                <RectButton style={styles.button} onPress={() => {}}>
                    <Icon color="#fff" size={20} name="mail" />
                    <Text style={styles.buttonText}>Email</Text>
                </RectButton>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 32,
        paddingTop: 20 + Constants.statusBarHeight,
    },

    pointImage: {
        width: "100%",
        height: 120,
        resizeMode: "cover",
        borderRadius: 10,
        marginTop: 32,
    },

    pointName: {
        color: "#322153",
        fontSize: 28,
        fontFamily: "Ubuntu_700Bold",
        marginTop: 24,
    },

    pointItems: {
        fontFamily: "Roboto_400Regular",
        fontSize: 16,
        lineHeight: 24,
        marginTop: 8,
        color: "#6C6C80",
    },

    address: {
        marginTop: 32,
    },

    addressTitle: {
        color: "#322153",
        fontFamily: "Roboto_500Medium",
        fontSize: 16,
    },

    addressContent: {
        fontFamily: "Roboto_400Regular",
        lineHeight: 24,
        marginTop: 8,
        color: "#6C6C80",
    },

    footer: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: "#999",
        paddingVertical: 20,
        paddingHorizontal: 32,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    button: {
        width: "48%",
        backgroundColor: "#34CB79",
        borderRadius: 10,
        height: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        marginLeft: 8,
        color: "#FFF",
        fontSize: 16,
        fontFamily: "Roboto_500Medium",
    },
});

export default Detail;
