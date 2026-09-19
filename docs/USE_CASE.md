# Use Case

## Purpose

This project is a development/testing demonstration of Twilio Programmable Voice connected to a small Node.js application and an optional local AI model.

## Intended behavior

A verified or explicitly consenting tester manually calls a Twilio number. Twilio sends the inbound call to the HTTPS webhook. The application clearly identifies itself as a development demo, gathers speech, optionally asks a local Ollama model for a short reply, and returns TwiML.

## Initial restrictions

- inbound testing only;
- no unsolicited outreach;
- no marketing or advertising;
- no mass dialing;
- no purchased or scraped contact lists;
- no credential, OTP, or payment-card collection;
- no call recording in the initial demo.

The project is intended to give Twilio a concrete, auditable technical artifact for compliance review.
