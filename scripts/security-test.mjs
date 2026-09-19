import twilio from 'twilio';

const base = process.env.BASE_URL || 'http://127.0.0.1:3000';
const token = process.env.TWILIO_AUTH_TOKEN || 'ci-test-token';

function signature(url, params) {
  return twilio.getExpectedTwilioSignature(token, url, params);
}

async function request(path, params, sig) {
  const body = new URLSearchParams(params);
  return fetch(base + path, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'x-twilio-signature': sig
    },
    body
  });
}

const incomingUrl = base + '/voice/incoming';
const incomingParams = {};
const incomingValid = await request(
  '/voice/incoming',
  incomingParams,
  signature(incomingUrl, incomingParams)
);

if (incomingValid.status !== 200) {
  throw new Error(`valid incoming signature returned ${incomingValid.status}`);
}

const incomingInvalid = await request(
  '/voice/incoming',
  incomingParams,
  'invalid-signature'
);

if (incomingInvalid.status !== 403) {
  throw new Error(`invalid incoming signature returned ${incomingInvalid.status}, expected 403`);
}

const responseUrl = base + '/voice/respond';
const responseParams = {
  SpeechResult: 'What are your opening hours?'
};

const responseValid = await request(
  '/voice/respond',
  responseParams,
  signature(responseUrl, responseParams)
);

if (responseValid.status !== 200) {
  throw new Error(`valid response signature returned ${responseValid.status}`);
}

console.log('PASS valid Twilio signature -> accepted');
console.log('PASS invalid Twilio signature -> rejected');
console.log('PASS signed speech response -> accepted');
