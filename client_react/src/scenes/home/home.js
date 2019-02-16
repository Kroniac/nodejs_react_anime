import React, { Component, PureComponent } from 'react';
import { string } from 'prop-types';
import axios from 'axios';
import Styles from './home.module.css';

export default class Home extends Component  {

  componentDidMount() {
    this._fetchAnimesData();
  }

  _fetchAnimesData = (page = 1) => {
      const fetchUrl = `http://localhost:5000/anime/anime`;
      axios(fetchUrl)
        .then((res) => {
          console.log(res.data);
          // this.setState({ feedsData: res.data.results });
        })
        .catch((err) => console.log(err));
  }

  imageCardFields = [
    {
      imageSrc: require('../../images/clover.jpg'),
      title: 'Black Clover',
      content: 'Enter the world of Black Clover'
    },
    {
      imageSrc: require('../../images/goku1.jpg'),
      title: 'Dragon Ball',
      content: 'Enter the world of Dragon Ball'
    },
    {
      imageSrc: require('../../images/academia.jpg'),
      title: 'Hero Academia',
      content: 'Enter the world of Hero Academia'
    },
    {
      imageSrc: require('../../images/foodwars.jpg'),
      title: 'Food Wars',
      content: 'Enter the world of Food Wars'
    },
    {
      imageSrc: require('../../images/fairytail.jpg'),
      title: 'Fairy Tail',
      content: 'Enter the world of Fairy Tail'
    },
    {
      imageSrc: require('../../images/fullmetal.jpg'),
      title: 'Fullmetal Alchemist',
      content: 'Enter the world of Fullmetal Alchemist'
    }
  ];

  render() {
    const { history } = this.props;
    return (
      <div className = {Styles.root} >
        <div className = {Styles.colorOverlay} />
          <div className = {Styles.contentContainer}>
            {
              this.imageCardFields.map((field) => (
                <ImageCardBox
                  imageSrc = {field.imageSrc}
                  title = {field.title}
                  content = {field.content}
                  history = {history}
                />
              ))
            }
          </div>
      </div>
    )
  }
}

class ImageCardBox extends PureComponent {
  static propTypes = {
    imageSrc: string.isRequired,
    title: string.isRequired,
    content: string.isRequired,
  }

  _onImageCardBoxClick = () => {
    this.props.history.push('/anime_characters')
  }

  render() {
    const { imageSrc, title, content } = this.props;
    return (
      <div className = {Styles.container} onClick = {this._onImageCardBoxClick} >
        <figure className = {Styles.effectRuby} >
          <img src = {imageSrc} alt = {title}/>
          <figcaption>
          <h2>{title}</h2>
          <p>{content}</p>
          </figcaption>
        </figure>
      </div>
    )
  }
}