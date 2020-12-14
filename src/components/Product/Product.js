import React from "react";
// import BlockContent from "@sanity/block-content-to-react";
// import serializers from "../../../utils/serializers";
// import Image from "gatsby-image";
// import VariantOptions from "../VariantOptions/VariantOptions";
import classes from "./Product.module.css";
// import Form from "react-bootstrap/Form";
import {
    buildSelectedVariants,
    buildVariants,
} from "../../utils/productUtils";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export const BuyButton = ({
    hotProduct,
    variantOptions
}) => {
    let buttonProps = {
        'data-item-id': hotProduct._id,
        'data-item-price': hotProduct.price,
        'data-item-url': `/products/all`,
        // 'data-item-taxable': hotProduct.taxable,
        // 'data-item-shippable': hotProduct.shippable,
        'data-item-description': hotProduct.description,
        'data-item-name': hotProduct.title,
        'data-item-image': hotProduct.mainImage.asset.fluid.src,
        // 'data-item-weight': Math.round(Number(hotProduct.grams) * 453),
        // 'data-item-length': hotProduct.length,
        // 'data-item-width': hotProduct.width,
        // 'data-item-height': hotProduct.height,
        // 'data-item-custom1-name': "Comments",
        // 'data-item-custom1-type': "textarea",
        // 'data-item-custom2-name': "Gift",
        // 'data-item-custom2-type': "checkbox",
        // ...variantOptions
    }
    return (
        <button {...buttonProps} className='snipcart-add-item'>Add to cart</button>
    )
}

