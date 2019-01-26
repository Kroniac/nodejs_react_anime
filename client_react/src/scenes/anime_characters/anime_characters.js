import React, { Component } from 'react';
import Styles from './anime_characters.module.css';
import { SharedUI } from '../../config/import_paths';

const { Button } = SharedUI.Button();

class AnimeCharacters extends Component {
  constructor(props) {
    super(props);
    this.images = [
      "https://i1.sndcdn.com/artworks-000165384395-rhrjdn-t500x500.jpg",
      "https://i1.sndcdn.com/artworks-000185743981-tuesoj-t500x500.jpg",
      "https://i1.sndcdn.com/artworks-000158708482-k160g1-t500x500.jpg",
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/65/The_Rising_of_the_Shield_Hero_light_novel_vol_1.jpg/220px-The_Rising_of_the_Shield_Hero_light_novel_vol_1.jpg",
      "https://images-eu.ssl-images-amazon.com/images/I/61nZiU%2BI98L._SY445_QL70_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/51uxJBQfGXL._SY346_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/518Mvgn2cCL._SX339_BO1,204,203,200_.jpg",
    ];
    this.state = {
      currentImage: 0,
      prev: Styles.prev,
      selected: Styles.selected,
      hideLeft: Styles.hideLeft,
      next: Styles.next,
      hideRight: Styles.hideRight,
      image1: this.images[0],
      image2: this.images[1],
      image3: this.images[2],
      image4: this.images[3],
      image5: this.images[4]
    }
  }
  

  _prevCard = () => {
    this.currentHideLeftPosition = (this.currentHideLeftPosition + 1) % 6 || 1;
    this.currentHideRightPosition = (this.currentHideRightPosition + 1) % 6 || 1;
    this.setState((prevState) => ({
      prev: this.nextPressed[prevState.prev],
      selected: this.nextPressed[prevState.selected],
      hideLeft: this.nextPressed[prevState.hideLeft],
      next: this.nextPressed[prevState.next],
      hideRight: this.nextPressed[prevState.hideRight],
      currentImage: 1
    }), () => {
      ['hideLeft', 'prev', 'selected', 'next', 'hideRight'].forEach((current, index) => {
        if (this.state[current] === Styles.hideLeft) this.setState({ [`image${index+1}`]: this.images[this.prevImage - 1] })
      })
      this.prevImage -= 1;
      this.nextImage -= 1;
    });
  }

  prevImage = 0;
  nextImage = 4;
  currentHideLeftPosition = 1;
  currentHideRightPosition = 5;

  _nextCard = () => {
    this.currentHideLeftPosition = (this.currentHideLeftPosition - 1) || 5;
    this.currentHideRightPosition = (this.currentHideRightPosition - 1) || 5;
    this.setState((prevState) => ({
      prev: this.prevPressed[prevState.prev],
      selected: this.prevPressed[prevState.selected],
      hideLeft: this.prevPressed[prevState.hideLeft],
      next: this.prevPressed[prevState.next],
      hideRight: this.prevPressed[prevState.hideRight],
      currentImage: 1
    }), () => {
      ['hideLeft', 'prev', 'selected', 'next', 'hideRight'].forEach((current, index) => {
        if (this.state[current] === Styles.hideRight) this.setState({ [`image${index+1}`]: this.images[this.nextImage + 1] })
      })
      this.prevImage += 1;
      this.nextImage += 1;
    });
  }

  nextPressed = {
    [Styles.selected]: Styles.next,
    [Styles.prev]: Styles.selected,
    [Styles.hideLeft]: Styles.prev,
    [Styles.next]: Styles.hideRight,
    [Styles.hideRight]: Styles.hideLeft,
  }

  prevPressed = {
    [Styles.selected]: Styles.prev,
    [Styles.prev]: Styles.hideLeft,
    [Styles.hideLeft]: Styles.hideRight,
    [Styles.hideRight]: Styles.next,
    [Styles.next]: Styles.selected,
  }



  render() {
    return (
      <div className = {Styles.root} >
        <div className = {Styles.carasoul} >
        <div className={this.state.hideLeft}>
        <img src={this.state.image1} />
        </div>
        <div className = {this.state.prev}>
        <img src={this.state.image2} />
      </div>
      
      <div class = {this.state.selected}>
        <img src={this.state.image3} />
      </div>
      <div className = {this.state.next}>
        <img src={this.state.image4} />
      </div>
      <div className = {this.state.hideRight}>
        <img src={this.state.image5} />
      </div>
      </div>
      <div className = {Styles.buttons} >
      <Button mode="raised" design="accent" onClick={this._prevCard}>
          Prev
      </Button>
      <Button mode="raised" design="accent" onClick={this._nextCard}>
          Next
      </Button>
      </div>
      </div>
    )
  }
}

export default AnimeCharacters;