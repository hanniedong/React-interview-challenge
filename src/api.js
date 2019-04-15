import timelineResponse from './data/timeline-response.json';

function encodeQueryData(data) {
  const ret = [];
  Object.keys(data).forEach(key => {
    ret.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
  });
  return ret.join('&');
}

// mock API call. don't review.
function fetchSessions() {
  return new Promise(resolve => {
    setTimeout(resolve(timelineResponse), 1000);
  });
}

// mock API call. don't review.
function requestSessionTimes(session_id, timeframe) {
  return new Promise(resolve => {
    setTimeout(resolve(timelineResponse), 1000);
  });
}

// mock API call. don't review.
function confirmSessionTime(session_id, session_time, scheduling_notes) {
  return new Promise(resolve => {
    setTimeout(resolve(timelineResponse), 1000);
  });
}

export default {
  fetchSessions,
  requestSessionTimes,
  confirmSessionTime,
};
