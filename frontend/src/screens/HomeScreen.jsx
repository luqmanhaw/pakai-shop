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

  const subCategory = [
    {
      _id: 'men-clothing',
      name: 'Men Clothing',
      image: 'https://i.ebayimg.com/images/g/VYAAAOSwl91mWD11/s-l1600.jpg',
    },
    {
      _id: 'kid-clothing',
      name: 'Kid Clothing',
      image: 'https://images.squarespace-cdn.com/content/v1/634d511a9ef7d90a947cc190/1681833467714-SZ629SHY19TOK8IDLIT2/kids-hoodie-jet-black-right-front-643ebdf29085c.jpg?format=1000w',
    },
    {
      _id: 'women-clothing',
      name: 'Women Clothing',
      image: 'https://img.lazcdn.com/g/p/5223bb3415dd286638829ab8372e4be0.jpg_720x720q80.jpg',
    },
  ]

  return (
    <>
      <div className='hero bg-base-200 bg-blend-overlay'>
        <div className='hero-content text-center'>
          <div className='max-w-xl'>
            <h1 className='text-6xl font-bold max-md:text-4xl text-accent-content'>
              Welcome to Pakai Shop, The Best Clothing Shop Of The Year!
            </h1>
            <p className='py-6 text-2xl max-md:text-lg text-accent-content'>
            Here, you'll find a wide variety of stylish and high-quality apparel to suit any occasion. From trendy casual wear to elegant formal attire, Pakai Shop offers exceptional options for every wardrobe. Enjoy our latest collections, exclusive designs, and unbeatable customer service. Visit us today and experience why we are the top choice for fashion enthusiasts everywhere!
            </p>
          </div>
        </div>
      </div>

      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Trending Products</h1>
          <Row>
            {[...data.products]
              .sort(() => Math.random() - 0.5)
              .slice(0, 5)
              .map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>

          <h1>Shop By Categories</h1>
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