const Product = ({ product }) => {
    // let variantLength = product.variants ? product.variants.length : 0;

    let [hotProduct, setHotProduct] = React.useState('');
    let [variantOptions, setVariantOptions] = React.useState(null);
    // let [variantFilter, setVariantFilter] = React.useState([]);
    // let { current, next, previous, setCurrent } = useNextPrevious(variantLength);

    let hasVariants = product.variants && product.variants.length > 0;

    React.useEffect(() => {
        if (product.defaultProductVariant) {
            let _id = product._id;
            let title = product.title;
            let slug = product.slug.current;
            setHotProduct({ _id, title, slug,  ...product.defaultProductVariant })
        }
        let productOptions;

        if (product.variantOptions) {
            productOptions = buildVariants(product.variantOptions);

            setVariantOptions(productOptions);
        }
    }, [setVariantOptions, product.variantOptions, setHotProduct, product.defaultProductVariant, product._id, product.slug, product.title])

    const handleVariantChange = (name, value) => {
        let copyVariantOptions = { ...variantOptions };
        let keys = Object.keys(copyVariantOptions);
        let variantOptionKey = keys.find(key => {
            return copyVariantOptions[key] === name
        })

        if (variantOptionKey) {
            variantOptionKey = variantOptionKey.replace("name", "options")
            copyVariantOptions[variantOptionKey] = value

            setVariantOptions(copyVariantOptions)
        }
    }

    // const manageVariantFilter = (name, value) => {
    //     let copyVariantFilter = [...variantFilter]
    //     let isInFilter = variantFilter.findIndex(item => {
    //         return item.name === name
    //     })

    //     if (value === "All") {
    //         setVariantFilter(copyVariantFilter.filter(item => item.name !== name))
    //     }
    //     else if (isInFilter > -1) {
    //         copyVariantFilter[isInFilter].value = value;
    //         setVariantFilter(copyVariantFilter);
    //     } else {
    //         let newItem = {
    //             name,
    //             value
    //         }
    //         setVariantFilter([...copyVariantFilter, newItem])
    //     }
    // }

    const matchSelectToVariant = (title) => {
        let matchingVariantValue = hotProduct.selectedVariants.find(sv => sv.name === title)
        if (matchingVariantValue) {
            return matchingVariantValue.value
        } else {
            return undefined
        }
    }

    return (
        <div className="container">
            <div className={classes.ProductRow + " row"}>
                {/* TODO: Gallery display for main Image */}
                {/* TODO: Link arrows to product variants  */}
                {hotProduct && <>
                    <div className={hasVariants ? `col-lg-8` : `col-lg-12`}>
                    <h3 className="text-center">{!hotProduct.title ? product.title : hotProduct.title}</h3>
                    <img src={hotProduct.mainImage.asset.fluid.src} />
                            {hasVariants ?
                                /**
                                 * 
                                 * Has defined variants
                                 * 
                                 */
                                // TODO: handle mix of set selected variants and variant options
                                <>
                                    <small style={{
                                        textAlign: "center",
                                        display: "block"
                                    }}><b>Please select a product option.</b></small>
                                    {product.variantOptions &&
                                        <>
                                            {product.variantOptions.map((vo, i) => {
                                                return <div key={i}>
                                                    {/* <Form.Group controlId={vo.title}>
                                                        <Form.Label>{vo.title}</Form.Label>
                                                        {hotProduct.selectedVariants ?
                                                            <p>
                                                                <b>{matchSelectToVariant(vo.title)}</b>
                                                            </p>
                                                            :
                                                            <></> */}
                                                            {/* // <Form.Control onChange={(e) => manageVariantFilter(vo.title, e.target.value)} as="select">
                                                            //         <>
                                                            //             <option value={"All"}>All</option>
                                                            //             {vo.values.map((val, i) => { */}
                                                            {/* //                 return <option key={i} value={val}>{val}</option>

                                                            //             })}
                                                            //         </> */}
                                                                
                                                            {/* // </Form.Control> */}
                                                        {/* } */}
                                                    {/* </Form.Group> */}
                                                </div>
                                            })}
                                        </>
                                    }
                                    {hotProduct.selectedVariants &&
                                        <>
                                            <hr />
                                            <p style={{color: "rgba(0,0,0,0.7"}}><b>${hotProduct.price}</b></p>
                                            <BuyButton
                                                hotProduct={hotProduct}
                                                variantOptions={variantOptions}
                                            />
                                        </>
                                    }
                                </>
                                :
                                /**
                                 * 
                                 * Has no defined variants
                                 * 
                                 */
                                <>
                                    <p><b>${hotProduct.price}</b></p>
                                    <BuyButton
                                        hotProduct={hotProduct}
                                        variantOptions={variantOptions}
                                    />
                                    {/* {product.variantOptions &&
                                        product.variantOptions.map((vo, i) => {
                                            return <div key={i}>
                                                <Form.Group controlId={vo.title}>
                                                    <Form.Label>{vo.title}</Form.Label>
                                                    <Form.Control onChange={(e) => handleVariantChange(vo.title, e.target.value)} as="select">
                                                        {vo.values.map((val, i) => {
                                                            return <option key={i} value={val}>{val}</option>
                                                        })}
                                                    </Form.Control>
                                                </Form.Group>
                                            </div>
                                        })
                                    } */}
                                </>
                            }
                    </div>
                    {/* {hasVariants ?
                        <div className="col-lg-4">
                            {variantFilter.length > 0 || hotProduct.selectedVariants ? <Button
                                inner={"Reset Selections"}
                                size={"small"}
                                rounded={true}
                                buttonProps={{
                                    onClick: () => {
                                        setVariantFilter([]);
                                        setHotProduct(product.defaultProductVariant);
                                        setCurrent(0);
                                    }
                                }}
                                classes={[classes.ResetButton]}
                            /> : null
                            }
                            <VariantOptions
                                variantFilter={variantFilter}
                                variantOptionsLength={product.variants.length}
                                buildSelectedVariants={buildSelectedVariants}
                                setVariantOptions={setVariantOptions}
                                setHotProduct={setHotProduct}
                                setCurrent={setCurrent}
                                options={product.variants} />
                            {
                                hasVariants && <>
                                    <Button
                                        size="medium"
                                        inner={<FontAwesomeIcon icon={faAngleLeft} color="white" />}
                                        buttonProps={{
                                            onClick: previous,
                                        }}
                                    />
                                    <Button
                                        size="medium"
                                        inner={<FontAwesomeIcon icon={faAngleRight} color="white" />}
                                        buttonProps={{
                                            onClick: next,
                                        }}
                                    />
                                </>
                            }
                        </div>
                        : null} */}
                    {/* <BlockContent blocks={product.defaultProductVariant._rawBody} serializers={serializers} /> */}
                </>
                }
            </div>
        </div>
    )
}

export default Product;