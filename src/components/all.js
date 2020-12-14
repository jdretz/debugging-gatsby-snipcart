import React from "react"
import Product from "../components/Product/Product";

const All = ({
    data
}) => {

    return (
        <div>
            <h1 id="all" style={{ fontSize: "4.5rem", borderBottom: "4px solid var(--primary-color)", color: "var(--primary-color)" }}>Shop</h1>
            <h2 style={{ fontSize: "2.5rem", borderBottom: "2px solid #CCC" }}>All</h2>
            {data.allSanityProduct && data.allSanityProduct.nodes.map(prod => {
                return (
                    <Product key={prod._id} product={prod} />
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