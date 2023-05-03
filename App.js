import React from "react";
import axios from "axios";
import { Select } from "native-base";
import { StyleSheet } from "react-native";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  Button,
  Skeleton,
  Modal,
  FormControl,
} from "native-base";
import { View, Pressable, Image } from "native-base";
import NativeBaseIcon from "./components/NativeBaseIcon";
import { Platform } from "react-native";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {
  const [city, setCity] = React.useState("Moscow");
  const [cityData, setCityData] = React.useState();
  const [showModal, setShowModal] = React.useState(false);
  const apiKey = "15b726b915a14cb2b62150855231704";
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setCityData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setShowModal(true);
        setLoading(true);
      });
  }, []);

  React.useEffect(() => {
    let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setCityData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setShowModal(true);
        setLoading(true);
      });
  }, [city]);

  const onChangeCity = (itemValue) => {
    setCity(itemValue);
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#0891b2",
      paddingVertical: 16,
      paddingHorizontal: 12,
      borderRadius: 5,
      alignSelf: "center",
      width: 375,
      maxWidth: "100%",
    },
    timings: {
      color: "#fff",
      fontSize: 14,
    },
    metaContainer: {
      justifyContent: "space-between",
    },
    topContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    avatar: {
      height: 100,
      width: 100,
      borderRadius: 100,
    },
    description: {
      color: "white",
      marginTop: 5,
      fontSize: 20,
    },
    button: {
      backgroundColor: "#22d3ee",
      alignSelf: "flex-start",
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 2,
    },
    buttonText: {
      fontWeight: "bold",
      color: "white",
      textTransform: "uppercase",
      fontSize: 14,
    },
  });

  return (
    <NativeBaseProvider>
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
      >
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Contact Us</Modal.Header>
            <Modal.Body>Cannot connect to server, come back later</Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  Cancel
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        {isLoading ? (
          <VStack
            w="90%"
            maxW="400"
            borderWidth="1"
            space={8}
            overflow="hidden"
            rounded="md"
            _dark={{
              borderColor: "coolGray.500",
            }}
            _light={{
              borderColor: "coolGray.200",
            }}
          >
            <Skeleton h="40" />
            <Skeleton.Text px="4" />
            <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
          </VStack>
        ) : (
          <View style={styles.container}>
            <View style={styles.topContainer}>
              <View style={styles.metaContainer}>
                <View>
                  <Text style={styles.timings}>
                    local time and date: {cityData.location.localtime}
                  </Text>
                  <Text style={styles.description}>
                    {cityData.location.country}
                    {"\n"}
                    {cityData.location.name}
                  </Text>
                </View>

                <Text style={styles.buttonText}>
                  Temperature in celsius {cityData.current.temp_c}°
                </Text>
                <Text style={styles.buttonText}>
                  Temperature in fahrenheit {cityData.current.temp_f}°
                </Text>
              </View>
              <Image
                source={{
                  uri: "http:" + cityData.current.condition.icon,
                }}
                style={styles.avatar}
              />
            </View>
          </View>
        )}

        <Box maxW="300">
          <Select
            selectedValue={city}
            minWidth="200"
            accessibilityLabel="Choose city"
            placeholder="Choose City"
            _selectedItem={{
              bg: "teal.600",
            }}
            mt={1}
            onValueChange={onChangeCity}
          >
            <Select.Item label="New York" value="New York" />
            <Select.Item label="Moscow" value="Moscow" />
            <Select.Item label="Kazan" value="Kazan" />
            <Select.Item label="Oslo" value="Oslo" />
            <Select.Item label="Sydney" value="Sydney" />
          </Select>
          <Button onPress={() => console.log("hello world")}>Click Me</Button>
        </Box>
        <VStack space={5} alignItems="center">
          <ToggleDarkMode />
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
}

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}
