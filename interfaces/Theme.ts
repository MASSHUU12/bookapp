import { ColorsType } from 'types/colors';

export interface ThemeState {
  colors: ColorsType;
}

export interface ThemeNavigation {
  value: {
    dark: boolean;
    colors: {
      primary: string;
      background: string;
      card: string;
      text: string;
      border: string;
      notification: string;
    };
  };
}
