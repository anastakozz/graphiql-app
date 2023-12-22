export function checkKeyWords(input: string): string {
  const keywords = [
    'query',
    'mutation',
    'subscription',
    'fragment',
    'schema',
    'type',
    'input',
    'enum',
    'interface',
    'union',
  ];
  let formattedString = input;

  keywords.forEach((keyword) => {
    const regex = new RegExp(`(${keyword})(?!\\s)`, 'g');
    formattedString = formattedString.replace(regex, `$1 `);
  });

  return formattedString;
}

export function prettifyString(input: string): string {
  const jsonString = input.replace(/\s/g, '');
  let formattedJson = '';
  let indentationLevel = 0;

  for (let i = 0; i < jsonString.length; i++) {
    const char = jsonString[i];

    if (char === '{' || char === '[') {
      const chunk = `${char}\n` + '  '.repeat(indentationLevel + 1);
      formattedJson += chunk;
      indentationLevel++;
      continue;
    } else if (char === '}' || char === ']') {
      indentationLevel--;
      formattedJson += '\n' + '  '.repeat(indentationLevel) + `${char}`;

      if (jsonString[i + 1] !== '}' && jsonString[i + 1] !== ']' && jsonString[i + 1] !== ',') {
        formattedJson += '\n' + '  '.repeat(indentationLevel);
      }
      continue;
    } else if (char === ':') {
      formattedJson += ': ';
      continue;
    } else if (char === ',') {
      formattedJson += ',' + '\n' + '  '.repeat(indentationLevel);
      continue;
    }

    if (char === '\n') {
      if (i !== jsonString.length - 1 && jsonString[i + 1] === '\n') {
        continue;
      }
    }

    formattedJson += char;
  }

  return checkKeyWords(formattedJson.trim());
}
