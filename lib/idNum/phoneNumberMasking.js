const phoneNumberMasking = (number) => {
  const pat = /(\d{3})\d*(\d{4})/;
  return number?.toString().replace(pat, '$1****$2');
};
export default phoneNumberMasking;