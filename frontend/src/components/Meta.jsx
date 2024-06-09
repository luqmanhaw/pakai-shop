import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome To Pakai!',
  description: 'We sell the best products for cheap prices!',
  keywords: 'clothing, buy clothing, cheap clothing, fashion, men clothing, women clothing, kids clothing, shoes, bags, pakai clothing, pakai fashion, pakai shoes, pakai bags, pakai accessories, pakai kids clothing',
};

export default Meta;
