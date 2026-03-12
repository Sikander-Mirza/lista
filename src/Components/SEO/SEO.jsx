// Components/SEO/SEO.jsx
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

const SEO = ({ 
  title, 
  description, 
  canonicalUrl, 
  ogImage,
  ogType = 'website',
  propertyData = null 
}) => {
  
  // Debug: Log when canonical changes
  useEffect(() => {
    console.log('SEO Component - Canonical URL:', canonicalUrl);
    console.log('SEO Component - Title:', title);
  }, [canonicalUrl, title]);

  // Don't render if no canonical URL
  if (!canonicalUrl) {
    console.log('SEO Component - No canonical URL provided');
    return null;
  }
  
  return (
    <Helmet>
      {/* Title */}
      <title>{title}</title>
      
      {/* Meta Description */}
      <meta name="description" content={description} />
      
      {/* Canonical - This is the key part */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* Schema.org JSON-LD */}
      {propertyData && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            "name": propertyData.property_name,
            "description": propertyData.description,
            "url": canonicalUrl,
            "image": propertyData.images?.[0] 
              ? `${import.meta.env.VITE_IMAGE_KEY}${propertyData.images[0]}` 
              : '',
            "address": {
              "@type": "PostalAddress",
              "streetAddress": propertyData.address,
              "addressLocality": propertyData.city,
              "addressRegion": propertyData.state,
              "postalCode": propertyData.zip
            },
            "offers": {
              "@type": "Offer",
              "price": propertyData.sale_price || propertyData.lease_rate,
              "priceCurrency": "USD"
            }
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;