import React, { Component } from 'react';
import { oneOfType, string, number, object, shape } from 'prop-types';
import Styles from './anime_characters.module.css';
import { SharedUI } from '../../config/import_paths';

const { Button } = SharedUI.Button();
const { Snackbar } = SharedUI.SnackBar();

class AnimeCharacters extends Component {
  selectedImageIndex = 0;

  prevImage = -2;

  nextImage = 2;

  currentHideLeftPosition = 1;

  currentHideRightPosition = 5;

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

  snackBarRef = React.createRef();

  constructor(props) {
    super(props);
    const { location } = this.props;
    this.images = location.state.charactersList;
    this.imagesX = [
      {
        background_color: 'linear-gradient(to top right, red , orange)',
        image: require('../../images/goku1.png'),
        title: 'Son Goku',
        detail: 'Goku (孫そん悟ご空くう Son Gokū), born Kakarot (カカロット Kakarotto, lit. "Cacarrot"), is a male Saiyan and the main protagonist of the Dragon Ball series.',
      },
      {
        background_color: 'linear-gradient(to top right, blue , lightblue)',
        image: require('../../images/vegeta.png'),
        title: 'Vegeta',
        detail: 'Vegeta (ベジータ Bejīta), more specifically Vegeta IV (ベジータ四世 Bejīta IV, "Vegeta the Fourth")[5], is the prince of the fallen Saiyan race and the deuteragonist of the Dragon Ball series. He is the eldest son of Vegeta III, the older brother of Tarble, the husband of Bulma, the father of Trunks and Bulla, and the ancestor of Vegeta Jr.',
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
      image3: this.images.length > 0 ? this.images[0] : null,
      image4: this.images.length > 1 ? this.images[1] : null,
      image5: this.images.length > 2 ? this.images[2] : null,
    }
  }

  _prevCard = () => {
    if (this.selectedImageIndex === 0) this._openSnackBar('No Previous Images');
    else {
      this.currentHideLeftPosition = (this.currentHideLeftPosition + 1) % 6 || 1;
      this.currentHideRightPosition = (this.currentHideRightPosition + 1) % 6 || 1;
      this.selectedImageIndex -= 1;
      this.setState(prevState => ({
        prev: this.nextPressed[prevState.prev],
        selected: this.nextPressed[prevState.selected],
        hideLeft: this.nextPressed[prevState.hideLeft],
        next: this.nextPressed[prevState.next],
        hideRight: this.nextPressed[prevState.hideRight],
      }), () => {
        ['hideLeft', 'prev', 'selected', 'next', 'hideRight'].forEach((current, index) => {
          if (this.state[current] === Styles.hideLeft) {
            this.setState({ [`image${index + 1}`]: this.images[this.prevImage - 1] })
          }
        });
        this.prevImage -= 1;
        this.nextImage -= 1;
      });
    }
  }

  _nextCard = () => {
    if (this.selectedImageIndex + 1 < this.images.length) {
      this.currentHideLeftPosition = (this.currentHideLeftPosition - 1) || 5;
      this.currentHideRightPosition = (this.currentHideRightPosition - 1) || 5;
      this.selectedImageIndex += 1;
      this.setState(prevState => ({
        prev: this.prevPressed[prevState.prev],
        selected: this.prevPressed[prevState.selected],
        hideLeft: this.prevPressed[prevState.hideLeft],
        next: this.prevPressed[prevState.next],
        hideRight: this.prevPressed[prevState.hideRight],
      }), () => {
        ['hideLeft', 'prev', 'selected', 'next', 'hideRight'].forEach((current, index) => {
          if (this.state[current] === Styles.hideRight) this.setState({ [`image${index + 1}`]: this.images[this.nextImage + 1] })
        })
        this.prevImage += 1;
        this.nextImage += 1;
      });
    } else this._openSnackBar('No Next Images');
  }

  _returnCardDetails = () => [
    {
      classStyles: this.state.hideLeft,
      valueObj: this.state.image1,
    }, {
      classStyles: this.state.prev,
      valueObj: this.state.image2,
    }, {
      classStyles: this.state.selected,
      valueObj: this.state.image3,
    }, {
      classStyles: this.state.next,
      valueObj: this.state.image4,
    }, {
      classStyles: this.state.hideRight,
      valueObj: this.state.image5,
    },
  ]

  _openSnackBar = (message = 'Something went wrong...') => {
    if (this.snackBarRef.current) this.snackBarRef.current.openSnackBar(message);
  }

  render() {
    return (
      <div className = {Styles.root}>
        <div className = {Styles.carasoul}>
          {
            this._returnCardDetails().map(cardDetail => (
              cardDetail.valueObj ? (
                <ImageCard
                  classStyles = {cardDetail.classStyles}
                  valueObj = {cardDetail.valueObj}
                />
              ) : null
            ))
          }
          <div className = {Styles.buttons}>
            <Button mode = "raised" design = "accent" onClick = {this._prevCard}>
              Prev
            </Button>
            <Button mode = "raised" design = "accent" onClick = {this._nextCard}>
              Next
            </Button>
          </div>
        </div>
        <Snackbar ref = {this.snackBarRef} />
      </div>
    );
  }
}


class ImageCard extends Component {
  static propTypes = {
    classStyles: oneOfType([number, object, string]).isRequired,
    valueObj: shape({
      title: string.isRequired,
      image_url: string.isRequired,
      details: string,
    }).isRequired,
  }

  render() {
    const { classStyles, valueObj } = this.props;
    return (
      <div
        style = {{ backgroundImage: valueObj.background_color }}
        className = {classStyles}
      >
        <span className = {Styles.cardHeaderSection}>
          <span className = {Styles.imager}>
            <img alt = {valueObj.title} src = {valueObj.image_url} />
          </span>
          <span
            className = {Styles.cardTitle}
          >
            {valueObj.title}
          </span>
        </span>
        <span className = {Styles.cardDetailText}>
          {valueObj.detail}
        </span>
      </div>
    )
  }
}
export default AnimeCharacters;