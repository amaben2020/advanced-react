import { useState } from 'react';
export function PhoneNumberInput() {
  const [phoneNumber, setPhoneNumber] = useState(undefined);

  const handleInput = (e) => {
    const numericValues = /\D/g;
    let inputText = String(e.target.value).trim().replace(numericValues, '');
    console.log('inputText', inputText);
    const maxTenWords = inputText.slice(0, 10);

    const result = formatText(maxTenWords);

    console.log('result', result);
    setPhoneNumber(result);
  };

  // your code here
  return (
    <input
      data-testid="phone-number-input"
      value={phoneNumber}
      onChange={handleInput}
    />
  );
}

// if you want to try your code on the right panel
// remember to export App() component like below

export function App() {
  return (
    <div>
      <PhoneNumberInput />
    </div>
  );
}

const formatText = (string) => {
  let result;

  if (string.length) {
    result = string
      .split('')
      .map((s, i) => {
        if (i === 0 && string.length > 3) {
          return '(' + s;
        }

        if (i === 2 && string.length > 3) {
          return s + ')';
        }

        if (i === 5 && string.length > 6) {
          return s + '-';
        }

        return s;
      })
      .join('');
  }
  return result ?? '';
};
