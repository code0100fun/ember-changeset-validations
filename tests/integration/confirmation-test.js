import { module, test } from 'qunit';
import validateConfirmation from 'ember-changeset-validations/validators/confirmation';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';

const PasswordChangeValidations = {
  newPasswordConfirmation: [
    validateConfirmation({ on: 'newPassword' }),
  ],
};

module('Integration | Validator | confirmation', {
  beforeEach() {
    this.model = {
      newPassword: null,
      newPasswordConfirmation: null,
    };
    this.changeset = new Changeset(
      this.model,
      lookupValidator(PasswordChangeValidations),
      PasswordChangeValidations
    );
  },
});

test('transitions from invalid to valid on related property change', function(assert) {
  this.model.newPassword = 'almos';
  this.model.newPasswordConfirmation = 'almost';

  this.changeset.validate();

  assert.notOk(this.changeset.get('isValid'), 'initially invalid');

  this.model.newPassword = 'almost';
  this.changeset.validate();

  assert.ok(this.changeset.get('isValid'), 'becomes valid');
});

test('transitions from valid to invalid on related property change', function(assert) {
  this.model.newPassword = 'almost';
  this.model.newPasswordConfirmation = 'almost';

  this.changeset.validate();

  assert.ok(this.changeset.get('isValid'), 'initially valid');

  this.model.newPassword = 'almos';
  this.changeset.validate();

  assert.notOk(this.changeset.get('isValid'), 'becomes invalid');
});
