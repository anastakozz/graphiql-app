export const getJSON = async (language: string, page: string) => {
  try {
    const res = await import(`../localization/${language}.json`);
    return res[`${page}`];
  } catch (error) {
    console.error('Error loading JSON file:', error);
  }
};
