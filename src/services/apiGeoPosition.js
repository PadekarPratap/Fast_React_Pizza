import axios from 'axios';
// `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`,

export const fetchAddress = async (latitude, longitude) => {
  const { data } = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=b2fbbb1ee17b4bd59f44cff1a6a7348b`,
  );

  console.log('addressData', data);

  const address = data.results[0].formatted;

  return address;
};
