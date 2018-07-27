import buildMessage from 'ember-changeset-validations/utils/validation-errors';
import { validate } from 'ember-validators';

export default function validateConfirmation(options = {}) {
  return (key, newValue, _oldValue, _changes, content) => {
    let result = validate('confirmation', newValue, options, content, key);
    return (result === true) ? true : buildMessage(key, result);
  };
}
