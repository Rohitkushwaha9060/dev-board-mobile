import {Button, Image, Text, View} from 'react-native';
import {useAuthStore} from '../../store';

export const HomeScreen = ({navigation}: {navigation: any}) => {
  const auth = useAuthStore(state => state.auth);
  const signOut = useAuthStore(state => state.signOut);
  console.log(auth?.user?.avatar?.url);

  return (
    <View>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>
        {auth.user?.name}
      </Text>
      <Image source={{uri: auth?.user?.avatar?.url}} width={100} height={100} />
      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  );
};
