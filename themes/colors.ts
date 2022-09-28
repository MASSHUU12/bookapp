export const colors = (isDark = false) => {
  return {
    colors: {
      primary: isDark ? '#000' : '#fff', // Primary color.
      accent: isDark ? '#000' : '#fff', // Secondary color.
      background: isDark ? '#1c1c1e' : '#F8F8F8', // Background color for pages.
      surface: isDark ? '#000' : '#F2F2F2', // Background color for elements containing content, such as cards.
      text: isDark ? '#fff' : '#000', // Text color for content.
      disabled: isDark ? '#fff' : '#000', // Color for disabled elements.
      placeholder: isDark ? '#fff' : '#9F9F9F', // Color for placeholder text.
      backdrop: isDark ? '#000' : '#fff', // Color for backdrops of various components such as modals.
      onSurface: isDark ? '#000' : '#fff', // Background color for snackbars.
      notification: isDark ? '#000' : '#fff', // Background color for badges.
    },
  };
};
