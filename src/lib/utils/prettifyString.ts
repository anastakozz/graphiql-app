export function prettifyString(jsonString: string): string {
  let formattedJson = '';
  let indentationLevel = 0;

  for (let i = 0; i < jsonString.length; i++) {
    const char = jsonString[i];
    const nextChar = jsonString[i + 1];

    if (char === '\n') {
      continue;
    } else if (char === ' ' && nextChar === ' ') {
      continue;
    } else if (char === '{' || char === '[') {
      const chunk = `${char}\n` + '  '.repeat(indentationLevel + 1);
      formattedJson += formattedJson.endsWith(' ') ? chunk : ' ' + chunk;
      indentationLevel++;
      continue;
    } else if (char === '}' || char === ']') {
      indentationLevel--;
      formattedJson += '\n' + '  '.repeat(indentationLevel) + `${char}`;
      continue;
    } else if (char === ':') {
      formattedJson += ': ';
      continue;
    } else if (char === ',') {
      formattedJson += ',' + '\n' + '  '.repeat(indentationLevel);
      continue;
    }

    formattedJson += char;
  }

  return formattedJson.trim();
}
