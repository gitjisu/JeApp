// MAJOR 정렬
export function filterRegionKeysEndingWith00(data: {[key: string]: any}): {
  [key: string]: any;
} {
  const filteredData: {[key: string]: any}[] = [];

  Object.keys(data).forEach(key => {
    if (key.endsWith('00')) {
      filteredData.push({[key]: data[key]});
    }
  });

  return filteredData;
}

// MINOR 찾기 : MAJOR 코드 던져주세요
export function filterMinorRegionByMajorCode(
  code: string,
  data: {[key: string]: any},
): {
  [key: string]: any;
} {
  const majorCode = code.slice(0, 2); // Extract the first two characters
  const filteredData: {[key: string]: any}[] = [];

  const filteredRegions = Object.keys(data).filter(
    regionCode =>
      regionCode.startsWith(majorCode) && !regionCode.endsWith('00'),
  );

  filteredRegions.forEach(regionCode => {
    filteredData.push({[regionCode]: data[regionCode]});
  });

  return filteredData;
}
