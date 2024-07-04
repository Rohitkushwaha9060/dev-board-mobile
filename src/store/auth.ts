import {create} from 'zustand';
import {MMKV} from 'react-native-mmkv';
import {createJSONStorage, persist, StateStorage} from 'zustand/middleware';

const storage = new MMKV({
  id: 'auth',
});

const zustandStorage: StateStorage = {
  setItem: (key, value) => storage.set(key, value),
  getItem: key => storage.getString(key) || null,
  removeItem: key => storage.delete(key),
};

interface User {
  name: string;

  avatar: {
    url: string;
    public_id: string;
  };
  role: string;
  email: string;
}
interface AuthState {
  auth: {
    isAuth: boolean;
    accessToken: string;
    refreshToken: string;
    user: User;
  };
  signIn: (data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  }) => void;
  signOut: () => void;
}

let initialState = {
  isAuth: false,
  accessToken: '',
  refreshToken: '',
  user: {
    name: '',
    avatar: {
      url: '',
      public_id: '',
    },
    role: '',
    email: '',
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      auth: initialState,
      signIn: data =>
        set(() => ({
          auth: {
            isAuth: true,
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          },
        })),
      signOut: () => set(() => ({auth: initialState})),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
