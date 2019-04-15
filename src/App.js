import React, { Component } from 'react';
import api from './api'
import { COLOR_BEIGE, COLOR_PRIMARY } from './styles/common';
import CarePlan from './components/CarePlan';
import Session from './components/session';
import logo from './images/logo.png';

export const styles = {
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLOR_BEIGE,
    justifyContent: 'center',
    minHeight: '100%',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLOR_BEIGE,
    justifyContent: 'center',
    minHeight: '85vh',
  },
  header: {
    backgroundColor: COLOR_PRIMARY,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '15vh',
  },
  body: {
    marginHorizontal: 16,
    backgroundColor: 'white',
  },
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 'care-plan',
    };
  }

  renderCarePlan() {
    return (
      <CarePlan
        onSessionClicked={(sectionIndex, sessionIndex, sections) => {
          this.setState({ page: 'session' });
          this.setState({ sectionIndex, sessionIndex, sections });
        }}
      />
    );
  }

  renderSession() {
    return (
      <Session
        sectionIndex={this.state.sectionIndex}
        sessionIndex={this.state.sessionIndex}
        sections={this.state.sections}
        confirm={api.confirmSessionTime}
        schedule={api.requestSessionTimes}
      />
    );
  }

  render() {
    return (
      <div style={styles.mainContainer}>
        <div style={styles.header} onClick={() => this.setState({ page: 'care-plan' })}>
          <img src={logo} />
        </div>

        <div style={styles.contentContainer}>
          <div style={styles.body}>
            {this.state.page === 'session'
              ? this.renderSession()
              : this.state.page === 'care-plan'
              ? this.renderCarePlan()
              : 'Page not found'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
