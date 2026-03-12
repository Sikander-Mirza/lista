// src/Components/SEO/SEO.jsx
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  canonicalUrl, 
  ogImage,
  ogType = 'website',
  propertyData = null 
}) => {
  if (!title) return null;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:type" content={ogType} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {propertyData && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            "name": propertyData.property_name,
            "description": propertyData.description,
            "url": canonicalUrl,
            "image": ogImage || '',
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