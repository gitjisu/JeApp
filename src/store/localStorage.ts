import EncryptedStorage from 'react-native-encrypted-storage/lib/typescript/EncryptedStorage';

const getItem = async (key: string, value: any) => {
  return EncryptedStorage.getItem(key.toString()).then(value => {
    return value;
  });
};

const setItem = async (key: string, value: any) => {
  return EncryptedStorage.setItem(key, value);
};

export default {getItem, setItem};
