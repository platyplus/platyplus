import axios from 'axios'

export default class ProductService {
  getProductsSmall() {
    return axios
      .get('/assets/layout/data/products-small.json')
      .then(res => res.data.data)
      .catch(err => {
        console.log('ERRPR', err)
      })
  }

  getProducts() {
    return axios
      .get('assets/layout/data/products.json')
      .then(res => res.data.data)
  }

  getProductsWithOrdersSmall() {
    return axios
      .get('assets/layout/data/products-orders-small.json')
      .then(res => res.data.data)
  }
}
