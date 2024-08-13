import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 16,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={images.logo}
            style={{ width: 130, height: 84 }}
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            style={{ maxWidth: 380, width: "100%", height: 298 }}
            resizeMode="contain"
          />

          <View style={{ marginTop: 20, alignItems: "center" }}>
            <Text style={{ fontSize: 24, color: "#FFF", fontWeight: "bold", textAlign: "center" }}>
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text style={{ color: "#FFD700" }}>Aora</Text>
            </Text>

            <Image
              source={images.path}
              style={{ width: 136, height: 15, position: "absolute", bottom: -8, right: -32 }}
              resizeMode="contain"
            />
          </View>

          <Text style={{ fontSize: 14, color: "#E0E0E0", marginTop: 20, textAlign: "center" }}>
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles={{
              width: "100%",
              marginTop: 20,
              backgroundColor: "#FFA500", // Orange background color
              borderColor: "#FFF", // White border color
              borderWidth: 2,
              borderRadius: 8, // Rounded corners
              paddingVertical: 12,
              paddingHorizontal: 16,
              alignItems: "center",
            }}
            textStyles={{
              color: "#FFF", // White text color for visibility
              fontSize: 16,
              fontWeight: "bold",
            }}
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#000" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
