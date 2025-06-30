import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { BRAND_LOGO } from '@/assets/images';
import { SplashLayout } from '@/components';
import * as DocumentPicker from 'expo-document-picker';
import type { DocumentPickerAsset } from 'expo-document-picker';
import { useForm, Controller } from 'react-hook-form';
import authService from '../../services/auth.service';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type FormData = {
  name: string;
  birthdate: string;
  address: string;
  email: string;
  password: string;
  confirmPassword: string;
  clearance: DocumentPickerAsset | null;
};

const CreateAccountPage: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date('1990-01-01'));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSmallScreen = width < 375;
  const isMediumScreen = width >= 375 && width < 768;
  const isLargeScreen = width >= 768;

  const containerWidth = isLargeScreen ? '70%' : isMediumScreen ? '85%' : '92%';
  const logoSize = isLargeScreen ? 28 : isMediumScreen ? 24 : 20;
  const brandTextSize = isLargeScreen ? 'text-5xl' : isMediumScreen ? 'text-4xl' : 'text-3xl';
  const titleSize = isLargeScreen ? 'text-3xl' : isMediumScreen ? 'text-2xl' : 'text-xl';
  const inputPadding = isLargeScreen ? 'p-4' : isMediumScreen ? 'p-3' : 'p-2.5';
  const inputTextSize = isLargeScreen ? 'text-lg' : isMediumScreen ? 'text-base' : 'text-sm';
  const buttonPadding = isLargeScreen ? 'py-4' : isMediumScreen ? 'py-3' : 'py-2.5';
  const buttonTextSize = isLargeScreen ? 'text-lg' : isMediumScreen ? 'text-base' : 'text-sm';

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<FormData>({
    defaultValues: {},
    mode: 'onTouched',
  });
  const router = useRouter();

  const closeDatePicker = () => {
    setShowDatePicker(false);
  };

  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    authService
      .register(data)
      .then((response) => {
        console.log('Registration successful:', response);
        Toast.show({ type: 'success', text1: 'Registration successful' });
        router.push('/auth/signin');
      })
      .catch((error: any) => {
        console.log('Registration error:', error);
        Toast.show({
          type: 'error',
          text1: 'Registration Failed',
          text2: error.message,
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const pickClearance = async (onChange: (file: DocumentPickerAsset | null) => void) => {
    if (isSubmitting) return;
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'image/*'],
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (result.assets && result.assets.length > 0) {
      onChange(result.assets[0]);
      setValue('clearance', result.assets[0], { shouldValidate: true });
      trigger('clearance');
    }
  };

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDate(date);
      const formattedDate = date.toISOString().split('T')[0];
      setValue('birthdate', formattedDate, { shouldValidate: true });
      trigger('birthdate');
    }
  };

  const formatDateForDisplay = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') return 'document-text';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) return 'image';
    return 'document';
  };

  return (
    <SplashLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="w-full flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            minHeight: height,
            paddingVertical: isSmallScreen ? 10 : isMediumScreen ? 20 : 30,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View className="w-full flex-1 items-center justify-center bg-transparent">
            <View
              className={`mb-${isLargeScreen ? '8' : isMediumScreen ? '6' : '4'} flex flex-row items-center justify-center gap-x-${isLargeScreen ? '6' : isMediumScreen ? '5' : '3'} pt-${isLargeScreen ? '10' : isMediumScreen ? '7' : '5'}`}>
              <Image
                source={BRAND_LOGO}
                className={`h-${logoSize} w-${logoSize}`}
                style={{ resizeMode: 'contain' }}
              />
              <View
                className={`flex flex-row justify-center gap-x-${isLargeScreen ? '3' : isMediumScreen ? '2' : '1'}`}>
                <Text className={`${brandTextSize} font-bold text-blue-800`}>BRGY</Text>
                <Text className={`${brandTextSize} font-bold text-red-600`}>KONEK</Text>
              </View>
            </View>
            <View
              className={`${containerWidth} items-center rounded-2xl bg-white p-${isLargeScreen ? '8' : isMediumScreen ? '6' : '4'} shadow-lg`}>
              <Text
                className={`mb-${isLargeScreen ? '8' : isMediumScreen ? '6' : '4'} ${titleSize} font-bold text-gray-800`}>
                REGISTER ACCOUNT
              </Text>
              <Controller
                control={control}
                name="name"
                rules={{ required: 'Full Name is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      onFocus={closeDatePicker}
                      placeholder="Full Name"
                      editable={!isSubmitting}
                      className={`mb-1 self-stretch rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-200'} ${isSubmitting ? 'bg-gray-100' : 'bg-gray-50'} ${inputPadding} ${inputTextSize}`}
                      placeholderTextColor="#9ca3af"
                    />
                    {errors.name && (
                      <Text
                        className={`mb-${isLargeScreen ? '4' : isMediumScreen ? '3' : '2'} self-stretch text-xs text-red-600`}>
                        {errors.name.message as string}
                      </Text>
                    )}
                  </>
                )}
              />
              <Controller
                control={control}
                name="birthdate"
                rules={{ required: 'Birthdate is required' }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <Pressable
                      disabled={isSubmitting}
                      className={`mb-1 self-stretch rounded-lg border ${errors.birthdate ? 'border-red-500' : 'border-gray-200'} ${isSubmitting ? 'bg-gray-100' : 'bg-gray-50'} ${inputPadding}`}
                      onPress={() => setShowDatePicker(true)}>
                      <Text
                        className={`${inputTextSize} ${selectedDate ? 'text-gray-900' : 'text-gray-500'}`}>
                        {selectedDate ? formatDateForDisplay(selectedDate) : 'mm / dd / yyyy'}
                      </Text>
                    </Pressable>
                    {errors.birthdate && (
                      <Text
                        className={`mb-${isLargeScreen ? '4' : isMediumScreen ? '3' : '2'} self-stretch text-xs text-red-600`}>
                        {errors.birthdate.message as string}
                      </Text>
                    )}
                    {showDatePicker && (
                      <DateTimePicker
                        value={selectedDate || new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleDateChange}
                        maximumDate={new Date()}
                        minimumDate={new Date(1900, 0, 1)}
                      />
                    )}
                  </>
                )}
              />
              <Controller
                control={control}
                name="address"
                rules={{ required: 'Address is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      onFocus={closeDatePicker}
                      placeholder="Address"
                      editable={!isSubmitting}
                      className={`mb-1 self-stretch rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-200'} ${isSubmitting ? 'bg-gray-100' : 'bg-gray-50'} ${inputPadding} ${inputTextSize}`}
                      placeholderTextColor="#9ca3af"
                    />
                    {errors.address && (
                      <Text
                        className={`mb-${isLargeScreen ? '4' : isMediumScreen ? '3' : '2'} self-stretch text-xs text-red-600`}>
                        {errors.address.message as string}
                      </Text>
                    )}
                  </>
                )}
              />
              <Controller
                control={control}
                name="email"
                rules={{ required: 'Email Address is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      onFocus={closeDatePicker}
                      placeholder="Email Address"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      editable={!isSubmitting}
                      className={`mb-1 self-stretch rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'} ${isSubmitting ? 'bg-gray-100' : 'bg-gray-50'} ${inputPadding} ${inputTextSize}`}
                      placeholderTextColor="#9ca3af"
                    />
                    {errors.email && (
                      <Text
                        className={`mb-${isLargeScreen ? '4' : isMediumScreen ? '3' : '2'} self-stretch text-xs text-red-600`}>
                        {errors.email.message as string}
                      </Text>
                    )}
                  </>
                )}
              />
              <Controller
                control={control}
                name="password"
                rules={{ required: 'Password is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      onFocus={closeDatePicker}
                      placeholder="Password"
                      secureTextEntry
                      editable={!isSubmitting}
                      className={`mb-1 self-stretch rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-200'} ${isSubmitting ? 'bg-gray-100' : 'bg-gray-50'} ${inputPadding} ${inputTextSize}`}
                      placeholderTextColor="#9ca3af"
                    />
                    {errors.password && (
                      <Text
                        className={`mb-${isLargeScreen ? '4' : isMediumScreen ? '3' : '2'} self-stretch text-xs text-red-600`}>
                        {errors.password.message as string}
                      </Text>
                    )}
                  </>
                )}
              />
              <Controller
                control={control}
                name="confirmPassword"
                rules={{ required: 'Confirm Password is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      onFocus={closeDatePicker}
                      placeholder="Confirm Password"
                      secureTextEntry
                      editable={!isSubmitting}
                      className={`mb-1 self-stretch rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} ${isSubmitting ? 'bg-gray-100' : 'bg-gray-50'} ${inputPadding} ${inputTextSize}`}
                      placeholderTextColor="#9ca3af"
                    />
                    {errors.confirmPassword && (
                      <Text
                        className={`mb-${isLargeScreen ? '4' : isMediumScreen ? '3' : '2'} self-stretch text-xs text-red-600`}>
                        {errors.confirmPassword.message as string}
                      </Text>
                    )}
                  </>
                )}
              />
              <Controller
                control={control}
                name="clearance"
                render={({ field: { value, onChange } }) => (
                  <>
                    <View className="mb-1 self-stretch">
                      {value && typeof value === 'object' && 'name' in value ? (
                        <View
                          className={`rounded-lg border ${errors.clearance ? 'border-red-500' : 'border-green-500'} ${isSubmitting ? 'bg-gray-100' : 'bg-green-50'} ${inputPadding}`}>
                          <View className="flex-row items-center justify-between">
                            <View className="flex-1 flex-row items-center">
                              <View
                                className={`mr-${isLargeScreen ? '4' : isMediumScreen ? '3' : '2'} rounded-full bg-green-100 p-${isLargeScreen ? '3' : isMediumScreen ? '2' : '1.5'}`}>
                                <Ionicons
                                  name={getFileIcon(value.name) as any}
                                  size={isLargeScreen ? 24 : isMediumScreen ? 20 : 18}
                                  color="#059669"
                                />
                              </View>
                              <View className="flex-1">
                                <Text
                                  className={`${inputTextSize} font-medium text-gray-900`}
                                  numberOfLines={1}>
                                  {value.name}
                                </Text>
                                <Text className="text-xs text-gray-500">
                                  {value.size ? formatFileSize(value.size) : 'Unknown size'}
                                </Text>
                              </View>
                            </View>
                            <Pressable
                              disabled={isSubmitting}
                              onPress={() => {
                                onChange(null);
                                setValue('clearance', null);
                              }}
                              className={`ml-${isLargeScreen ? '3' : isMediumScreen ? '2' : '1'} rounded-full bg-red-100 p-${isLargeScreen ? '2' : isMediumScreen ? '1.5' : '1'}`}>
                              <Ionicons
                                name="close"
                                size={isLargeScreen ? 18 : isMediumScreen ? 16 : 14}
                                color="#dc2626"
                              />
                            </Pressable>
                          </View>
                        </View>
                      ) : (
                        <Pressable
                          disabled={isSubmitting}
                          className={`flex-row items-center justify-center rounded-lg border-2 border-dashed ${errors.clearance ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'} ${isSubmitting ? 'opacity-50' : ''} p-${isLargeScreen ? '8' : isMediumScreen ? '6' : '4'}`}
                          onPress={() => {
                            closeDatePicker();
                            pickClearance(onChange);
                          }}>
                          <View className="items-center">
                            <View
                              className={`mb-${isLargeScreen ? '3' : isMediumScreen ? '2' : '1'} rounded-full bg-blue-100 p-${isLargeScreen ? '4' : isMediumScreen ? '3' : '2'}`}>
                              <Ionicons
                                name="cloud-upload"
                                size={isLargeScreen ? 28 : isMediumScreen ? 24 : 20}
                                color="#2563eb"
                              />
                            </View>
                            <Text
                              className={`text-center ${inputTextSize} font-medium text-gray-700`}>
                              Upload Barangay Clearance
                            </Text>
                            <Text
                              className={`mt-${isLargeScreen ? '2' : '1'} text-center text-xs text-gray-500`}>
                              PDF or Image files accepted
                            </Text>
                            <View
                              className={`mt-${isLargeScreen ? '3' : isMediumScreen ? '2' : '1'} flex-row items-center rounded-full bg-blue-600 px-${isLargeScreen ? '6' : isMediumScreen ? '4' : '3'} py-${isLargeScreen ? '3' : isMediumScreen ? '2' : '1.5'}`}>
                              <Ionicons
                                name="add"
                                size={isLargeScreen ? 18 : isMediumScreen ? 16 : 14}
                                color="white"
                              />
                              <Text
                                className={`ml-${isLargeScreen ? '2' : '1'} ${inputTextSize} font-medium text-white`}>
                                Choose File
                              </Text>
                            </View>
                          </View>
                        </Pressable>
                      )}
                    </View>
                    {errors.clearance && (
                      <Text
                        className={`mb-${isLargeScreen ? '4' : isMediumScreen ? '3' : '2'} self-stretch text-xs text-red-600`}>
                        {errors.clearance.message as string}
                      </Text>
                    )}
                  </>
                )}
              />
              <Pressable
                disabled={isSubmitting}
                className={`mt-${isLargeScreen ? '4' : isMediumScreen ? '3' : '2'} items-center self-stretch rounded-lg ${buttonPadding} ${isSubmitting ? 'bg-gray-400' : 'bg-[#333]'}`}
                onPress={handleSubmit(onSubmit)}>
                {isSubmitting ? (
                  <View className="flex-row items-center">
                    <ActivityIndicator
                      size="small"
                      color="white"
                      className={`mr-${isLargeScreen ? '3' : isMediumScreen ? '2' : '1'}`}
                    />
                    <Text className={`${buttonTextSize} font-bold text-white`}>REGISTERING...</Text>
                  </View>
                ) : (
                  <Text className={`${buttonTextSize} font-bold text-white`}>REGISTER ACCOUNT</Text>
                )}
              </Pressable>
              <Pressable
                disabled={isSubmitting}
                className={`mt-${isLargeScreen ? '4' : isMediumScreen ? '3' : '2'} items-center self-stretch rounded-lg border border-gray-300 ${buttonPadding} ${isSubmitting ? 'bg-gray-100' : 'bg-white'}`}
                onPress={() => router.push('/auth/signin')}>
                <Text
                  className={`${buttonTextSize} font-bold ${isSubmitting ? 'text-gray-400' : 'text-blue-700'}`}>
                  BACK TO SIGN-IN
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SplashLayout>
  );
};

export default CreateAccountPage;
