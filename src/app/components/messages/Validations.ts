import { defineMessages } from 'react-intl';

export default function initValidations() {
  defineMessages({
    validation_error_required: {
      id: 'validation.error.required',
      defaultMessage: 'This field is required.',
    },
    validation_error_number: {
      id: 'validation.error.number',
      defaultMessage: 'Please enter a number.',
    },
    validation_error_url: {
      id: 'validation.error.url',
      defaultMessage: 'Please enter a valid URL.',
    },
    validation_error_max_length: {
      id: 'validation.error.max_length',
      defaultMessage: 'This field exceeds the character limit.',
    },
  });
}
