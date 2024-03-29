function checkKeyWords(input: string): string {
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

function checkBrackets(input: string): string {
  let result = '';
  let insideParentheses = false;

  for (let i = 0; i < input.length; i++) {
    const char = input.charAt(i);
    const nextChar = input[i + 1];
    const prevChar = result[result.length - 1];

    if (char === '(') {
      insideParentheses = true;
    } else if (char === ')') {
      insideParentheses = false;
    }

    if (insideParentheses) {
      if (char === '\n') {
        continue;
      } else if (
        char === ' ' &&
        (nextChar === ' ' || nextChar === ']' || prevChar === ' ' || prevChar === '[')
      ) {
        continue;
      }
    }

    result += char;
  }

  return result;
}

export function prettifyString(inputString: string, isQuery = false): string {
  const input = inputString.replace(/\t/g, ' ').replace(/\n/g, ' ');
  let formattedJson = '';
  let indentationLevel = 0;
  const symbols = /[a-zA-Z0-9]/;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const nextChar = input[i + 1];
    const prevChar = formattedJson[formattedJson.length - 1];

    if (char === ' ' && (nextChar === ' ' || prevChar === ' ')) {
      continue;
    } else if (char === '{' || char === '[') {
      const chunk = `${char}\n` + '  '.repeat(indentationLevel + 1);
      formattedJson += formattedJson.endsWith(' ') ? chunk : ' ' + chunk;
      indentationLevel++;
      continue;
    } else if (char === '}' || char === ']') {
      indentationLevel--;
      formattedJson += '\n' + '  '.repeat(indentationLevel) + `${char}`;
      if (symbols.test(nextChar)) {
        formattedJson += '\n' + '  '.repeat(indentationLevel);
      }
      continue;
    } else if (char === ':') {
      formattedJson += ': ';
      continue;
    } else if (char === ',' && !symbols.test(prevChar)) {
      formattedJson += ',' + '\n' + '  '.repeat(indentationLevel);
      continue;
    }

    if (
      isQuery &&
      char === ' ' &&
      (symbols.test(prevChar) || prevChar === ('}' || ']')) &&
      symbols.test(nextChar)
    ) {
      formattedJson += '\n' + '  '.repeat(indentationLevel);
      continue;
    }

    formattedJson += char;
  }

  const result = isQuery ? checkKeyWords(formattedJson.trim()) : formattedJson.trim();

  return checkBrackets(result);
}
