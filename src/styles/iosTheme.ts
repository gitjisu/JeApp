import {IOS} from './iosTypes';
import {getBottomInset} from 'rn-iphone-helper';
export const ios: IOS = {
  BOTTOM_INDICATOR_HEIGHT: getBottomInset(),
};
