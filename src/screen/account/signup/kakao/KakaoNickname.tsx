import {
  View,
  Text,
  Pressable,
  Keyboard,
  TextInput,
  Animated,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useEffect, useState} from 'react';

//components
import BackButton from '../../../../components/UI/BackButton';
import KeyboardDismiss from '../../../../components/UI/KeybordDismiss';
import {AppNavigationType} from '../../../../navigation/StackBase';
import {font} from '../../../../styles/globalStyles';
import NextButton from '../../../../components/UI/NextButton';
// file
import {bad} from '../../../../assets/js/bad-words';

// 3rd party
import {debounceTime, filter, tap, Subject, distinctUntilChanged} from 'rxjs';

// api
import authApiController from '../../../../api/controller/auth';
import {ios} from '../../../../styles/iosTheme';
import {useAppDispatch} from '../../../../store';
import authSlice from '../../../../slices/auth';

type Props = {
  navigation: AppNavigationType;
};

const KakaoNickname = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>('');
  const [isCharPassed, setIsCharPassed] = useState<boolean>(true);
  const [isEmojiPassed, setIsEmojiPaseed] = useState<boolean>(true);
  const [isStringPassed, setIsStringPassed] = useState<boolean>(true);
  const [isBadPassed, setIsBadPassed] = useState<boolean>(true);
  const [isDoublePassed, setIsDoublePassed] = useState<boolean | string>(
    'null',
  );
  const [isNextPossible, setIsNextPossible] = useState<boolean>(false);

  // 이모지체크
  const checkEmoji = (text: string) => {
    const pattern =
      /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]|\uffe6|\u20A9)/g;
    if (pattern.test(text)) {
      setIsEmojiPaseed(false);
    } else {
      setIsEmojiPaseed(true);
    }
  };

  // 특수기호체크
  const checkChar = (text: string) => {
    const pattern =
      /[+×÷=_<>!@#$%^&*\-'"":;,?~|{}€£¥《》¡¿,.|/`°•○●□■◇¤\\※≠≒ΨΩαβγδεζηθ∀∂∃∇∈∋∏∑◎∝∞∧∨∩∪∫˚∬∮∴∵≡≤≥≪≫⌒⊂⊃⊆¢⊇℃℉◐◆]/g;
    if (pattern.test(text)) {
      // 실패
      setIsCharPassed(false);
    } else {
      // 가능 ( ) [ ]
      setIsCharPassed(true);
    }
  };

  // 자모음체크
  const checkString = (text: string) => {
    const pattern = /[ㄱ-ㅎㅏ-ㅣ]/g;
    if (pattern.test(text)) {
      setIsStringPassed(false);
    } else {
      setIsStringPassed(true);
    }
  };

  // 불용어체크
  const stringIncludesIgnoreCase = (text: string, badword: string) => {
    const lowerText = text.toLowerCase();
    const lowerBadword = badword.toLocaleLowerCase();
    return lowerText.includes(lowerBadword);
  };

  const checkBadword = (text: string) => {
    for (let i = 0; i < bad.length; i++) {
      if (stringIncludesIgnoreCase(text, bad[i])) {
        return setIsBadPassed(false);
      }
    }
    setIsBadPassed(true);
  };

  const handleInputChange = (text: string) => {
    setName(text);
    nicknameSubject.next(text);
    checkEmoji(text);
    checkChar(text);
    checkString(text);
    checkBadword(text);
  };

  useEffect(() => {
    if (isDoublePassed === true) {
      if (isBadPassed && isEmojiPassed && isCharPassed && isStringPassed) {
        setIsNextPossible(true);
      }
    } else if (isDoublePassed === false) {
      setIsNextPossible(false);
    } else {
      setIsNextPossible(false);
    }
  }, [isDoublePassed]);

  useEffect(() => {
    if (!name.length) {
      setIsCharPassed(true);
      setIsEmojiPaseed(true);
      setIsStringPassed(true);
      setIsBadPassed(true);
      setIsDoublePassed('null');
    }
  }, [name]);

  const [nicknameSubject] = useState(() => new Subject<string>());
  useEffect(() => {
    const subscriber = nicknameSubject
      .pipe(
        debounceTime(1000),
        filter(text => !!text),
      )
      .subscribe(async text => {
        setIsDoublePassed('null');
        const payload = {
          nickname: text,
        };
        const response = await authApiController['7'](payload);
        if (response?.existence) {
          setIsDoublePassed(false);
        } else {
          setIsDoublePassed(true);
        }
      });
    return () => subscriber.unsubscribe();
  }, []);

  const [shakeAnimation] = useState(new Animated.Value(0));
  const startShakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: false,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: false,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: false,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handleNextPage = () => {
    dispatch(authSlice.actions.setNickname({nickname: name}));
    navigation.navigate('KakaoInterest');
  };

  const [nextButtonText] = useState('다음');
  return (
    <KeyboardDismiss>
      <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
        {/* 뒤로가기버튼 */}
        <BackButton navigation={navigation} />

        <Animated.View
          style={[
            {marginTop: 35, paddingHorizontal: 32},
            {transform: [{translateX: shakeAnimation}]},
          ]}>
          <Text
            style={{
              fontSize: 20,
              lineHeight: 30,
              fontFamily: font.preReg,
              color: '#000000',
            }}>
            카카오{'\n'}
            오이에서 사용할{'\n'}
            닉네임을 입력해주세요
          </Text>
        </Animated.View>

        <Pressable style={{paddingHorizontal: 32, paddingVertical: 16}}>
          <TextInput
            keyboardType="default"
            maxLength={8}
            value={name}
            onChangeText={handleInputChange}
            style={{
              height: 48,
              borderColor: '#F2F2F2',
              backgroundColor: '#F2F2F2',
              borderWidth: 1,
              paddingLeft: 16,
            }}
          />
          <Text
            style={{
              position: 'absolute',
              right: 48,
              height: '100%',
              marginTop: 16,
              textAlign: 'center',
              textAlignVertical: 'center',
              lineHeight: 48, // 높이와 동일하게 설정
            }}>
            {name.length} / 8
          </Text>
        </Pressable>

        <View style={{paddingHorizontal: 32}}>
          {!isCharPassed && (
            <Text>특수기호는 {'( ) [ ] 만 사용할 수 있어요'}</Text>
          )}
          {!isEmojiPassed && <Text>이모티콘은 사용할 수 없어요</Text>}
          {!isStringPassed && <Text>자음 또는 모음만 사용할 수 없어요</Text>}
          {!isBadPassed && <Text>부적절한 단어를 포함하고 있어요</Text>}
          {isDoublePassed === false && !!name && (
            <Text>사용하고 있는 닉네임이에요</Text>
          )}
        </View>

        <NextButton
          isNextPossible={isNextPossible}
          handleNextPage={handleNextPage}
          nextButtonText={nextButtonText}
          shakeAnimation={startShakeAnimation}
        />
      </SafeAreaView>
    </KeyboardDismiss>
  );
};

export default KakaoNickname;
