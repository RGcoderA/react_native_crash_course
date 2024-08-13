import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.button,
        containerStyles,
        isLoading && styles.disabled
      ]}
      disabled={isLoading}
    >
      <Text style={[styles.text, textStyles]}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          style={styles.loader}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000', // Use appropriate color
    borderRadius: 16, // Rounded corners (equivalent to 'rounded-xl')
    minHeight: 62, // Minimum height (equivalent to 'min-h-[62px]')
    flexDirection: 'row', // Align items in a row (equivalent to 'flex flex-row')
    justifyContent: 'center', // Center content horizontally (equivalent to 'justify-center')
    alignItems: 'center', // Center content vertically (equivalent to 'items-center')
  },
  text: {
    color: '#FFF', // Text color (equivalent to 'text-primary')
    fontSize: 18, // Font size (equivalent to 'text-lg')
    fontWeight: '600', // Semi-bold text (equivalent to 'font-psemibold')
  },
  disabled: {
    opacity: 0.5, // Reduced opacity when loading (equivalent to 'opacity-50')
  },
  loader: {
    marginLeft: 8, // Space between text and loader (equivalent to 'ml-2')
  },
});

export default CustomButton;
