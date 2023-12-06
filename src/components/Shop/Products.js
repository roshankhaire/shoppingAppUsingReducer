import ProductItem from './ProductItem';
import classes from './Products.module.css';
 const DUMMY_PRODUCTS=[{
  id:'p1',
  price:6,
  title:'My first Book',
  discription:'first book i ever wrote'
},
{
  id:'p2',
  price:5,
  title:'My second Book',
  discription:'second book '
 },
 {
  id:'p3',
  price:10,
  title:'My third Book',
  discription:'third book '
 }]
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product)=>
         <ProductItem
         id={product.id}
         key={product.id}
         title={product.title}
         price={product.price}
         description={product.discription}
       />)}
       
      </ul>
    </section>
  );
};

export default Products;
