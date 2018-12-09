import React, { Component } from 'react';
import { string, func, bool, object } from 'prop-types';
import classes from './text_input.module.css';

export class AnimatedTextInput extends Component {
  static propTypes = {
    attrName: string.isRequired,
    title: string.isRequired,
    onChangeText: func.isRequired,
    inputValue: string,
    inputType: string,
    isDisabled: bool,
    size: string,
    textStyle: object,
  }

  static defaultProps = {
    inputType: 'Text',
    inputValue: '',
    isDisabled: false,
    size: 'Normal',
    textStyle: {}
  }

  state = {
    isFieldActive: false,
  }

  textInput = React.createRef();

  _onFieldFocusHandler = () => {
    this.setState({
      isFieldActive: true,
    });
  }

  _onFieldBlurHandler = (e) => {
    if (e.target.value === '') {
      this.setState({
        isFieldActive: false,
      });
    }
  }

  _changeTextHandler = (e) => {
    const { onChangeText, attrName } = this.props;
    onChangeText(attrName, e.target.value)
    this._onFieldFocusHandler();
    e.preventDefault();
  }

  _onLabelClicked = () => {
    this.textInput.current.focus();
  }

  _onFormSubmit = (event) => {
    event.preventDefault();
  }

  styleNames = {
    'Small': {
      wrapper: classes.wrapperSmall,
      label: classes.labelSmall,
      input: classes.inputSmall,
      fieldActive: classes.fieldActiveSmall,
    },
    'Normal':{
      wrapper: classes.wrapper,
      label: classes.label,
      input: classes.input,
      fieldActive: classes.fieldActive,
    }
  }

  render() {
    const { title, inputValue, inputType, isDisabled, size, textStyle } = this.props;
    return (
      <div className = {this.styleNames[size].wrapper}>
        <label
          onClick = {this._onLabelClicked}
          className={(this.state.isFieldActive || this.props.inputValue !== '') ? [this.styleNames[size].label, this.styleNames[size].fieldActive].join(" ") : this.styleNames[size].label}>
          {title}
        </label>
        <input
          className = {this.styleNames[size].input}
          ref = {this.textInput}
          style = {textStyle}
          type = {inputType}
          value = {inputValue}
          disabled = {isDisabled}
          onFocus = {this._onFieldFocusHandler}
          onBlur = {this._onFieldBlurHandler}
          onChange = {this._changeTextHandler}
        />
      </div>
    );
  }
}
