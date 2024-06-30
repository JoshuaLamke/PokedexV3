
export function hexToRgb(hex: string): [number, number, number] {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(x => x + x).join('');
  }
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

export function rgbStringToHex(rgb: string): string {
  // Extract the RGB values using a regular expression
  const result = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.exec(rgb);
  
  if (!result) {
    throw new Error("Invalid RGB string format");
  }

  const r = parseInt(result[1], 10);
  const g = parseInt(result[2], 10);
  const b = parseInt(result[3], 10);

  // Ensure each value is within the range [0, 255]
  const clamp = (value: number) => Math.max(0, Math.min(255, value));

  // Convert each component to a two-digit hexadecimal string
  const toHex = (value: number) => {
    const hex = clamp(value).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  // Combine the components into a single hexadecimal string
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(Math.min(k(n) - 3, 9 - k(n), 1), -1);
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

export function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

export function darkenColor(color: string, amount: number): string {
  let r: number, g: number, b: number;
  
  // Check the format of the input color
  if (color.startsWith('#')) {
    [r, g, b] = hexToRgb(color);
  } else if (color.startsWith('rgb')) {
    const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!rgbMatch) throw new Error('Invalid RGB color format');
    [r, g, b] = [parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3])];
  } else if (color.startsWith('hsl')) {
    const hslMatch = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!hslMatch) throw new Error('Invalid HSL color format');
    const [h, s, l] = [parseInt(hslMatch[1]), parseInt(hslMatch[2]), parseInt(hslMatch[3])];
    [r, g, b] = hslToRgb(h, s, l);
  } else {
    throw new Error('Unsupported color format');
  }

  // Darken the color by decreasing brightness
  const factor = 1 - amount / 100;
  r = Math.max(0, Math.min(255, Math.round(r * factor)));
  g = Math.max(0, Math.min(255, Math.round(g * factor)));
  b = Math.max(0, Math.min(255, Math.round(b * factor)));

  // Convert back to the original format
  if (color.startsWith('#')) {
    return rgbToHex(r, g, b);
  } else if (color.startsWith('rgb')) {
    return `rgb(${r}, ${g}, ${b})`;
  } else if (color.startsWith('hsl')) {
    const [h, s, l] = rgbToHsl(r, g, b);
    return `hsl(${h}, ${s}%, ${l}%)`;
  } else {
    throw new Error('Unsupported color format');
  }
}