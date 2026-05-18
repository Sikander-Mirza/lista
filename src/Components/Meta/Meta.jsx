import { Helmet } from 'react-helmet-async';

const truncateToChars = (text = '', charLimit = 160) => {
  if (text.length <= charLimit) return text;
  return text.slice(0, charLimit).trim() + '...';
};

const SEO = ({ 
  title, 
  description, 
  canonicalUrl, 
  ogImage,
  ogType = 'website',
  propertyData = null 
}) => {
  if (!title) return null;

  const finalDescription = truncateToChars(description, 160);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={finalDescription} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={finalDescription} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:type" content={ogType} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={finalDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {propertyData && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            "name": propertyData.property_name,
            "description": finalDescription,
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