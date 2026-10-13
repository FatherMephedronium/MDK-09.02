const products = [
    { id: 1, name: 'Laptop', price: 80000, quantity: 2, category: 'electronics' },
    { id: 2, name: 'Mouse', price: 2500, quantity: 5, category: 'electronics' },
    { id: 3, name: 'Keyboard', price: 4500, quantity: 3, category: 'electronics' },
    { id: 4, name: 'Chair', price: 18000, quantity: 1, category: 'furniture' },
    { id: 5, name: 'Desk', price: 25000, quantity: 2, category: 'furniture' }
];

function getProductsTotal(product) {

    let productFiltered = products.filter(e => e.name == product)
    let TotalPrice = productFiltered.reduce((sum, product) => sum + product.price * product.quantity, 0)
    return TotalPrice
};

function getTotalInventoryValue(products) {
    let productValuses = Object.values(products)
    let totalSum = productValuses.reduce((sum, product) => sum + product.price * product.quantity, 0)
    return totalSum
}

function getMostExpensiveProduct(products) {
    let maxValue = products.filter(e => e.price === products.reduce((max, product) => max = Math.max(max, product.price), 0))[0]
    return maxValue
}

function filterByCategory(products, category){
    return products.filter(e => e.category === category)
}

function findProduct(products, id){
    return products.filter(e => e.id === id)[0]
}


function getAvailableProducts(products){
    return products.filter(e => e.quantity > 0)
}

function getCategoryStatistics(products){
    let categories = Object.values(products).category
    
}
getCategoryStatistics(products)


console.log(`
    getProductsTotal: ${getProductsTotal('Mouse')}
    getTotalInventoryValue: ${getTotalInventoryValue(products)}
    getMostExpensiveProduct: ${getMostExpensiveProduct(products).name}:${getMostExpensiveProduct(products).price}
    filterByCategory: ${JSON.stringify(filterByCategory(products, 'furniture')) }
    findProduct: ${findProduct(products, 4).name}:${findProduct(products, 4).price}
    getAvailableProducts: ${JSON.stringify(getAvailableProducts(products)) }
    `)