import { BASE_URL } from './settings';

const buildImageUrl = productImg => {
  const imgName = productImg
    ?.split('/')
    .slice(-2)
    .join('/');
  const imgUrl = `${BASE_URL}/${imgName}`;
  return imgUrl;
};

export default buildImageUrl;
