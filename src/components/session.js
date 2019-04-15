import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { COLOR_BEIGE, COLOR_PRIMARY, COLOR_GREY, COLOR_BLACK, COLOR_PRIMARY_DARK } from '../styles/common';
import doneIcon from '../images/iconDone.png';
import clockIcon from '../images/clock.png';
import { styles as globalStyles } from '../App';
import Modal from './modal';

export const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLOR_BEIGE,
    justifyContent: 'center',
    paddingBottom: 60,
  },
  form: {
    marginVertical: 30,
    marginHorizontal: 55,
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingVertical: 20,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    height: 10,
    width: 10,
  },
  detailsText: {
    fontSize: 16,
    color: 'rgb(144,164,174)',
    marginLeft: 6,
  },
  expectHeading: {
    fontSize: 18,
    color: 'rgb(82,91,98)',
    marginTop: 10,
    marginBottom: 5,
  },
  expectItems: {
    fontSize: 16,
    color: 'rgb(144,164,174)',
  },
  expertView: {
    flexDirection: 'column',
  },
  expertLine: {
    backgroundColor: '#eeeeee',
    height: 1,
    marginTop: 10,
  },
  expertTitleText: {
    fontSize: 18,
    color: 'rgb(82,91,98)',
    paddingTop: 5,
  },
  expertImageView: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  expertImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  expertDetailView: {
    marginLeft: 10,
    flex: 1,
  },
  expertName: {
    fontSize: 16,
    color: 'rgb(82,91,98)',
  },
  divider: {
    height: 1,
    backgroundColor: '#DFE6E3',
  },
  header: {
    fontSize: 20,
    margin: 20,
    marginBottom: 10,
    color: 'rgb(82,91,98)',
  },
  buttonRow: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  buttonText: {
    marginLeft: 5,
    marginTop: 9.5,
    color: 'rgb(82,91,98)',
    flex: 1,
    fontSize: 14,
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
  },
  modalDone: {
    fontSize: 14,
    fontWeight: '800',
    color: COLOR_PRIMARY,
  },
  modalFooter: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  nextButton: {
    marginRight: 15,
    width: 60,
  },
};

export default class Session extends Component {
  static propTypes = {
    confirm: PropTypes.func.isRequired,
    schedule: PropTypes.func.isRequired,
    sections: PropTypes.array.isRequired,
    sessionsRemaining: PropTypes.number,
    loading: PropTypes.bool,
    sectionIndex: PropTypes.number,
    sessionIndex: PropTypes.number,
  };

  static defaultProps = {
    loading: false,
    sessionsRemaining: 6,
  };

  constructor(props) {
    super(props);

    this.options = [
      'in whatever timeframe LUCY recommends',
      'within the next day or two',
      'within the next week',
      'within the next 2 weeks',
    ];
  }

