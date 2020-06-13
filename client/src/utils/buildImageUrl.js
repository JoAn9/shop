const host = 'localhost';
const port = '3000';

const buildImageUrl = productImg => {
  const imgName = productImg
    ?.split('/')
    .slice(-2)
    .join('/');
  const imgUrl = `http://${host}:${port}/${imgName}`;
  return imgUrl;
};

export default buildImageUrl;
