//removed the name of the function, then exported the function from the module
module.exports = (temp, product) => {
//replaceTemplate function takes in an html string template(tempCard) and a data object product(el) from the dataObj array 
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
    output = output.replace(/{%IMAGE%}/g, product.image)
    output = output.replace(/{%PRICE%}/g, product.price)
    output = output.replace(/{%FROM%}/g, product.from)
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
    output = output.replace(/{%QUANTITY%}/g, product.quantity)
    output = output.replace(/{%DESCRIPTION%}/g, product.description)
    output = output.replace(/{%ID%}/g, product.id)

    //if product is not organic then add the CSS not-organic to the div class so that it isn't displayed
    if(!product.organic) {output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')}
    //need to return output because arrow funtion has {}
    return output
}