import axios from 'axios';

export const getAllCountries = async () => {
  try {
    const countryRes = axios.get(
      'https://countriesnow.space/api/v0.1/countries/flag/images'
    );
    return (await countryRes).data;
  } catch (error) {
    console.error(error);
  }
};

export function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
