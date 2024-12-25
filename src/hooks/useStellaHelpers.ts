const zodiacSigns = [
  { id: '0796176d-8d17-4e0d-8c50-138f2beb60ec', start: '02-19', end: '03-20' },
  { id: '2f1cf84f-828c-4d43-9393-730410c6beb4', start: '01-20', end: '02-18' },
  { id: '3bc8f1f1-f5a3-4d16-936a-66e011201adf', start: '03-21', end: '04-19' },
  { id: '3fa104df-19e4-4864-83ac-b5a6b3e4a05b', start: '04-20', end: '05-20' },
  { id: '489b37ee-5435-4cb8-813d-7827a9aa37f0', start: '05-21', end: '06-20' },
  { id: '50adecf9-1c3d-4e0b-8f4e-dfac24dee14c', start: '06-21', end: '07-22' },
  { id: '5f3b9201-51f1-4924-ad1e-462e7abdad5c', start: '07-23', end: '08-22' },
  { id: '60f1b661-d592-447d-991b-1faacf1e9351', start: '08-23', end: '09-22' },
  { id: '639d73d5-8fd4-49f6-96f9-728c63de26dd', start: '09-23', end: '10-22' },
  { id: '7b9f0220-5b4f-46fc-b568-0c73346c1d6f', start: '10-23', end: '11-21' },
  { id: 'a3e06765-2e0e-49a0-885e-85c890dbb168', start: '11-22', end: '12-21' },
  { id: 'ba84f353-766b-454e-8d97-46792ccf2dde', start: '12-22', end: '01-19' }
];

export const getStellaId = (birthDate: Date): string => {
  const monthDay = birthDate.toISOString().slice(5, 10); // "MM-DD" 형식으로 변환

  for (const zodiac of zodiacSigns) {
    if (
      (monthDay >= zodiac.start && monthDay <= zodiac.end) || // 범위 내인지 확인
      (zodiac.start > zodiac.end && (monthDay >= zodiac.start || monthDay <= zodiac.end)) // 연도를 넘어가는 경우 처리
    ) {
      return zodiac.id; // 해당 별자리를 UUID 반환환
    }
  }

  throw new Error('별자리를 찾을 수 없습니다.');
};
