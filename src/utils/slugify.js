// utils/slugify.js
export const slugify = (text) => {
  if (!text) return '';
  
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

export const generatePropertyUrl = (property) => {
  const baseUrl = import.meta.env.VITE_SITE_URL || 'https://yourdomain.com';
  const slug = slugify(property.property_name);
  
  // Option 1: /properties/property-name-id
//   return `${baseUrl}/properties/${slug}-${property.id}`;
  
  // Option 2: /properties/id/property-name
  // return `${baseUrl}/properties/${property.id}/${slug}`;
  
  // Option 3: /properties/property-name (if names are unique)
  return `${baseUrl}/properties/${slug}`;
};