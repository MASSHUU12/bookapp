import { ThemeState } from 'interfaces/Theme';

export const colors = (isDark = false) => {
  const c: ThemeState = {
    colors: {
      /** Primary color. */
      primary: isDark ? '#000' : '#fff',
      /** Secondary color. */
      accent: isDark ? '#000' : '#d6e9ee',
      /** Background color for pages. */
      background: isDark ? '#1c1c1e' : '#F8F8F8',
      /** Background color for elements containing content, such as cards. */
      surface: isDark ? '#000' : '#F2F2F2',
      /** Text color for content. */
      text: isDark ? '#fff' : '#000',
      /** Text color for content. */
      text2: isDark ? '#fff' : '#5B5B5B',
      /** Text color for content. */
      text3: isDark ? '#fff' : '#979595',
      /** Text color for content. */
      text4: isDark ? '#fff' : '#28373E',
      /** Color for disabled elements. */
      disabled: isDark ? '#fff' : '#000',
      /** Color for placeholder text. */
      placeholder: isDark ? '#fff' : '#9F9F9F',
      /** Color for backdrops of various components such as modals. */
      backdrop: isDark ? '#000' : '#fff',
      /** Background color for snackbars. */
      onSurface: isDark ? '#000' : '#fff',
      /** Background color for badges. */
      notification: isDark ? '#000' : '#fff',
      white: isDark ? '#fff' : '#fff',
      link: isDark ? '#fff' : '#597CF3',
      textBtn: isDark ? '#fff' : '#2487AF',
      optionsBtn: isDark ? '#fff' : '#E5EFF3',
    },
  };
  return c;
};
