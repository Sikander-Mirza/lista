// utils/slugify.js

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

/**
 * Generates SEO-friendly property URL WITHOUT ID
 * URL: /buy/raleigh/mixed-use/tech-plaza
 */
export const generatePropertyUrl = (property) => {
  if (!property) {
    console.warn('generatePropertyUrl: No property provided');
    return '/properties';
  }

  const { listing_type, city, property_type, property_name } = property;

  // Determine buy or rent
  let listingSegment = 'buy';
  if (listing_type) {
    const type = listing_type.toLowerCase();
    if (type.includes('lease') || type.includes('rent')) {
      listingSegment = 'rent';
    }
  }

  // Slugify with fallbacks
  const citySlug = slugify(city) || 'unknown';
  const propertyTypeSlug = slugify(property_type) || 'property';
  const propertyNameSlug = slugify(property_name) || 'listing';

  // Final URL WITHOUT ID: /buy/raleigh/mixed-use/tech-plaza
  return `/${listingSegment}/${citySlug}/${propertyTypeSlug}/${propertyNameSlug}`;
};

/**
 * Generates canonical URL
 */
export const generateCanonicalUrl = (property) => {
  const baseUrl = import.meta.env.VITE_SITE_URL || 'https://www.newlista.com';
  return `${baseUrl}${generatePropertyUrl(property)}`;
};

/**
 * Parses URL params into readable format
 */
export const parsePropertyParams = (params) => {
  const { listingType, city, propertyType, propertyName } = params;

  const unslugify = (slug) => {
    if (!slug) return '';
    return slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return {
    listingType: listingType === 'buy' ? 'For Sale' : 'For Rent',
    listingLabel: listingType === 'buy' ? 'Buy' : 'Rent',
    city: unslugify(city),
    propertyType: unslugify(propertyType),
    propertyName: unslugify(propertyName),
    // For API lookup
    citySlug: city,
    propertyTypeSlug: propertyType,
    propertyNameSlug: propertyName,
  };
};