import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  containerStyle,
  labelStyle,
  inputStyle,
  placeholderTextColor,
  secureTextEntry = false, // Default to false if not provided
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{title}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, inputStyle]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={handleChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          {...props}
        />

        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    color: '#FFF', // White color for the label
  },
  inputContainer: {
    width: '100%',
    height: 50,
    paddingHorizontal: 16,
    backgroundColor: '#000', // Black background for input container
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#333', // Slightly lighter border
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#FFF', // White color for text input
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10, // Space between the text and the icon
  },
});

export default FormField;
