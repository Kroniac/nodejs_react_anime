import React, { Component } from 'react';
import Styles from './anime_characters.module.css';
import { SharedUI } from '../../config/import_paths';

const { Button } = SharedUI.Button();

class AnimeCharacters extends Component {
  constructor(props) {
    super(props);
    this.images = [
      require('../../images/goku1.png'),
      require('../../images/vegeta.png'),
      require('../../images/master_roshi.png'),
      require('../../images/goku_kid.png'),
      require('../../images/freeza.png')
    ];
    this.state = {
      currentImage: 0,
      prev: Styles.prev,
      selected: Styles.selected,
      hideLeft: Styles.hideLeft,
      next: Styles.next,
      hideRight: Styles.hideRight,
      image1: null,
      image2: null,
      image3: this.images[0],
      image4: this.images[1],
      image5: this.images[2]
    }
  }
  

  _prevCard = () => {
    if (this.selectedImageIndex === 0) console.log('No Prev Images');
    else {
      this.currentHideLeftPosition = (this.currentHideLeftPosition + 1) % 6 || 1;
      this.currentHideRightPosition = (this.currentHideRightPosition + 1) % 6 || 1;
      this.selectedImageIndex -= 1;
      this.setState((prevState) => ({
        prev: this.nextPressed[prevState.prev],
        selected: this.nextPressed[prevState.selected],
        hideLeft: this.nextPressed[prevState.hideLeft],
        next: this.nextPressed[prevState.next],
        hideRight: this.nextPressed[prevState.hideRight],
      }), () => {
        ['hideLeft', 'prev', 'selected', 'next', 'hideRight'].forEach((current, index) => {
          if (this.state[current] === Styles.hideLeft) this.setState({ [`image${index+1}`]: this.images[this.prevImage - 1] })
        });
        this.prevImage -= 1;
        this.nextImage -= 1;
      });
    }
  }

  selectedImageIndex = 0;
  prevImage = -2;
  nextImage = 2;
  currentHideLeftPosition = 1;
  currentHideRightPosition = 5;

  _nextCard = () => {
    console.log(this.selectedImageIndex)
    if (this.selectedImageIndex + 1 < this.images.length) {
      this.currentHideLeftPosition = (this.currentHideLeftPosition - 1) || 5;
      this.currentHideRightPosition = (this.currentHideRightPosition - 1) || 5;
      this.selectedImageIndex += 1;
      this.setState((prevState) => ({
        prev: this.prevPressed[prevState.prev],
        selected: this.prevPressed[prevState.selected],
        hideLeft: this.prevPressed[prevState.hideLeft],
        next: this.prevPressed[prevState.next],
        hideRight: this.prevPressed[prevState.hideRight],
      }), () => {
        ['hideLeft', 'prev', 'selected', 'next', 'hideRight'].forEach((current, index) => {
          if (this.state[current] === Styles.hideRight) this.setState({ [`image${index+1}`]: this.images[this.nextImage + 1] })
        })
        this.prevImage += 1;
        this.nextImage += 1;
      });
    } else console.log('No next images');
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
        <div>
        <img src={this.state.image1} />
        </div>
        
        </div>
        <div className = {this.state.prev}>
        <div>
        <img src={this.state.image2} />
        </div>
      </div>
      
      <div class = {this.state.selected}>
      <div>
        <img src={this.state.image3} />
        </div>
        <span>GOKU</span>
      </div>
      <div className = {this.state.next}>
        <div>
        <img src={this.state.image4} />
        </div>
      </div>
      <div className = {this.state.hideRight}>
      <div>
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
      
      </div>

    )
  }
}

export default AnimeCharacters;