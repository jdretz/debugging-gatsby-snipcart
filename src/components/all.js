import React from "react"
import { BuyButton } from './Product/Product';
import { buildSelectedVariants, buildVariants } from '../utils/productUtils';

const All = ({
    data
}) => {

    let [allProducts, setAllProducts] = React.useState(null);

    React.useEffect(() => {
        let productList = [];

        data.allSanityProduct.nodes.map(prod => {
            // TODO: Add product with no defined variants but with variantOptions
            let title = prod.title;
            let _id = prod._id

            if (prod.variants && prod.variants.length > 0) {
                prod.variants.map(variant => {
                    productList.push({ 
                        _id: variant.variant_id ,
                        ...variant, 
                        variantOptions: buildSelectedVariants(variant.selectedVariants) 
                    });
                })
            } else {
                productList.push({ 
                    title, 
                    _id, 
                    ...prod.defaultProductVariant,
                    variantOptions: buildVariants(prod.variantOptions)
                })
            }
        });

        setAllProducts(productList);

    }, [data, setAllProducts])

    return (
        <div>
            <h1 id="all" style={{ fontSize: "4.5rem", borderBottom: "4px solid var(--primary-color)", color: "var(--primary-color)" }}>Shop</h1>
            <h2 style={{ fontSize: "2.5rem", borderBottom: "2px solid #CCC" }}>All</h2>
            {allProducts && allProducts.map(prod => {
                return (
                    <BuyButton key={prod._id} hotProduct={prod} variantOptions={prod.variantOptions} />
                )
            })}
        </div>
    )
}

export const query = graphql`
query MyQuery {
    allSanityProduct {
      nodes {
        title
    slug {
      current
    }
    _id
    variants {
      variant_id
      title
      mainImage {
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
          variantFluid: fluid(maxHeight: 200, maxWidth: 200) {
            ...GatsbySanityImageFluid
          }
          url
        }
      }
      width
      taxable
      shippable
      price
      selectedVariants {
        name
        value
      }
      length
      height
      grams
      description
      _rawBody
    }
    defaultProductVariant {
        mainImage {
            asset {
              fluid {
                  ...GatsbySanityImageFluid
              }
            }
          }
          price
          taxable
          grams
          height
          length
          width
          shippable
          description
          _rawBody(resolveReferences: {maxDepth: 10})
    }
    variantOptions {
      values
      title
      id
    }
      }
    }
  }
`

export default All