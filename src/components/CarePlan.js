import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import api from '../api';
import doneIcon from '../images/iconDone.png';
import logoGreenIcon from '../images/logoGreen.png';
import pendingIcon from '../images/clock.png';
import moonIcon from '../images/moon.png';
import newbornIcon from '../images/newborn.png';
import lactationIcon from '../images/lactation.png';
import parentingIcon from '../images/parenting.png';
import starIcon from '../images/star_green.png';
import moneyIcon from '../images/money.png';
import birthIcon from '../images/birth.png';
import briefcaseIcon from '../images/briefcase.png';
import benefitsIcon from '../images/benefits.png';
import fitnessIcon from '../images/fitness.png';
import nutritionIcon from '../images/nutrition.png';
import spaIcon from '../images/spa.png';
import { COLOR_PRIMARY, COLOR_BEIGE, COLOR_BLACK, COLOR_PRIMARY_DARK } from '../styles/common';

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLOR_BEIGE,
  },
  listContainer: {
    paddingBottom: 55,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: 5,
    marginHorizontal: 7,
  },
  leftContainer: {
    width: 25,
  },
  details: {
    flex: 1,
  },
  innerDetails: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: '2em',
    margin: '.25em',
    marginLeft: '2em',
    marginRight: '2em',
  },
  title: {
    fontSize: 20,
    marginRight: 25,
    marginBottom: 5,
  },
  greenCircle: {
    width: 17,
    height: 17,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: 'rgb(201,239,223)',
    backgroundColor: COLOR_PRIMARY,
    position: 'absolute',
    left: 3,
    top: 5,
  },
  greyCircle: {
    width: 15,
    height: 15,
    borderWidth: 3,
    borderColor: 'rgb(225,225,229)',
    borderRadius: 10,
    position: 'absolute',
    left: 4,
    top: 5,
  },
  iconStyle: {
    position: 'absolute',
    right: 10,
    top: 14,
    height: 34,
    width: 34,
    borderRadius: 17,
  },
  error: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    marginTop: 20,
  },
  errorMessageText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
  },
  timeline: {
    width: 3,
    bottom: -15,
    borderRadius: 2,
    position: 'absolute',
    left: -15,
    top: 25,
  },
  state: {
    fontSize: 11,
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    marginBottom: 5,
  },
  timeIcon: {
    height: 18,
    width: 18,
  },
  timeText: {
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '700',
  },
  circle: {
    marginRight: 15,
    marginTop: 6,
    borderRadius: 100,
    width: 28,
    height: 28,
    backgroundColor: '#6F80E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    fontSize: 20,
    textAlign: 'center',
    color: COLOR_BLACK,
    padding: 10,
  },
  textRemaining: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
    backgroundColor: COLOR_PRIMARY_DARK,
    padding: 10,
  },
};

const ICONS = {
  'Benefits Planning': benefitsIcon,
  'Preparing to Wear': moonIcon,
  Other: moonIcon,
  Welcome: moonIcon,
  Sleep: moonIcon,
  Parenting: parentingIcon,
  Nutrition: nutritionIcon,
  'Newborn Care': newbornIcon,
  Lactation: lactationIcon,
  'Fitness & PT': fitnessIcon,
  'Financial Planning': moneyIcon,
  'Emotional Wellness': spaIcon,
  'Child Development': newbornIcon,
  'Career Coaching': briefcaseIcon,
  Bodywork: spaIcon,
  'Birth Prep': birthIcon,
};

const ICON_SIZE = {
  'Benefits Planning': 18,
  'Preparing to Wear': 18,
  Other: 18,
  Welcome: 18,
  Sleep: 18,
  Parenting: 20,
  Nutrition: 18,
  'Newborn Care': 18,
  Lactation: 20,
  'Fitness & PT': 18,
  'Financial Planning': 18,
  'Emotional Wellness': 20,
  'Child Development': 18,
  'Career Coaching': 18,
  Bodywork: 20,
  'Birth Prep': 18,
};

const COLORS = {
  'Benefits Planning': '#63C59F',
  'Preparing to Wear': '#6F80E8',
  Other: '#6F80E8',
  Welcome: '#6F80E8',
  Sleep: '#6F80E8',
  Parenting: '#e86f77',
  Nutrition: '#F1A260',
  'Newborn Care': '#e86f77',
  Lactation: '#F1A260',
  'Fitness & PT': '#4CBFE6',
  'Financial Planning': '#63C59F',
  'Emotional Wellness': '#e06fe8',
  'Child Development': '#e86f77',
  'Career Coaching': '#63C59F',
  Bodywork: '#e06fe8',
  'Birth Prep': '#4CBFE6',
};

export default class SessionList extends Component {
  static propTypes = {
    onSessionClicked: PropTypes.func.isRequired,
    error: PropTypes.bool,
    sessionsRemaining: PropTypes.number,
    sessionsTotal: PropTypes.number,
  };

