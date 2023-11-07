import {Dimensions, Image} from 'react-native';
import {fontTheme, layoutTheme} from './globalTypes';

import {useWindowDimensions} from 'react-native';
import {useResponsiveFontSize} from 'react-native-responsive-dimensions';

const FIGMA_WINDOW_WIDTH = 360;
const FIGMA_WINDOW_HEIGHT = 800;

export function widthPercentage2(width: number): number {
  const percentage = (width / FIGMA_WINDOW_WIDTH) * 100;
  return useResponsiveScreenWidth(percentage);
}

export function heightPercentage2(height: number): number {
  const percentage = (height / FIGMA_WINDOW_HEIGHT) * 100;
  return useResponsiveScreenHeight(percentage);
}

export function fontPercentage2(size: number): number {
  const percentage = size * 0.135;
  return useResponsiveFontSize(percentage);
}

const percentageCalculation = (max: number, val: number) => max * (val / 100);

const useResponsiveScreenWidth = (w: number) => {
  // console.log('아무거나')
  const {width} = useWindowDimensions();
  return percentageCalculation(width, w);
};

const useResponsiveScreenHeight = (h: number) => {
  const {height} = useWindowDimensions();
  return percentageCalculation(height, h);
};
export const font: fontTheme = {
  preBold: 'Pretendard-Bold',
  preReg: 'Pretendard-Regular',
  cafeBold: 'Cafe24Ohsquare',
};

export const layout: layoutTheme = {
  flex1: 1,
};

// 세로모드 , 폴더블의 상태변화에 따른 비율 유지
