import { View, Text, TextInput, Image, Pressable } from 'react-native';
import { useState } from 'react';
import { BRAND_LOGO } from '@/assets/images';
import { SplashLayout } from '@/components';
import { useRouter } from 'expo-router';

const userTypes = [
  { label: 'Resident', value: 'resident' },
  { label: 'Staff', value: 'staff' },
  { label: 'Admin', value: 'admin' },
];

const SigninPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('resident');
  const router = useRouter();

  return (
    <SplashLayout>
      <View className="w-full flex-1 items-center justify-center bg-transparent">
        <Image source={BRAND_LOGO} className="mb-6 h-48 w-48" style={{ resizeMode: 'contain' }} />
        <View className="mb-6 flex flex-row justify-center gap-x-2">
          <Text className="text-4xl font-bold text-blue-800">BRGY</Text>
          <Text className="text-4xl font-bold text-red-600">KONEK</Text>
        </View>
        <View className="w-[85%] items-center rounded-2xl bg-white p-6 shadow-lg">
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email Address"
            keyboardType="email-address"
            autoCapitalize="none"
            className="mb-4 self-stretch rounded-lg border border-gray-200 bg-gray-50 p-3 text-base"
            placeholderTextColor="#9ca3af"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
            className="mb-1 self-stretch rounded-lg border border-gray-200 bg-gray-50 p-3 text-base"
            placeholderTextColor="#9ca3af"
          />
          <View className="mb-4 w-full items-end">
            <Text className="text-base font-medium text-blue-600">Forgot password?</Text>
          </View>
          <View className="mb-5 w-full flex-row items-center justify-center">
            {userTypes.map((type) => (
              <Pressable
                key={type.value}
                onPress={() => setUserType(type.value)}
                className="mx-2 flex-row items-center">
                <View
                  className={`h-5 w-5 rounded border ${userType === type.value ? 'border-green-600 bg-green-600' : 'border-gray-300 bg-white'} mr-1.5 items-center justify-center`}>
                  {userType === type.value && <View className="h-3 w-3 rounded bg-white" />}
                </View>
                <Text className="text-base text-gray-800">{type.label}</Text>
              </Pressable>
            ))}
          </View>
          <Pressable className="items-center self-stretch rounded-lg bg-[#333] py-3">
            <Text className="text-base font-bold text-white">SIGN IN TO DASHBOARD</Text>
          </Pressable>
          <Pressable
            className="mt-3 items-center self-stretch rounded-lg border border-gray-300 bg-white py-3"
            onPress={() => router.push('/auth/create-account')}>
            <Text className="text-base font-bold text-black">REGISTER FOR AN ACCOUNT</Text>
          </Pressable>
        </View>
      </View>
    </SplashLayout>
  );
};

export default SigninPage;
