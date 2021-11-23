import twilio from 'twilio';
import { credencialesTwilio } from './../config'


export const client = twilio(credencialesTwilio.accountSid, credencialesTwilio.authToken);