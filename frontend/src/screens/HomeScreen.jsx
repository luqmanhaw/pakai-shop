import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import Product from '../components/Product';
import SubCategory from '../components/SubCategory';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });


  // {
  //   name: 'Airpods Wireless Bluetooth Headphones',
  //   image: '/images/airpods.jpg',
  //   description:
  //     'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
  //   brand: 'Apple',
  //   category: 'Cloth',
  //   subCategory: 'kid-cloths',
  //   price: 89.99,
  //   countInStock: 10,
  //   rating: 4.5,
  //   numReviews: 12,
  // },

  const subCategory = [
    {
      _id: 'men-clothing',
      name: 'men-clothing',
      image: 'https://i.ebayimg.com/images/g/VYAAAOSwl91mWD11/s-l1600.jpg',
      // image: '/images/mens-cloth.jpg'
    },
    {
      _id: 'kid-clothing',
      name: 'kid-clothing',
      image: 'https://images.squarespace-cdn.com/content/v1/634d511a9ef7d90a947cc190/1681833467714-SZ629SHY19TOK8IDLIT2/kids-hoodie-jet-black-right-front-643ebdf29085c.jpg?format=1000w',
      // image: '/images/mens-cloth.jpg'
    },
    {
      _id: 'women-clothing',
      name: 'women-clothing',
      image: 'https://img.lazcdn.com/g/p/5223bb3415dd286638829ab8372e4be0.jpg_720x720q80.jpg',
      // image: '/images/mens-cloth.jpg'
    },
  ]

  return (
    <>
      
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Shop By Sub-Categories</h1>
          <Row>
            {subCategory.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <SubCategory product={product} />
              </Col>
            ))}
          </Row>
          
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
          
          
        </>
      )}
    </>
  );
};

export default HomeScreen;
