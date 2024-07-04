import {
  Button,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {useAuthStore} from '../../store';
import Toast from 'react-native-toast-message';
import {COLORS} from '../../constants';
import {useState} from 'react';
import {ApiOne} from '../../lib';

export const SignInScreen = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const auth = useAuthStore();

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const res = await ApiOne.post('/auth/signin', {
        email,
        password,
      });
      const {data, message} = res.data;
      Toast.show({
        type: 'success',
        text1: message,
      });
      auth.signIn({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        user: data.user,
      });
      setIsLoading(false);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.response.data.message,
      });
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.heading}>Sign In</Text>
        <Text style={styles.subHeading}>
          Sign in to your account to continue
        </Text>
      </View>
      {/* form */}
      <View style={styles.form}>
        {/* email */}
        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Email"
            placeholderTextColor={COLORS.primary}
            style={styles.inputControl}
            //@ts-ignore
            onChangeText={email => setEmail(email)}
            value={email}
          />
        </View>
        {/* password */}
        <View style={styles.inputContainer}>
          <TextInput
            secureTextEntry
            placeholder="Password"
            placeholderTextColor={COLORS.primary}
            style={styles.inputControl}
            //@ts-ignore
            onChangeText={password => setPassword(password)}
            value={password}
          />
        </View>
        <Button
          title={isLoading ? 'Loading...' : 'Sign In'}
          onPress={handleSignIn}
        />
      </View>

      {/* footer */}
      <View style={styles.footer}>
        <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 40,
  },

  header: {
    alignItems: 'center',
  },

  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 10,
  },

  form: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },

  inputContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 25,
  },

  inputControl: {
    height: 40,
    width: '80%',
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: COLORS.primary,
  },

  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
});
