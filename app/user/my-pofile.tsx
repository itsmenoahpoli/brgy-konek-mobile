import { View, Text, TextInput, Image, Pressable } from 'react-native';
import { BRAND_LOGO } from '@/assets/images';
import { SplashLayout } from '@/components/layouts/SplashLayout';
import * as DocumentPicker from 'expo-document-picker';
import type { DocumentPickerAsset } from 'expo-document-picker';
import { useForm, Controller } from 'react-hook-form';

type FormData = {
  name: string;
  birthdate: string;
  address: string;
  email: string;
  password: string;
  confirmPassword: string;
  clearance: DocumentPickerAsset | null;
};

const MyProfile: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      birthdate: '',
      address: '',
      email: '',
      password: '',
      confirmPassword: '',
      clearance: null,
    },
    mode: 'onTouched',
  });

  const onSubmit = (data: any) => {
    // TODO: Implement profile update logic
  };

  const pickClearance = async (onChange: (file: DocumentPickerAsset | null) => void) => {
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

  return (
    <SplashLayout>
      <View className="w-full flex-1 items-center justify-center bg-transparent">
        <Image source={BRAND_LOGO} className="mb-6 h-32 w-32" style={{ resizeMode: 'contain' }} />
        <View className="mb-6 flex flex-row justify-center gap-x-2">
          <Text className="text-4xl font-bold text-blue-800">BRGY</Text>
          <Text className="text-4xl font-bold text-red-600">KONEK</Text>
        </View>
        <View className="w-[85%] items-center rounded-2xl bg-white p-6 shadow-lg">
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
                  placeholder="Full Name"
                  className={`mb-1 self-stretch rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-200'} bg-gray-50 p-3 text-base`}
                  placeholderTextColor="#9ca3af"
                />
                {errors.name && (
                  <Text className="mb-3 self-stretch text-xs text-red-600">
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
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Birthdate (YYYY-MM-DD)"
                  className={`mb-1 self-stretch rounded-lg border ${errors.birthdate ? 'border-red-500' : 'border-gray-200'} bg-gray-50 p-3 text-base`}
                  placeholderTextColor="#9ca3af"
                />
                {errors.birthdate && (
                  <Text className="mb-3 self-stretch text-xs text-red-600">
                    {errors.birthdate.message as string}
                  </Text>
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
                  placeholder="Address"
                  className={`mb-1 self-stretch rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-200'} bg-gray-50 p-3 text-base`}
                  placeholderTextColor="#9ca3af"
                />
                {errors.address && (
                  <Text className="mb-3 self-stretch text-xs text-red-600">
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
                  placeholder="Email Address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className={`mb-1 self-stretch rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'} bg-gray-50 p-3 text-base`}
                  placeholderTextColor="#9ca3af"
                />
                {errors.email && (
                  <Text className="mb-3 self-stretch text-xs text-red-600">
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
                  placeholder="Password"
                  secureTextEntry
                  className={`mb-1 self-stretch rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-200'} bg-gray-50 p-3 text-base`}
                  placeholderTextColor="#9ca3af"
                />
                {errors.password && (
                  <Text className="mb-3 self-stretch text-xs text-red-600">
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
                  placeholder="Confirm Password"
                  secureTextEntry
                  className={`mb-1 self-stretch rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} bg-gray-50 p-3 text-base`}
                  placeholderTextColor="#9ca3af"
                />
                {errors.confirmPassword && (
                  <Text className="mb-3 self-stretch text-xs text-red-600">
                    {errors.confirmPassword.message as string}
                  </Text>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="clearance"
            rules={{ required: 'Barangay Clearance is required' }}
            render={({ field: { value, onChange } }) => (
              <>
                <Pressable
                  className={`mb-1 flex-row items-center justify-between self-stretch rounded-lg border ${errors.clearance ? 'border-red-500' : 'border-gray-300'} bg-gray-50 px-3 py-3`}
                  onPress={() => pickClearance(onChange)}>
                  <Text className="text-base text-gray-700">
                    {value && typeof value === 'object' && 'name' in value
                      ? value.name
                      : 'Barangay Clearance (PDF or Image)'}
                  </Text>
                  <Text className="text-base font-medium text-blue-600">Upload</Text>
                </Pressable>
                {errors.clearance && (
                  <Text className="mb-3 self-stretch text-xs text-red-600">
                    {errors.clearance.message as string}
                  </Text>
                )}
              </>
            )}
          />
          <Pressable
            className="mt-2 items-center self-stretch rounded-lg bg-[#333] py-3"
            onPress={handleSubmit(onSubmit)}>
            <Text className="text-base font-bold text-white">UPDATE PROFILE</Text>
          </Pressable>
        </View>
      </View>
    </SplashLayout>
  );
};

export default MyProfile;
