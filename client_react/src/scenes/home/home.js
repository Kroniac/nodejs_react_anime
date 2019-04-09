import React, { Component, PureComponent } from 'react';
import Qs from 'qs';
import { string } from 'prop-types';
import axios from 'axios';
import Styles from './home.module.css';

import { Config, Libs, SharedUI } from '../../config/import_paths';

const { ApiUrls } = Config.ApiUrls();

const { StandardNetErrorHandling, GetNetErrorCode } = Libs.Networking();

const { LoadingOverlay } = SharedUI.LoadingOverlay();
const { Snackbar } = SharedUI.SnackBar();


export default class Home extends Component {
  static propTypes = {
    history: string.isRequired,
  }

  state = {
    animesList: [],
    isLoadingOverlayVisible: false,
  }

  snackBarRef = React.createRef();

  componentDidMount() {
    axios.defaults.timeout = 5000;
    this._fetchAnimesData();
  }

  _fetchAnimesData = () => {
    this.setState({ isLoadingOverlayVisible: true });
    const url = ApiUrls.baseUrl + ApiUrls.getAnimeList;
    axios(url)
      .then((res) => {
        this.setState({ 
          animesList: res.data.results,
          isLoadingOverlayVisible: false,
        });
      })
      .catch((err) => {
        this.setState({ isLoadingOverlayVisible: false });
        const errorCode = GetNetErrorCode(err);
        let snackBarMessage = 'Something went wrong';
        if (errorCode) {
          snackBarMessage = `Something went wrong: ${errorCode}`;
        }
        this._openSnackBar(snackBarMessage);
        StandardNetErrorHandling(err);
      });
  }

  _fetchCharacters = (collectionName) => {
    this.setState({ isLoadingOverlayVisible: true })
    const params = {
      list_name: collectionName,
    };
    const urlParameters = Qs.stringify(params);
    const fetchUrl = `http://localhost:5000/characters_list/characters_list?${urlParameters}`;
    axios(fetchUrl)
      .then((res) => {
        this.props.history.push('/anime_characters', {
          charactersList: res.data.results,
        });
      })
      .catch((err) => {
        this.setState({ isLoadingOverlayVisible: false });
        const errorCode = GetNetErrorCode(err);
        let snackBarMessage = 'Something went wrong';
        if (errorCode) {
          snackBarMessage = `Something went wrong: ${errorCode}`;
        }
        this._openSnackBar(snackBarMessage);
        StandardNetErrorHandling(err);
      });
  }

  _openSnackBar = (message = 'Something went wrong...') => {
    if (this.snackBarRef.current) this.snackBarRef.current.openSnackBar(message);
  }

  render() {
    const { animesList, isLoadingOverlayVisible } = this.state;
    return (
      <div className = {Styles.root}>
        <div className = {Styles.colorOverlay} />
        <div className = {Styles.contentContainer}>
          {
            animesList.map(field => (
              <ImageCardBox
                imageSrc = {field.image_url}
                title = {field.title}
                animeCharactersCollectionName = {field.characters_collection_name}
                content = "Enter the world of Fullmetal Alchemist"
                fetchCharacters = {this._fetchCharacters}
              />
            ))
          }
        </div>
        {isLoadingOverlayVisible ? <LoadingOverlay /> : null}
        <Snackbar ref = {this.snackBarRef} />
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
    const { animeCharactersCollectionName, fetchCharacters } = this.props;
    fetchCharacters(animeCharactersCollectionName);
  }

  render() {
    const { imageSrc, title, content } = this.props;
    return (
      <div
        role = "button"
        className = {Styles.container}
        onClick = {this._onImageCardBoxClick}
      >
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