  render() {
    let session;
    if (this.props.sectionIndex !== undefined && this.props.sessionIndex !== undefined) {
      session = this.session = this.props.sections[this.props.sectionIndex].sessions[this.props.sessionIndex];
    }
    if (session) {
      const status = session.status;
      const scheduledTime = moment(session.scheduled_for);
      let formattedTime;
      if (scheduledTime.isBefore('2017-08-15')) {
        formattedTime = scheduledTime.format('M[/]D');
      } else {
        formattedTime = scheduledTime.format('M[/]D [at] hh:mma');
      }
      let scheduledView;
      let modal;
      let expertName = '';
      if (session.expert && session.expert.name) {
        expertName = ` with ${session.expert.name}`;
      }
      const cancelView = (
        <div
          style={{
            marginTop: 10,
            alignSelf: 'center',
            textAlign: 'center',
            color: COLOR_GREY,
            backgroundColor: 'transparent',
          }}
        >
          {"Need to cancel or reschedule? Tap the 'Ask LUCY' button below to let us know."}
        </div>
      );
      let cancelMessage;
      switch (status) {
        case 'Completed':
          scheduledView = (
            <div style={{ textAlign: 'center' }}>
              <div style={styles.divider} />
              <div style={{ height: 48, flexDirection: 'row', alignItems: 'center' }}>
                <div style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <img src={doneIcon} style={{ marginLeft: 15 }} />
                  <span
                    style={{ fontSize: 14, marginLeft: 10, color: '#90A4AE', fontWeight: '500', flex: 1 }}
                  >{`Completed on ${formattedTime}${expertName}.`}</span>
                </div>
              </div>
            </div>
          );
          break;
        case 'Scheduled':
          cancelMessage = cancelView;
          scheduledView = (
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  height: 57,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderColor: COLOR_PRIMARY,
                  borderWidth: 1,
                  borderRadius: 4,
                  left: -8,
                  backgroundColor: 'white',
                }}
              >
                <div style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <img src={doneIcon} style={{ marginLeft: 15 }} />
                  <span
                    style={{ fontSize: 14, marginLeft: 10, color: COLOR_BLACK, flex: 1 }}
                  >{`Scheduled for ${formattedTime}${expertName}`}</span>
                </div>
                <button style={{ opacity: 0 }}>
                  <span style={{ fontSize: 14, color: COLOR_GREY, fontWeight: '600', marginRight: 15 }}>CANCEL</span>
                </button>
              </div>
              <div style={{ height: 10 }} />
            </div>
          );
          break;
        case 'Times Requested':
          cancelMessage = cancelView;
          let requestedString;
          if (session.scheduling_notes.length > 0) {
            requestedString = `Requested: ${session.requested_timeframe}`;
          } else {
            requestedString = 'Reschedule Request Received';
          }
          scheduledView = (
            <div style={{ textAlign: 'center' }}>
              <div style={styles.divider} />
              <div style={{ height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <img src={clockIcon} style={{ marginLeft: 10 }} />
                  <span style={{ fontSize: 14, marginLeft: 8,  fontWeight: '500' }}>
                    {requestedString}
                  </span>
                </div>
                <button style={{ opacity: 0 }}>
                  <span style={{ fontSize: 14, color: COLOR_GREY, fontWeight: '600', marginRight: 15 }}>CANCEL</span>
                </button>
              </div>
            </div>
          );
          break;
        case 'Times Provided':
          cancelMessage = cancelView;
          scheduledView = (
            <div style={{ textAlign: 'center' }}>
              <div style={styles.divider} />
              <button
                style={{ height: 48, justifyContent: 'center', alignItems: 'center' }}
                onClick={() => this.timeModal.showModal()}
              >
                <span style={{ fontSize: 18, color: COLOR_PRIMARY, fontWeight: '600' }}>View Available Times</span>
              </button>
            </div>
          );
          const options = [];
          for (let x = 1; ; x += 1) {
            if (this.session[`proposed_time_${x}`]) {
              options.push(moment(this.session[`proposed_time_${x}`]).format('dddd M[/]D [at] hh:mma'));
            } else {
              break;
            }
          }
          modal = (
            <Modal
              ref={c => {
                this.timeModal = c;
              }}
              header={`Select a time to confirm your session${expertName}:`}
              options={options}
              onSubmit={(datetime, message) => {
                if (datetime === null) {
                  this.props.confirm('none', message);
                } else {
                  this.props.confirm(options.indexOf(datetime) + 1, '');
                }
              }}
              loading={this.props.loading}
              allowNone
            />
          );
          break;
        default:
          if (this.props.sessionsRemaining > 0) {
            // unscheduled
            scheduledView = (
              <div style={{ textAlign: 'center' }}>
                <div style={styles.divider} />
                <button
                  style={{ height: 48, justifyContent: 'center', alignItems: 'center' }}
                  onClick={() => this.scheduleModal.showModal()}
                >
                  <span style={{ fontSize: 18, color: COLOR_PRIMARY, fontWeight: '600' }}>Schedule Session</span>
                </button>
              </div>
            );
            modal = (
              <Modal
                ref={c => {
                  this.scheduleModal = c;
                }}
                header={'I would like to schedule this session:'}
                options={this.options}
                onSubmit={timeframe => this.props.schedule(timeframe)}
                loading={this.props.loading}
              />
            );
          }
      }

      return (
        <div style={styles.container}>
          <div style={globalStyles.body}>
            <div>
              <div style={{ backgroundColor: COLOR_PRIMARY }}>
                <div style={{ fontSize: 23, color: 'white', padding: 20, textAlign: 'center', width: '100%' }}>
                  {session.session_type.title}
                </div>
              </div>
              <div
                style={{ alignItems: 'center', flexDirection: 'row', padding: 20, backgroundColor: COLOR_PRIMARY_DARK }}
              >
                <span style={{ color: 'white', marginRight: 20 }}>{`${session.session_type.timing}   -   ${
                  session.session_type.format
                }`}</span>
              </div>
            </div>
            <div style={{ margin: 20, minHeight: 500 }}>
              <span style={{ fontSize: 16, color: COLOR_BLACK, marginTop: 5 }}>{session.session_type.description}</span>
            </div>
            {scheduledView}
          </div>
          {cancelMessage}
          {modal}
        </div>
      );
    }
    return null;
  }
}
