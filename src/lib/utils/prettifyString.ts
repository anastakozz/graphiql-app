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
    const regex = new RegExp(`(${keyword})(\\n)?`, 'gi');
    formattedString = formattedString.replace(regex, (match, p1) => {
      return match.replace(/\s*$/, '') + (p1 ? ' ' : '');
    });
  });

  return formattedString;
}

export function prettifyString(jsonString: string, isQuery = false): string {
  let formattedJson = '';
  let indentationLevel = 0;
  const symbols = /[a-zA-Z0-9]/;

  for (let i = 0; i < jsonString.length; i++) {
    const char = jsonString[i];
    const nextChar = jsonString[i + 1];
    const prevChar = formattedJson[formattedJson.length - 1];

    if (char === '\n') {
      continue;
    } else if (
      char === ' ' &&
      (nextChar === ' ' || prevChar === '{' || prevChar === '[' || prevChar === '\n')
    ) {
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
    if (isQuery && char === ' ' && symbols.test(prevChar) && symbols.test(nextChar)) {
      formattedJson += '\n' + '  '.repeat(indentationLevel);
      continue;
    }

    formattedJson += char;
  }

  return isQuery ? checkKeyWords(formattedJson) : formattedJson;
}
