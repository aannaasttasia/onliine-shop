import Product, { ProductType } from "../Product/Product";
import './css/ProductsList.scss'

export function ProductsList({ products }: { products: ProductType[] }) {
  return (
    <section className="list">
      <h1>Products</h1>
      <ul className="list-ul">
        {products.map((product: ProductType) => (
          <li key={product.id}>
            <Product product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
