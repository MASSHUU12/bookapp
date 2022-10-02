import AsyncStorage from '@react-native-async-storage/async-storage';

/** Get item from AsyncStorage. */
export const getItem = async (name: string): Promise<string | null> => {
  return await AsyncStorage.getItem(name);
};

/** Set item in AsyncStorage. */
export const setItem = async (name: string, content: string): Promise<void> => {
  return await AsyncStorage.setItem(name, content);
};
