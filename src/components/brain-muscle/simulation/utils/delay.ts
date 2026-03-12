export const delay = (ms: number) => {
  return new Promise((res, rej) => {
    try {
      setTimeout(() => {
        return res('Went well');
      }, ms);
    } catch (error) {
      rej(error);
    }
  });
};
