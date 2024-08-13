import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setSubmitting(true);
    try {
      const result = await signIn(form.email, form.password);
      if (result) {
        console.log("User signed in:", result); // Debugging log
        setUser(result);
        setIsLogged(true);
        router.replace("/home");
      } else {
        Alert.alert("Error", "Sign-in failed. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 16 }}>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 20,
            minHeight: Dimensions.get('window').height - 100,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            style={{ width: 115, height: 34 }}
          />

          <Text style={{ fontSize: 24, fontWeight: '600', color: '#FFF', marginTop: 20 }}>
            Log in to Aora
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            containerStyle={{ marginTop: 20 }}
            keyboardType="email-address"
            labelStyle={{ color: '#FFF' }} // Ensure label text is white
            inputStyle={{ color: '#FFF' }} // Ensure input text is white
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            containerStyle={{ marginTop: 20 }}
            secureTextEntry={true}
            labelStyle={{ color: '#FFF' }} // Ensure label text is white
            inputStyle={{ color: '#FFF' }} // Ensure input text is white
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles={{ marginTop: 20 }}
            isLoading={isSubmitting}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 16, color: '#FFF', marginRight: 5 }}>
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              style={{ fontSize: 16, fontWeight: '600', color: '#FFF' }} // Ensure link text is white
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView> 
  );
};

export default SignIn;
