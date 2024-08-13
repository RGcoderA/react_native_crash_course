import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Loader } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const AuthLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  // Redirect to the home page if not loading and the user is logged in
  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <>
      {/* Loader should be displayed only when loading */}
      {loading ? <Loader isLoading={loading} /> : (
        <Stack>
          <Stack.Screen
            name="sign-in"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="sign-up"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      )}

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
