import { FC } from 'react';
import styles from './CountrySelector.module.scss';

const COUNTRIES = [
  { code: 'us', name: 'United States' },
  { code: 'gb', name: 'United Kingdom' },
  { code: 'ru', name: 'Russia' },
  // Добавьте другие страны по необходимости
];

interface CountrySelectorProps {
  value: string;
  onChange: (country: string) => void;
}

export const CountrySelector: FC<CountrySelectorProps> = ({ value, onChange }) => {
  return (
    <select 
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {COUNTRIES.map(({ code, name }) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
}; 