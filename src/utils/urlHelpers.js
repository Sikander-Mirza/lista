// utils/urlHelpers.js
export const slugify = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

// Generate SEO-friendly URL for property
export const generatePropertyUrl = (property) => {
  const slug = slugify(property.property_name || property.Heading);
  return `/properties/${slug}`;
};

// Extract ID from slug (e.g., "holden-beach-scuba-202" → "202")
export const extractIdFromSlug = (slug) => {
  if (!slug) return null;
  
  // If slug ends with -123 (number)
  const match = slug.match(/-(\d+)$/);
  if (match) {
    return match[1];
  }
  
  // If it's just a number
  if (/^\d+$/.test(slug)) {
    return slug;
  }
  
  return null;
};