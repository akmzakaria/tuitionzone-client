// Theme Configuration - Change colors here to update the entire site
export const theme = {
  colors: {
    primary: '#1B263B', // Navy Blue
    secondary: '#F4D35E', // Bright Gold/Amber
    background: '#F8F9FA', // Off-White/Light Grey
    action: '#415A77', // Royal Blue
    accent: '#E8D5B7', // Light gold for subtle backgrounds
    text: '#1B263B', // Navy blue for text
    lightText: '#676E7E', // Medium blue-gray for secondary text
  },
}

// Tailwind className objects for easy use
export const themeClasses = {
  header: `bg-[${theme.colors.primary}] border-b-4 border-[${theme.colors.secondary}]`,
  banner: `bg-gradient-to-r from-[${theme.colors.primary}] to-[${theme.colors.action}]`,
  button: `bg-[${theme.colors.action}] hover:bg-[${theme.colors.primary}] border border-[${theme.colors.secondary}]`,
  primaryText: `text-[${theme.colors.primary}]`,
  secondaryText: `text-[${theme.colors.secondary}]`,
}
