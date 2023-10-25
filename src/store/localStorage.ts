import EncryptedStorage from "react-native-encrypted-storage";

export const getItem = async (key: string) => {
  try {
    const value = await EncryptedStorage.getItem(key);
    return value;
  } catch (error) {
    console.error('오류 발생:', error);
    throw error; // 오류를 호출한 곳으로 전파
  }
};

export const setItem = async (key: string, value: any) => {
  try {
    await EncryptedStorage.setItem(key, value);
  } catch (error) {
    console.error('오류 발생:', error);
    throw error; // 오류를 호출한 곳으로 전파
  }
};
