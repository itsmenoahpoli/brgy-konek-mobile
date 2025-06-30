import { View, Text, TextInput, Image, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { BRAND_LOGO } from '@/assets/images';
import { SplashLayout } from '@/components';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import authService from '../../services/auth.service';

const ForgotPasswordPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: '',
    },
    mode: 'onTouched',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword(data.email);
      setIsSubmitted(true);
      setCountdown(60);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    const email = control._formValues.email;
    if (!email) return;

    setIsLoading(true);
    try {
      await authService.forgotPassword(email);
      setCountdown(60);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SplashLayout>
      <View className="w-full flex-1 items-center justify-center bg-transparent">
        <Image source={BRAND_LOGO} className="mb-6 h-48 w-48" style={{ resizeMode: 'contain' }} />
        <View className="mb-6 flex flex-row justify-center gap-x-2">
          <Text className="text-4xl font-bold text-blue-800">BRGY</Text>
          <Text className="text-4xl font-bold text-red-600">KONEK</Text>
        </View>
        <View className="w-[85%] items-center rounded-2xl bg-white p-6 shadow-lg">
          <Text className="mb-4 text-center text-xl font-bold text-gray-800">Forgot Password</Text>

          <Text className="mb-6 text-center text-sm leading-5 text-gray-600">
            Enter your registered email address below. We'll send you a password reset link that
            will allow you to create a new password for your account.
          </Text>

          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email Address is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address',
              },
            }}
            render={({ field: { onChange, value, onBlur } }) => (
              <>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Enter your email address"
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

          <Pressable
            className={`mt-4 items-center self-stretch rounded-lg py-3 ${isLoading ? 'bg-gray-400' : 'bg-[#333]'}`}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}>
            <Text className="text-base font-bold text-white">
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Text>
          </Pressable>

          {isSubmitted && (
            <View className="mt-2 w-full items-center">
              <Text className="mb-3 text-center text-sm text-green-600">
                Reset link sent! Check your email for instructions.
              </Text>

              <Pressable
                className={`items-center self-stretch rounded-lg border py-3 ${countdown > 0 || isLoading ? 'border-gray-300 bg-gray-100' : 'border-blue-500 bg-white'}`}
                onPress={handleResend}
                disabled={countdown > 0 || isLoading}>
                <Text
                  className={`text-base font-bold ${countdown > 0 || isLoading ? 'text-gray-400' : 'text-blue-600'}`}>
                  {countdown > 0 ? `Resend in ${formatTime(countdown)}` : 'Resend Email'}
                </Text>
              </Pressable>
            </View>
          )}

          <Pressable
            className="mt-4 items-center self-stretch rounded-lg border border-gray-300 bg-white py-3"
            onPress={() => router.back()}>
            <Text className="text-base font-bold text-black">Back to Sign In</Text>
          </Pressable>
        </View>
      </View>
    </SplashLayout>
  );
};

export default ForgotPasswordPage;
