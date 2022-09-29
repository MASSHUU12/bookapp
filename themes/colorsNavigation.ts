export const colorsNavigation = (isDark = false) => {
  const c = {
    /** Whether this is a dark theme or a light theme */
    dark: isDark,
    colors: {
      /** The primary color of the app used to tint various elements. Usually you'll want to use your brand color for this. */
      primary: isDark ? '#fff' : '#355070',
      /** The color of various backgrounds, such as background color for the screens. */
      background: isDark ? '#000' : '#F8F8F8',
      /** The background color of card-like elements, such as headers, tab bars etc. */
      card: isDark ? '#1c1c1e' : '#FFFFFF',
      /** The text color of various elements. */
      text: isDark ? '#fff' : '#6D6D6D',
      /** The color of borders, e.g. header border, tab bar border etc. */
      border: isDark ? '#fff' : '#000',
      /** The color of Tab Navigator badge. */
      notification: isDark ? '#fff' : '#5B5B5B',
    },
  };
  return c;
};
