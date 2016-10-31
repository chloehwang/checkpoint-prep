import React, { Component } from 'react';
import { Link } from 'react-router';


export default class AllStars extends Component {

  constructor () {
    super();
    this.state = {
      name: ''
    };
    this.updateStarName = this.updateStarName.bind(this);
  }

  updateStarName (event) {
    console.log(event.target.value);
    this.setState({ name: event.target.value });
  }

  render () {
    console.log(this.props)
    return (
      <div>
        <h1>Make a Star</h1>
        <form onSubmit={() => this.props.createStar(this.state)}>
            <div>
                <input type="text" onChange={this.updateStarName}/>
            </div>
            <br/>
            <button type="submit">Create Star</button>
        </form>
        <ul>
        {
          this.props.stars.map(star => {
            return (
              <li key={star.id}>
                <Link to={"stars/" + star.id}> { star.name }</Link>
              </li>
            )
          })
        }
        </ul>
      </div>
    );
  }
}