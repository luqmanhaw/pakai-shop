import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  function getRandomProducts(products, count) {
    let len = products.length;
  
    if (count > len) return products; // return all products if less than count
  
    let result = [];
    let taken = new Array(len);
  
    while (count--) {
      let x = Math.floor(Math.random() * len);
      result[count] = products[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
  
    return result;
  }

  // Randomly select 5 products
  const randomProducts = Array.isArray(products)
  ? getRandomProducts(products, 5)
  : [];

  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-primary mb-4'>
      {randomProducts.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2 className='text-white text-right'>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;