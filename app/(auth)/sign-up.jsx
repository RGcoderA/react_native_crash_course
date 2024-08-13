import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image, TouchableOpacity } from "react-native";

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { createUser, signIn, getCurrentUser } from "../../lib/appwrite"; // Ensure these are correctly imported
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);
      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 16 }}>
        <View style={{ alignItems: 'center', marginVertical: 20, minHeight: Dimensions.get('window').height - 100 }}>
          <Image
            source={images.logo}
            resizeMode="contain"
            style={{ width: 115, height: 34 }}
          />

          <Text style={{ fontSize: 24, fontWeight: '600', color: '#FFF', marginTop: 20 }}>
            Sign Up to Aora
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            containerStyle={{ marginTop: 20 }}
            labelStyle={{ color: '#FFF' }} // Ensure label text is white
            inputStyle={{ color: '#FFF' }} // Ensure input text is white
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            containerStyle={{ marginTop: 20 }}
            keyboardType="email-address"
            labelStyle={{ color: '#FFF' }} // Ensure label text is white
            inputStyle={{ color: '#FFF' }} // Ensure input text is white
          />

          <View style={{ marginTop: 20 }}>
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              secureTextEntry={!showPassword}
              labelStyle={{ color: '#FFF' }} // Ensure label text is white
              inputStyle={{ color: '#FFF' }} // Ensure input text is white
            />
            <TouchableOpacity
              style={{ position: 'absolute', right: 10, top: 35 }}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={{ color: '#FFF' }}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles={{ marginTop: 20 }}
            isLoading={isSubmitting}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 16, color: '#FFF', marginRight: 5 }}>
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              style={{ fontSize: 16, fontWeight: '600', color: '#FFF' }} // Ensure link text is white
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
