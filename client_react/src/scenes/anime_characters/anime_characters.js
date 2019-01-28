import React, { Component } from 'react';
import Styles from './anime_characters.module.css';
import { SharedUI } from '../../config/import_paths';

const { Button } = SharedUI.Button();

class AnimeCharacters extends Component {
  constructor(props) {
    super(props);
    this.images = [
      {
        background_color: 'linear-gradient(to top right, red , orange)',
        image: require('../../images/goku1.png'),
        title: 'Son Goku',
        detail: 'Goku is a Saiyan',
      },
      {
        background_color: 'linear-gradient(to top right, blue , lightblue)',
        image: require('../../images/vegeta.png'),
        title: 'Vegeta',
        detail: 'Goku is a Saiyan',
      },
      {
        background_color: 'linear-gradient(to top right, red , orange)',
        image: require('../../images/master_roshi.png'),
        title: 'Master Roshi',
        detail: 'Goku is a Saiyan',
      },
      {
        background_color: 'linear-gradient(to top right, orange , yellow)',
        image: require('../../images/goku_kid.png'),
        title: 'Kid Goku',
        detail: 'Goku is a Saiyan',
      },
      {
        background_color: 'linear-gradient(to top right, purple , orchid)',
        image: require('../../images/freeza.png'),
        title: 'Freeza',
        detail: 'Goku is a Saiyan',
      },
      {
        background_color: 'linear-gradient(to top right, green , lightgreen)',
        image: require('../../images/broly.png'),
        title: 'Broly',
        detail: 'Goku is a Saiyan',
      },
      
      
      
      
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
    const { image1, image2, image3, image4, image5 } = this.state;
    return (
      <div className = {Styles.root} >
        <div className = {Styles.carasoul} >
        {
          image1 ? (
            <div style = {{ backgroundImage: image1.background_color }} className={this.state.hideLeft}>
              <span className = {Styles.cardHeaderSection} >
              <span className = {Styles.imager} >
                <img src={this.state.image1.image} />
              </span>
              <div>
              </div>
              <span
                className = {Styles.cardTitle}
              >
                {image1.title}
              </span>
              </span>
              <span className = {Styles.cardDetailText} >
                {image1.detail}
              </span>
            </div>
          ) : null
        }
        {
          image2 ? (
            <div style = {{ backgroundImage: image2.background_color }} className = {this.state.prev}>
              <span className = {Styles.cardHeaderSection} >
              <span className = {Styles.imager} >
                <img src={this.state.image2.image} />
              </span>
              <div>
              </div>
              <span
                className = {Styles.cardTitle}
              >
                {image2.title}
              </span>
              </span>
              <span className = {Styles.cardDetailText} >
                {image2.detail}
              </span>
            </div>
          ) : null
        }
        {
          image3 ? (
            <div style = {{ backgroundImage: image3.background_color }} className = {this.state.selected}>
            <span className = {Styles.cardHeaderSection} >
              <span className = {Styles.imager} >
                <img src={this.state.image3.image} />
              </span>
              <div>
              </div>
              <span
                className = {Styles.cardTitle}
              >
                {image3.title}
              </span>
              </span>
              <span className = {Styles.cardDetailText} >
                {image3.detail}
              </span>
            </div>
          ) : null
        }
        {
          image4 ? (
            <div style = {{ backgroundImage: image4.background_color }} className = {this.state.next}>
                <span className = {Styles.cardHeaderSection} >
              <span className = {Styles.imager} >
                <img src={this.state.image4.image} />
              </span>
              <div>
              </div>
              <span
                className = {Styles.cardTitle}
              >
                {image4.title}
              </span>
              </span>
              <span className = {Styles.cardDetailText} >
                {image4.detail}
              </span>
            </div>
          ) : null
        }
        {
          image5 ? (
            <div style = {{ backgroundImage: image5.background_color }} className = {this.state.hideRight}>
              <span className = {Styles.cardHeaderSection} >
              <span className = {Styles.imager} >
                <img src={this.state.image5.image} />
              </span>
              <div>
              </div>
              <span
                className = {Styles.cardTitle}
              >
                {image5.title}
              </span>
              </span>
              <span className = {Styles.cardDetailText} >
                {image5.detail}
              </span>
            </div>
          ) : null
        }
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