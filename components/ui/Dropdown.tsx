import React, { useState } from 'react';
import { View, Text, Pressable, Modal, FlatList, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  placeholder: string;
  options: DropdownOption[];
  value: string;
  onValueChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  placeholder,
  options,
  value,
  onValueChange,
  error,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowDimensions();

  const isMediumScreen = width >= 375 && width < 768;
  const isLargeScreen = width >= 768;

  const inputPadding = isLargeScreen ? 'p-4' : isMediumScreen ? 'p-3' : 'p-2.5';
  const inputTextSize = isLargeScreen ? 'text-lg' : isMediumScreen ? 'text-base' : 'text-sm';

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (selectedValue: string) => {
    onValueChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <View>
      <Pressable
        disabled={disabled}
        className={`rounded-lg border ${error ? 'border-red-500' : 'border-gray-200'} ${disabled ? 'bg-gray-100' : 'bg-gray-50'} ${inputPadding}`}
        onPress={() => !disabled && setIsOpen(true)}>
        <View className="flex-row items-center justify-between">
          <Text
            className={`${inputTextSize} ${selectedOption ? 'text-gray-900' : 'text-gray-500'}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </Text>
          <Ionicons
            name="chevron-down"
            size={isLargeScreen ? 20 : isMediumScreen ? 18 : 16}
            color="#6b7280"
          />
        </View>
      </Pressable>

      {error && <Text className="mt-1 text-xs text-red-600">{error}</Text>}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}>
        <Pressable className="flex-1 bg-black bg-opacity-50" onPress={() => setIsOpen(false)}>
          <View className="flex-1 justify-center px-4">
            <View className="max-h-96 rounded-lg bg-white">
              <View className="border-b border-gray-200 p-4">
                <Text className={`${inputTextSize} font-semibold text-gray-900`}>
                  {placeholder}
                </Text>
              </View>
              <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <Pressable
                    className={`border-b border-gray-100 p-4 ${value === item.value ? 'bg-blue-50' : ''}`}
                    onPress={() => handleSelect(item.value)}>
                    <Text
                      className={`${inputTextSize} ${value === item.value ? 'font-semibold text-blue-600' : 'text-gray-900'}`}>
                      {item.label}
                    </Text>
                  </Pressable>
                )}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Dropdown;
