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

/**
 * Generates SEO-friendly property URL
 * 
 * Examples:
 *   /buy/holden-beach/commercial/scuba-shop-202
 *   /rent/wilmington/office/downtown-office-suite-55
 * 
 * @param {Object} property
 * @param {string} property.listing_type - "For Sale" | "For Rent" | "For Lease"
 * @param {string} property.city - "Holden Beach"
 * @param {string} property.property_type - "Commercial" | "Office" | "Residential"
 * @param {string} property.property_name - "Scuba Shop"
 * @param {string|number} property.id - 202
 * @param {boolean} [includeBaseUrl=false] - Whether to prepend the site URL
 * @returns {string} The generated URL path or full URL
 */
export const generatePropertyUrl = (property, includeBaseUrl = false) => {
  if (!property) return '';

  // Determine listing segment: buy or rent
  const listingSegment = property.listing_type === 'For Sale' ? 'buy' : 'rent';

  // Slugify each URL segment
  const citySlug = slugify(property.city);
  const propertyTypeSlug = slugify(property.property_type);
  const propertyNameSlug = slugify(property.property_name);

  // Append ID for uniqueness (avoids collisions with same-name properties)
  const path = `/${listingSegment}/${citySlug}/${propertyTypeSlug}/${propertyNameSlug}-${property.id}`;

  if (includeBaseUrl) {
    const baseUrl = import.meta.env.VITE_SITE_URL || 'https://www.newlista.com';
    return `${baseUrl}${path}`;
  }

  return path;
};

/**
 * Generates the canonical (full) URL for a property
 * Used for SEO meta tags, Open Graph, sitemaps, etc.
 * 
 * @param {Object} property
 * @returns {string} Full canonical URL
 */
export const generateCanonicalUrl = (property) => {
  return generatePropertyUrl(property, true);
};

/**
 * Extracts the property ID from the last URL segment
 * 
 * Example: "scuba-shop-202" → "202"
 *          "downtown-office-suite-55" → "55"
 * 
 * @param {string} propertyNameSlug - The last segment of the URL
 * @returns {string} The extracted property ID
 */
export const extractIdFromSlug = (propertyNameSlug) => {
  if (!propertyNameSlug) return '';

  const parts = propertyNameSlug.split('-');
  return parts[parts.length - 1];
};

/**
 * Parses all URL params into a readable filter object
 * Useful for breadcrumbs, page titles, and filtering
 * 
 * @param {Object} params - Route params
 * @param {string} params.listingType - "buy" | "rent"
 * @param {string} params.city - "holden-beach"
 * @param {string} params.propertyType - "commercial"
 * @param {string} params.propertyName - "scuba-shop-202"
 * @returns {Object} Parsed and formatted values
 */
export const parsePropertyParams = (params) => {
  const { listingType, city, propertyType, propertyName } = params;

  const unslugify = (slug) => {
    if (!slug) return '';
    return slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Title Case
  };

  return {
    listingType: listingType === 'buy' ? 'For Sale' : 'For Rent',
    listingLabel: listingType === 'buy' ? 'Buy' : 'Rent',
    city: unslugify(city),
    propertyType: unslugify(propertyType),
    propertyName: unslugify(propertyName?.replace(/-\d+$/, '')), // Remove trailing ID
    propertyId: extractIdFromSlug(propertyName),
  };
};