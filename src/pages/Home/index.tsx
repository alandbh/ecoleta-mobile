import React, { useState, useEffect } from "react";
import {
    View,
    ImageBackground,
    Text,
    Image,
    StyleSheet,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Picker,
    Modal,
    BackHandler,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Axios from "axios";

import Autocomplete from "../../components/Autocomplete";
import { SafeAreaProvider } from "react-native-safe-area-context";

const logo = require("../../assets/logo.png");
const homeBackground = require("../../assets/home-background.png");

const fakeUfs = ["Rondônia", "Acre", "Amazonas", "Roraima"];

interface UfResponse {
    sigla: string;
}
interface CitiesResponse {
    nome: string;
}

const Home: React.FC = () => {
    const navigation = useNavigation();
    const [ufs, setUfs] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState<string>("");
    const [cities, setCities] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [keyboardOpen, setKeyboardOpen] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [focusOnUf, setFocusOnUf] = useState<boolean>(false);

    useEffect(() => {
        Axios.get<UfResponse[]>(
            "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
        ).then((response) => {
            const ufsResponse = response.data.map((uf) => uf.sigla);
            setUfs(ufsResponse);
            // console.log(ufsResponse);
        });
    }, []);

    useEffect(() => {
        Axios.get<CitiesResponse[]>(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
        ).then((response) => {
            const citiesResponse = response.data.map((city) => city.nome);
            setCities(citiesResponse);
            console.log(citiesResponse);
        });
    }, [selectedUf]);

    function handleNavigateToPoint() {
        navigation.navigate("Points", {
            selectedUf,
            selectedCity,
        });
    }

    function handleOnSelect(value: string) {
        console.log("Estado: ", value);
        setSelectedUf(value);
    }
    function handleOnSelectCity(value: string) {
        console.log("Cidade: ", value);
        setSelectedCity(value);
    }

    Keyboard.addListener("keyboardWillShow", () => {
        setKeyboardOpen(true);
        console.log("teclado aberto");
    });
    Keyboard.addListener("keyboardDidHide", () => {
        setKeyboardOpen(false);
        console.log("teclado fechado");
    });
    BackHandler;
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {/* <SafeAreaProvider> */}
            <ImageBackground
                source={homeBackground}
                style={{ ...styles.container, paddingBottom: 100 }}
                imageStyle={{ width: 274, height: 368 }}
            >
                {/* <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                > */}
                <View
                    style={
                        keyboardOpen ? { ...styles.main } : { ...styles.main }
                    }
                >
                    <Image style={{ marginTop: 30 }} source={logo} />
                    <Text
                        style={
                            keyboardOpen
                                ? { display: "none" }
                                : { ...styles.title }
                        }
                    >
                        Seu buscador de coleta de resíduos
                    </Text>
                    <Text style={styles.description}>
                        Econtre pontos de coleta de resíduos perto de você.
                    </Text>
                    {selectedCity === "" && (
                        <TouchableOpacity
                            style={{ ...styles.button, marginTop: 30 }}
                            onPress={() => setModalOpen(true)}
                        >
                            <Text style={styles.buttonText}>
                                Selecione sua cidade
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
                <Modal
                    onRequestClose={() => setModalOpen(false)}
                    visible={modalOpen}
                    onShow={() => setFocusOnUf(true)}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "#f1f1f1",
                            paddingHorizontal: 20,
                            paddingVertical: 30,
                        }}
                    >
                        {ufs.length > 2 && (
                            <>
                                <Text style={styles.inputLabel}>
                                    Selecione a sigla do seu estado (UF)
                                </Text>
                                <Autocomplete
                                    data={ufs}
                                    inputStyle={styles.input}
                                    listStyle={styles.autocompleteList}
                                    listItemStyle={styles.autocompleteListItem}
                                    listItemStyleText={
                                        styles.autocompleteListItemText
                                    }
                                    maxLength={2}
                                    autoCapitalize="characters"
                                    autoFocus={true}
                                    onSelect={handleOnSelect}
                                />
                            </>
                        )}

                        {/* {true && ( */}
                        {cities.length > 2 && (
                            <>
                                <Text style={styles.inputLabel}>
                                    Selecione sua cidade
                                </Text>
                                <Autocomplete
                                    data={cities}
                                    inputStyle={styles.input}
                                    listStyle={styles.autocompleteList}
                                    listItemStyle={styles.autocompleteListItem}
                                    listItemStyleText={
                                        styles.autocompleteListItemText
                                    }
                                    onSelect={handleOnSelectCity}
                                />
                            </>
                        )}
                        <TouchableOpacity
                            onPress={() => setModalOpen(false)}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                {/* 
                    <View>
                        <Picker
                            selectedValue={selectedCity}
                            style={{ height: 50, width: "100%" }}
                            onValueChange={(itemValue) =>
                                setSelectedCity(itemValue)
                            }
                            mode={"dropdown"}
                        >
                            <Picker.Item label="Java" value="java" />
                            <Picker.Item label="JavaScript" value="js" />
                            <Picker.Item label="DotNet" value="dn" />
                        </Picker>
                    </View> */}

                {selectedCity !== "" && (
                    <>
                        <View style={styles.footer}>
                            <View style={{ paddingVertical: 20 }}>
                                <Text style={{ fontSize: 14 }}>Estado:</Text>
                                <Text
                                    style={{ fontWeight: "bold", fontSize: 18 }}
                                >
                                    {selectedUf}
                                </Text>
                                <Text style={{ fontSize: 14, marginTop: 10 }}>
                                    Cidade:
                                </Text>
                                <Text
                                    style={{ fontWeight: "bold", fontSize: 18 }}
                                >
                                    {selectedCity}
                                </Text>
                            </View>
                            <RectButton
                                style={styles.button}
                                onPress={handleNavigateToPoint}
                            >
                                <View style={styles.buttonIcon}>
                                    <Text>
                                        <Icon
                                            name="arrow-right"
                                            color="#fff"
                                            size={24}
                                        />
                                    </Text>
                                </View>
                                <Text style={styles.buttonText}>
                                    Veja no mapa
                                </Text>
                            </RectButton>
                            <TouchableOpacity
                                style={{
                                    height: 40,
                                    marginTop: 20,
                                }}
                                onPress={() => {
                                    setSelectedUf("");
                                    setSelectedCity("");
                                }}
                            >
                                <Text
                                    style={{
                                        lineHeight: 40,
                                        textAlign: "center",
                                    }}
                                >
                                    Remover a localidade
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
                {/* <View style={{ flex: 1 }} /> */}
                {/* </KeyboardAvoidingView> */}
            </ImageBackground>
            {/* </SafeAreaProvider> */}
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        backgroundColor: "#f0f0f5",
    },

    main: {
        flex: 1,
        justifyContent: "center",
        position: "relative",
    },
    mainKeyboard: {
        marginTop: -100,
    },

    title: {
        color: "#322153",
        fontSize: 32,
        fontFamily: "Ubuntu_700Bold",
        maxWidth: 260,
        marginTop: 64,
    },

    description: {
        color: "#6C6C80",
        fontSize: 16,
        marginTop: 16,
        fontFamily: "Roboto_400Regular",
        maxWidth: 260,
        lineHeight: 24,
    },

    footer: {
        flex: 1,
        marginTop: 30,
        justifyContent: "flex-end",
    },

    select: {},

    titleText: {
        fontSize: 18,
        fontWeight: "500",
        marginBottom: 10,
        marginTop: 10,
        textAlign: "center",
    },
    directorText: {
        color: "grey",
        fontSize: 12,
        marginBottom: 10,
        textAlign: "center",
    },
    openingText: {
        textAlign: "center",
    },

    input: {
        height: 60,
        backgroundColor: "#FFF",
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
        borderColor: "#bbb",
        borderStyle: "solid",
        borderWidth: 2,
    },
    inputLabel: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 8,
    },
    autocompleteListItem: {
        height: 50,
        lineHeight: 40,
        backgroundColor: "#FFF",
        paddingHorizontal: 14,
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
    },
    autocompleteListItemText: {
        lineHeight: 50,
        fontSize: 16,
        color: "#999",
    },
    autocompleteList: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        marginBottom: 8,
    },

    button: {
        backgroundColor: "#34CB79",
        height: 60,
        flexDirection: "row",
        borderRadius: 10,
        overflow: "hidden",
        alignItems: "center",
        marginTop: 8,
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        color: "#FFF",
        fontFamily: "Roboto_500Medium",
        fontSize: 16,
    },
});

export default Home;
