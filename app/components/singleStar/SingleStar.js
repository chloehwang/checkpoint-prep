import React, { Component } from 'react';
//my link doesn't work when I change it to selectedStar.name why?
export default class SingleStar extends Component {
    constructor () {
        super();
        this.state = {
            wish: ''
        };
        this.updateWish = this.updateWish.bind(this);
        
    }

    updateWish (event) {
        console.log(event.target.value);
        this.setState({ wish: event.target.value });
    }

    render () {
        const boundThis = this
    return (
        <div>
            <h2>{`${this.props.name}'s wishes`}</h2> 
            <ul>
            {
                this.props.wishes.map(wish => {
                    return (
                        <li key={wish.id} onClick={this.props.remove(wish.id)}>{wish.wish}</li>
                    )
                })
            }
            </ul>
            <form onSubmit={() => this.props.createWish(this.state, this.props.star.id)}>
                <div>
                    <input type="text" onChange={this.updateWish}/>
                </div>
                <br/>
                <button type="submit">Make a Wish</button>
            </form>
        </div>
    )
  }
}
