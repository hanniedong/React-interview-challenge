import timelineResponse from './data/timeline-response.json'

const apiVersion = 'v1.0';
const hostName = 'https://staging.hicleo.com';
const baseURL = `${hostName}/api/${apiVersion}`;
const token = 'z5mVg9vxVEFaaBX4skyMTJ06Lcbpq0'

function encodeQueryData(data) {
  const ret = [];
  Object.keys(data).forEach(key => {
    ret.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
  });
  return ret.join('&');
}

function fetchSessions() {
  return new Promise(resolve => {
    setTimeout(resolve(timelineResponse), 1000)
  })
}

function requestSessionTimes(session_id, timeframe) {
  debugger
  return fetch(`${baseURL}/sessions/send_schedule_request/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      session_id,
      timeframe,
    }),
  });
}

function confirmSessionTime(session_id, session_time, scheduling_notes) {
  debugger
  return fetch(`${baseURL}/sessions/confirm_session_time/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      session_id,
      session_time,
      scheduling_notes,
    }),
  });
}

export default {
  fetchSessions,
  requestSessionTimes,
  confirmSessionTime,
};
