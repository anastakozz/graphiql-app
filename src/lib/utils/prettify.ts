export function prettifyString(input: string): string {
  const jsonString = input.replace(/\s/g, '');
  let formattedJson = '';
  let indentationLevel = 0;

  for (let i = 0; i < jsonString.length; i++) {
    const char = jsonString[i];

    if (char === '{') {
      formattedJson += ' {\n' + '  '.repeat(indentationLevel + 1);
      indentationLevel++;
      continue;
    } else if (char === '}') {
      indentationLevel--;
      formattedJson += '\n' + '  '.repeat(indentationLevel) + '}';
      continue;
    } else if (char === ':' && jsonString[i + 1] !== '{') {
      formattedJson += ': ';
      continue;
    }

    if (char === '\n') {
      if (i !== jsonString.length - 1 && jsonString[i + 1] === '\n') {
        continue;
      }
    }

    formattedJson += char;
  }

  return formattedJson.trim();
}
