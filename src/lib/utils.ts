import { ISetErrors, ISetInputLabels } from "./interfaces.ts";

export const getJSON = async (language: string, page: string) => {
  try {
    const res = await import(`../localization/${language}.json`);
    return res[`${page}`];
  } catch (error) {
    console.error('Error loading JSON file:', error);
  }
};

export const setErrors = async ({language, error, setCurrentError, fieldType}: ISetErrors) => {
  const localizationObject = await getJSON(language, 'authorization');
  if (error) {
    setCurrentError(localizationObject.errors[fieldType][error]);
  } else setCurrentError('')
};

export async function setInputLabel({setLabelName, component, language}: ISetInputLabels) {
  const labNameObj = await getJSON(language, 'authorization')
  setLabelName(labNameObj.inputsTitle[component]);
}
