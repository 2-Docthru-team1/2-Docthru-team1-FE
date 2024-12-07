import { format } from 'date-fns';
import { useEffect, useState } from 'react';

enum Formatter {
  Date = 'Date',
  Number = 'Number'
}

const formatData = (type: Formatter, value: unknown): string => {
  switch (type) {
    case Formatter.Date:
      if (typeof value === 'string' || value instanceof Date) {
        return format(new Date(value), 'yy/MM/dd HH:mm');
      }
      throw new Error('Invalid value for Date formatter');
    case Formatter.Number:
      if (typeof value === 'number') {
        return value.toLocaleString();
      }
      throw new Error('Invalid value for Number formatter');
    default:
      throw new Error('Unsupported formatter type');
  }
};

const useFormatter = (type: Formatter, value: unknown): string => {
  const [formattedValue, setFormattedValue] = useState<string>('');

  useEffect(() => {
    try {
      const result = formatData(type, value);
      setFormattedValue(result);
    } catch (error) {
      setFormattedValue('Error formatting value');
    }
  }, [type, value]);
  return formattedValue;
};

export { Formatter, useFormatter };
