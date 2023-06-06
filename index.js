import React, { Component } from 'react';
import { render } from 'react-dom';
import MyForm from './myForm';
import PlanPage from './PlanPage';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      plan: null,
    };
  }

  updatePlan = (plan) => {
    this.setState({ plan });
  }

  render() {
    const { plan } = this.state;
    return (
      <div>
        {plan ? (
          <PlanPage plan={plan} />
        ) : (
          <MyForm onSubmit={this.updatePlan} />
        )}
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
