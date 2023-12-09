export const getJSON = async (language: string) => {
  try {
    const res = await import(`../localization/${language}.json`);
    return res;
  } catch (error) {
    console.error('Error loading JSON file:', error);
  }
};
