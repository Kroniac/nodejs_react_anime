import React, { Component, PureComponent } from 'react';
import Qs from 'qs';
import { string } from 'prop-types';
import axios from 'axios';
import Styles from './home.module.css';

export default class Home extends Component  {

  state = {
    animesList: [],
  }

  componentDidMount() {
    this._fetchAnimesData();
  }

  _fetchAnimesData = (page = 1) => {
      const fetchUrl = `http://localhost:5000/anime/anime`;
      axios(fetchUrl)
        .then((res) => {
          console.log(res.data.results);
          this.setState({ animesList: res.data.results });
        })
        .catch((err) => console.log(err));
  }

  render() {
    const { history } = this.props;
    const { animesList } = this.state;
    return (
      <div className = {Styles.root} >
        <div className = {Styles.colorOverlay} />
          <div className = {Styles.contentContainer}>
            {
              animesList.map((field) => (
                <ImageCardBox
                  imageSrc = {field.image_url}
                  title = {field.title}
                  listName = {field.characters_collection_name}
                  content = 'Enter the world of Fullmetal Alchemist'
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
    this.props.history.push('/anime_characters', {
      name: 'Farid'
    })
  }

  _fetchCharacters = (page = 1) => {
    const params = {
      list_name: this.props.listName,
    }
    const urlParameters = Qs.stringify(params);
    const fetchUrl = `http://localhost:5000/characters_list/characters_list?${urlParameters}`;
    axios(fetchUrl)
      .then((res) => {
        console.log(res.data.results);
        this.props.history.push('/anime_characters', {
          charactersList: res.data.results,
        })
      })
      .catch((err) => console.log(err));
}

  render() {
    const { imageSrc, title, content } = this.props;
    return (
      <div className = {Styles.container} onClick = {this._fetchCharacters} >
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