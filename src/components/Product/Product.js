import React from "react";

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