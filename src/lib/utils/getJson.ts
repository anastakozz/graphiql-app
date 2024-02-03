const getJSON = async (language: string) => {
  try {
    const res = await import(`../../localization/${language}.json`);
    return res;
  } catch {}
};

export default getJSON;
