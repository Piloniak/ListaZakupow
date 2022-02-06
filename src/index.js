import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';


class ShoppingList extends React.Component {
  state = {
    products: []
  };

  handleSubmit = product => {
    this.setState({products: [...this.state.products, product]});
  }
  
  handleDelete = (index) => {
    const newArr = [...this.state.products];
    newArr.splice(index, 1);
    this.setState({products: newArr});
  }

  sortList=()=>{
    const list=this.state.products;
    list.sort((a, b) => a.localeCompare(b));
    this.setState({products: list});
    console.log(this.state.products);
  }

  render() {
    return(
      <div className='wrapper'>
        <div className='card frame'>
          <Header numTodos={this.state.products.length} />
          <SubmitForm onFormSubmit={this.handleSubmit} />
          <button onClick={this.sortList} className='button'>Sort</button>
          <ProductsList products={this.state.products} onDelete={this.handleDelete} />
          
        </div>
      </div>
    );
  } 
}


class SubmitForm extends React.Component {
  state = { term: '' };

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.term === '') return;
    this.props.onFormSubmit(this.state.term);
    this.setState({ term: '' });
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input 
          type='text'
          className='input'
          placeholder='Enter Item'
          value={this.state.term}
          onChange={(e) => this.setState({term: e.target.value})}
        />
        <br/>
        <button className='button'>Submit</button>
      </form>
    );
  }
}


const Header = (props) => {
  return(
    <div className='card-header'>
      <h1 className='card-header-title header'>
        Liczba produktów wynosi: {props.numTodos}
      </h1>
    </div>
  )
}


const ProductsList = (props) => {
  const products = props.products.map((product, index) => {
    return <Product content={product} key={index} id={index} onDelete={props.onDelete} />
  })
  return( 
    <div className='list-wrapper'>
      {products}
    </div>
  );
}

const Product = (props) => {
  return(
    <div className='list-item'>
      {props.content}
      <button className="delete" onClick={() => {props.onDelete(props.id)}} >Delete</button>
    </div>
  );
}


ReactDOM.render(
  <ShoppingList/>,
  document.getElementById('root')
);


reportWebVitals();
