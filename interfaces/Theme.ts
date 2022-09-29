export interface ThemeState {
  colors: {
    primary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    text2: string;
    text3: string;
    disabled: string;
    placeholder: string;
    backdrop: string;
    onSurface: string;
    notification: string;
    white: string;
    link: string;
  };
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
