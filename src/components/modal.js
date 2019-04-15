import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { COLOR_PRIMARY, COLOR_BLACK } from '../styles/common';
import { styles as globalStyles } from '../App';
import { styles } from './session';

Modal.setAppElement('#root');

export default class Session extends Component {
  static propTypes = {
    header: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSubmit: PropTypes.func.isRequired,
    allowNone: PropTypes.bool,
  };

  static defaultProps = {
    allowNone: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      selectedOption: '',
      showText: false,
      message: '',
    };

    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.options = props.options;
    this.noneOption = 'No times work';
    if (props.allowNone) {
      this.options.push(this.noneOption);
    }
  }

  onSubmit() {
    if (this.state.showText) {
      this.props.onSubmit(null, this.state.message);
    } else if (this.props.allowNone && this.state.selectedOption === this.noneOption) {
      this.setState({ showText: true });
    } else {
      this.props.onSubmit(this.state.selectedOption, '');
    }
  }

  hideModal() {
    this.setState({ isModalVisible: false });

    // Clear state once modal is off screen
    setTimeout(() => this.setState({ selectedOption: '', showText: false }), 500);
  }

  showModal() {
    this.setState({ isModalVisible: true });
  }

  render() {
    let submit;
    if (this.props.loading) {
      submit = <div>Loading...</div>;
    } else {
      submit = <span style={styles.modalDone}>Submit</span>;
    }
    let body;
    if (this.state.showText) {
      body = (
        <div style={{ height: 184, marginHorizontal: 20, alignItems: 'center', justifyContent: 'center' }}>
          <textarea
            placeholder="Tell us more..."
            onChangeText={message => this.setState({ message })}
            style={{ height: 160, width: '100%', flex: 1, fontSize: 16, color: COLOR_BLACK }}
            value={this.state.message}
          />
        </div>
      );
    } else {
      body = this.options.map((option, i) => (
        <button style={styles.buttonRow} key={i} onClick={() => {}}>
          <input
            type="radio"
            ref={c => {
              this[`checkbox${i}`] = c;
            }}
          />
          <span style={styles.buttonText}>{option}</span>
        </button>
      ));
    }

    let header = this.props.header;
    if (this.state.showText) {
      header = 'Please tell us more about your upcoming availability';
    }
    return (
      <Modal isOpen={this.state.isModalVisible} onRequestClose={this.hideModal}>
        <div style={styles.modal}>
          <div style={[globalStyles.body, { width: 280 }]}>
            <span style={styles.header}>{header}</span>
            <div style={styles.divider} />
            <div style={{ marginBottom: 10 }}>{body}</div>
            <div style={styles.divider} />
            <div style={styles.modalFooter}>
              <button style={[styles.nextButton, { marginRight: 20 }]} onClick={this.hideModal}>
                <span style={styles.modalDone}>Cancel</span>
              </button>
              <button disabled={this.state.selectedOption === ''} style={styles.nextButton} onClick={this.onSubmit}>
                {submit}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