  static defaultProps = {
    error: false,
    sessionsRemaining: 4,
    sessionsTotal: 6,
  };

  constructor(props) {
    super(props);

    this.state = {
      carePlan: null,
    };

    this.renderItem = this.renderItem.bind(this);
  }

  renderItem({ item, index, section, sectionIndex }) {
    const titleColor = item.status === 'Completed' ? 'dimgrey' : 'dimgrey';
    const timelineColor = item.status === 'Completed' ? COLOR_PRIMARY : 'lightgrey';
    const scheduledTime = moment(item.scheduled_for);
    let formattedTime;
    if (scheduledTime.isBefore('2017-08-15')) {
      formattedTime = scheduledTime.format('ddd MMM D');
    } else {
      formattedTime = scheduledTime.format('ddd MMM D [at] hh:mm A');
    }

    const TimeView = ({ text, icon, color = 'dimgrey' }) => (
      <div style={styles.time}>
        <img style={[styles.timeIcon]} src={icon} />
        <span style={[styles.timeText, { color: color }]}>{text}</span>
      </div>
    );
    let timeView;
    let recommended;
    switch (item.status) {
      case 'Completed':
        timeView = <TimeView text={`Completed: ${formattedTime}`} icon={doneIcon} />;
        break;
      case 'Scheduled':
        timeView = <TimeView text={`Scheduled: ${formattedTime}`} icon={doneIcon} />;
        break;
      case 'Times Requested':
        if (item.scheduling_notes.length > 0) {
          timeView = <TimeView text={`Requested: ${item.requested_timeframe}`} icon={pendingIcon} />;
        } else {
          timeView = <TimeView text={`Reschedule Request Received`} icon={pendingIcon} />;
        }
        break;
      case 'Times Provided':
        timeView = (
          <TimeView text={'Times available - please select a time'} icon={pendingIcon} color={COLOR_PRIMARY} />
        );
        break;
      default:
        if (item.recommended) {
          recommended = (
            <div style={{ flexDirection: 'row', flex: 1, alignItems: 'center', marginBottom: 5 }}>
              <img style={{ height: 10, width: 10 }} src={starIcon} />
              <i style={[styles.timeText, { color: COLOR_PRIMARY, marginLeft: 5 }]}>Recommended</i>
            </div>
          );
        }
    }
    let timeline;
    if (parseInt(index, 10) !== this.state.carePlan.length - 1) {
      timeline = <div style={[styles.timeline, { backgroundColor: timelineColor }]} />;
    }

    return (
      <div style={styles.row} key={index}>
        <div style={[styles.details, { display: 'flex' }]}>
          {timeline}
          <div onClick={() => this.props.onSessionClicked(sectionIndex, index, this.state.carePlan)} style={{ flex: 1 }}>
            <div style={styles.innerDetails}>
              <div style={{ flexDirection: 'row' }}>
                <div style={[styles.circle, { backgroundColor: COLORS[item.session_type.category_name] }]}>
                  <img
                    style={{
                      height: ICON_SIZE[item.session_type.category_name],
                      width: ICON_SIZE[item.session_type.category_name],
                    }}
                    src={ICONS[item.session_type.category_name]}
                  />
                </div>
                <div style={{ flexDirection: 'column', flex: 1 }}>
                  {recommended}
                  <h4 style={[styles.title, { color: titleColor }]}>{item.session_type.title}</h4>
                  {timeView}
                  <div>{item.session_type.description.slice(0, item.session_type.description.indexOf('.') + 1)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (!this.state.carePlan) {
      api.fetchSessions().then(resp => this.setState({ carePlan: resp.care_plan }));
    }

    let listView;
    if (this.props.error) {
      listView = (
        <div style={styles.error}>
          <img  src={logoGreenIcon} />
          <div style={styles.errorMessage}>
            <span style={styles.errorMessageText}>
              {
                'Apologies!\nSomething went wrong with your plan. Our team has been notified and youâ€™ll be hearing from us soon. You can also contact us via the Ask LUCY button'
              }
            </span>
          </div>
        </div>
      );
    } else if (!this.state.carePlan) {
      listView = <div style={styles.error}>Loading...</div>;
    } else {
      listView = (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={styles.textRemaining}>{`${this.props.sessionsRemaining} out of ${
            this.props.sessionsTotal
          } sessions remaining`}</span>
          <div style={styles.listContainer}>
            {this.state.carePlan.map((section, sectionIndex) => (
              <div key={sectionIndex} style={{ display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ textAlign: 'center' }}>{section.title}</h2>
                {section.sessions.map((item, sessionIndex) =>
                  this.renderItem({ item: item, index: sessionIndex, section: section, sectionIndex: sectionIndex }),
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return <div style={styles.container}>{listView}</div>;
  }
}
