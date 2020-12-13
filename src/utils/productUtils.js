export const buildVariants = (options = []) => {
    /**
     * Builds product with BuyButton without defined variants but with variantOptions
     */
    let reconstructedOptions = {};

    options.forEach((op, i) => {
        reconstructedOptions[`data-item-custom${3 + i}-name`] = op.title;
        reconstructedOptions[`data-item-custom${3 + i}-options`] = op.values.join('|')
    })

    return reconstructedOptions
}

export const buildSelectedVariants = (options = []) => {
    /**
     * Builds product with BuyButton that has variants defined
     */
    let reconstructedOptions = {};

    options.forEach((op, i) => {
        reconstructedOptions[`data-item-custom${3 + i}-name`] = op.name;
        reconstructedOptions[`data-item-custom${3 + i}-options`] = op.value;
    })

    return reconstructedOptions
}

export const handleVariantChange = (name, value, variantOptions) => {
    let copyVariantOptions = { ...variantOptions };
    let keys = Object.keys(copyVariantOptions);
    let variantOptionKey = keys.find(key => {
        return copyVariantOptions[key] === name
    })

    if (variantOptionKey) {
        variantOptionKey = variantOptionKey.replace("name", "options")
        copyVariantOptions[variantOptionKey] = value

        return copyVariantOptions
    }
}