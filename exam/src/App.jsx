import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(response => {
        setProducts(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleSearch = () => {
    axios.get(`http://localhost:3001/search?name=${searchTerm}`)
      .then(response => {
        setProducts(response.data.data);
      })
      .catch(error => {
        console.error('Error searching for products:', error);
      });
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Product List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 w-2/3 border border-gray-300 rounded-l focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none"
        >
          Search
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">SKU</th>
            <th className="border border-gray-300 px-4 py-2">Product Name</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Supplier</th>
            <th className="border border-gray-300 px-4 py-2">Reorder Level</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td className="border border-gray-300 px-4 py-2">
                <Link to={`/products/${product._id}`} className="text-blue-500 hover:text-blue-700">
                  <h3 className="text-xl font-semibold">{product.SKU}</h3>
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <h3 className="text-xl font-semibold">{product.productName}</h3>
              </td>
              <td>
                {product.price}
              </td>
              <td>
                {product.quantity}
              </td>
              <td>
                {product.supplier}
              </td>
              <td>
                {product.reorderLevel}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


function ProductDetailsPage({ match }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/products/${match.params.id}`)
      .then(response => {
        setProduct(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [match.params.id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">Product Details</h2>
      <h3 className="text-xl font-semibold">{product.productName}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-gray-700">Price: ${product.price}</p>
    </div>
  );
}

function NewProductPage() {

  const history = useHistory();

  const [newProduct, setNewProduct] = useState({
    productName: '',
    price: 0,
    description: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleAddProduct = () => {
    axios.post('http://localhost:3001/register', newProduct)
      .then(response => {
        console.log(response.data);
        setNewProduct({
          productName: '',
          SKU: '',
          price: 0,
          quantity: 0,
          supplier: '',
          reorderLevel: 0,
          comments: ''
        });

        history.goBack();
      })
      .catch(error => {
        console.error('Error adding new product:', error);
      });
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">Add New Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        name="productName"
        value={newProduct.productName}
        onChange={handleInputChange}
        className="px-4 py-2 mb-4 w-full border border-gray-300 rounded focus:outline-none"
      />
      <input
        type="text"
        placeholder="SKU"
        name="SKU"
        value={newProduct.SKU}
        onChange={handleInputChange}
        className="px-4 py-2 mb-4 w-full border border-gray-300 rounded focus:outline-none"
      />
      <input
        type="number"
        placeholder="Price"
        name="price"
        value={newProduct.price}
        onChange={handleInputChange}
        className="px-4 py-2 mb-4 w-full border border-gray-300 rounded focus:outline-none"
      />
      <input
        type="number"
        placeholder="Quantity"
        name="quantity"
        value={newProduct.quantity}
        onChange={handleInputChange}
        className="px-4 py-2 mb-4 w-full border border-gray-300 rounded focus:outline-none"
      />
      <input
        type="text"
        placeholder="Supplier"
        name="supplier"
        value={newProduct.supplier}
        onChange={handleInputChange}
        className="px-4 py-2 mb-4 w-full border border-gray-300 rounded focus:outline-none"
      />
      <input
        type="number"
        placeholder="Reorder Level"
        name="reorderLevel"
        value={newProduct.reorderLevel}
        onChange={handleInputChange}
        className="px-4 py-2 mb-4 w-full border border-gray-300 rounded focus:outline-none"
      />
      <input
        type="text"
        placeholder="Comments"
        name="comments"
        value={newProduct.comments}
        onChange={handleInputChange}
        className="px-4 py-2 mb-4 w-full border border-gray-300 rounded focus:outline-none"
      />
      <button
        onClick={handleAddProduct}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        Add Product
      </button>
    </div>

  );
}

function App() {
  return (
    <Router>
      <div>
        <nav className="bg-gray-800 text-white p-4">
          <ul className="flex">
            <li>
              <Link to="/" className="mr-4 hover:text-gray-300">Product List</Link>
            </li>
            <li>
              <Link to="/new-product" className="hover:text-gray-300">New Product</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/products/:id" component={ProductDetailsPage} />
          <Route path="/new-product" component={NewProductPage} />
          <Route path="/" component={ProductListPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
