import { ProductType } from "../Product/Product";
import "./css/ProductInfo.scss";

export default function ProductInfo({ product }: { product: ProductType }) {
    return (
        <section className="productInfo">
            <article className="productInfo__item">
                <figcaption className="productInfo__title">
                    {product.title}
                </figcaption>
                <figure className="productInfo__img-wrapper">
                    <img
                        className="productInfo__img"
                        src={product.thumbnail}
                        alt={product.title}
                    />
                </figure>
                <p className="productInfo__description">
                    {product.description}
                </p>
                <div className="productInfo__details">
                    <div className="productInfo__price">
                        ${product.price}
                    </div>
                </div>
            </article>
        </section>
    );
}
