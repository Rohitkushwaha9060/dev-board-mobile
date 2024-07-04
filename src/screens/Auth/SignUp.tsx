import {
  Button,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {COLORS} from '../../constants';
import {useState} from 'react';
import {ApiOne} from '../../lib';

export const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const res = await ApiOne.post('/auth/signup', {
        name,
        email,
        phone,
        password,
      });
      const {message} = res.data;
      Toast.show({
        type: 'success',
        text1: message,
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
        <Text style={styles.heading}>Sign Up</Text>
        <Text style={styles.subHeading}>Sign Up to Start a New Journey</Text>
      </View>
      {/* form */}
      <View style={styles.form}>
        {/* name */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Name"
            placeholderTextColor={COLORS.primary}
            style={styles.inputControl}
            //@ts-ignore
            onChangeText={name => setName(name)}
            value={name}
          />
        </View>
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
        {/* phone */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Phone"
            placeholderTextColor={COLORS.primary}
            style={styles.inputControl}
            //@ts-ignore
            onChangeText={phone => setPhone(phone)}
            value={phone}
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
          title={isLoading ? 'Loading...' : 'Sign Up'}
          onPress={handleSignIn}
        />
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
});
