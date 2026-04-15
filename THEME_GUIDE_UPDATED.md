# 🎨 Theme Configuration Guide

Your TutionZone landing page now uses an easy-to-manage theme system!

## How to Change the Theme

All colors are centralized in `app/theme.ts`. To change the entire website's theme, simply update the colors in this file:

```typescript
export const theme = {
  colors: {
    primary: '#370617', // Deep Indigo
    secondary: '#7209B7', // Electric Violet
    background: '#F7F4F9', // Very Light Lavender
    action: '#4CC9F0', // Neon Cyan/Sky Blue
    accent: '#C77DFF', // Light purple for subtle backgrounds
    text: '#370617', // Deep indigo for text
    lightText: '#6A4C93', // Medium purple for secondary text
  },
}
```

## Current Theme Colors

| Use Case                | Color               | Hex Value |
| ----------------------- | ------------------- | --------- |
| Primary (Headers, Text) | Deep Indigo         | #370617   |
| Secondary (Accents)     | Electric Violet     | #7209B7   |
| Background              | Very Light Lavender | #F7F4F9   |
| Action Buttons          | Neon Cyan           | #4CC9F0   |

## Theme Presets Available

### Forest Green & Sand

```typescript
primary: '#2D6A4F',
secondary: '#DDBEA9',
background: '#FEFAE0',
action: '#1B4332',
```

### Teal & Coral

```typescript
primary: '#006D77',
secondary: '#FFDDD2',
background: '#FFFFFF',
action: '#83C5BE',
```

### Navy & Gold

```typescript
primary: '#1B263B',
secondary: '#F4D35E',
background: '#F8F9FA',
action: '#415A77',
```

### Deep Indigo & Neon Cyan (Current) ⭐

```typescript
primary: '#370617',
secondary: '#7209B7',
background: '#F7F4F9',
action: '#4CC9F0',
```

## Quick Theme Switch

1. Open `app/theme.ts`
2. Update the colors to your preferred preset
3. Run `npm run dev` to see changes instantly!

## Components Using the Theme

All these components automatically use the theme colors:

- ✅ Header (with improved positioning & sticky nav)
- ✅ Banner
- ✅ Latest Tutions
- ✅ Categories
- ✅ Why Choose Us
- ✅ Top Tutors
- ✅ Guardians Reviews
- ✅ Tutors Reviews
- ✅ How It Works
- ✅ Footer

## Color Usage Reference

- **Primary (#370617)**: Main headings, navigation text, important text
- **Secondary (#7209B7)**: Accents, borders, highlights
- **Background (#F7F4F9)**: Main page background
- **Action (#4CC9F0)**: Buttons, CTAs, interactive elements
- **Accent (#C77DFF)**: Subtle backgrounds, light boxes

## Recent Updates

✨ **Fixed navbar positioning** - Better layout with improved spacing
✨ **Sticky navigation** - Header stays visible while scrolling
✨ **Better mobile support** - Navbar items properly spaced on all devices
✨ **Enhanced button contrast** - Neon cyan on deep indigo for maximum visibility
✨ **Smooth transitions** - Added duration-200 for polished feel

---

Enjoy customizing your theme! 🎉
