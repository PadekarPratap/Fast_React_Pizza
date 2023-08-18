import axios from 'axios';

export const fetchAddress = async (latitude, longitude) => {
  const { data } = await axios.get(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`,
  );

    console.log("addressData", data)

    const address = `${data?.locality} ${data?.city} ${data?.countryName}`

    return address
};
