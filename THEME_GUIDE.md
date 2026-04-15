# 🎨 Theme Configuration Guide

Your TutionZone landing page now uses an easy-to-manage theme system!

## How to Change the Theme

All colors are centralized in `app/theme.ts`. To change the entire website's theme, simply update the colors in this file:

```typescript
export const theme = {
  colors: {
    primary: '#006D77', // Deep Sea Green/Teal
    secondary: '#FFDDD2', // Soft Coral/Muted Orange
    background: '#FFFFFF', // Pure White
    action: '#83C5BE', // Mint Green
    accent: '#F4E5D3', // Light beige for subtle backgrounds
    text: '#333333', // Dark gray for text
    lightText: '#666666', // Medium gray for secondary text
  },
}
```

## Current Theme Colors

| Use Case                | Color          | Hex Value |
| ----------------------- | -------------- | --------- |
| Primary (Headers, Text) | Deep Sea Green | #006D77   |
| Secondary (Accents)     | Soft Coral     | #FFDDD2   |
| Background              | Pure White     | #FFFFFF   |
| Action Buttons          | Mint Green     | #83C5BE   |

## Quick Theme Presets

### Previous Theme (Navy & Gold)

```typescript
primary: '#1B263B',
secondary: '#F4D35E',
background: '#F8F9FA',
action: '#415A77',
```

### Current Theme (Teal & Coral)

```typescript
primary: '#006D77',
secondary: '#FFDDD2',
background: '#FFFFFF',
action: '#83C5BE',
```

## Example: Switch to Navy & Gold Theme

1. Open `app/theme.ts`
2. Update the colors:

```typescript
export const theme = {
  colors: {
    primary: '#1B263B',
    secondary: '#F4D35E',
    background: '#F8F9FA',
    action: '#415A77',
    // ... rest of colors
  },
}
```

3. Run `npm run dev` to see the changes instantly!

## Components Using the Theme

All these components automatically use the theme colors:

- ✅ Header
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

- **Primary (#006D77)**: Main headings, navigation text, important text
- **Secondary (#FFDDD2)**: Accents, borders, logos, highlights
- **Background (#FFFFFF)**: Main page background
- **Action (#83C5BE)**: Buttons, CTAs, interactive elements
- **Accent (#F4E5D3)**: Subtle backgrounds, light boxes

---

Enjoy customizing your theme! 🎉
