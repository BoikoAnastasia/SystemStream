export const getRandomColor = () => {
  let r = Math.floor(Math.random() * 156) + 100; // 100-255
  let g = Math.floor(Math.random() * 156) + 100; // 100-255
  let b = Math.floor(Math.random() * 156) + 100; // 100-255

  // Преобразует десятичные числа в шестнадцатеричные
  // и добавляет "0" в начале, если число двузначное.
  let toHex = (c: number) => ('0' + c.toString(16)).slice(-2);

  return '#' + toHex(r) + toHex(g) + toHex(b);
};
