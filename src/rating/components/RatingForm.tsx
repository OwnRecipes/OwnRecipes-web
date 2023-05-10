import { useCallback, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';
import { Field, Form as ReduxForm, FormSpy } from 'react-final-form';

import { Rating, RatingCreate, RatingUpdate } from '../store/types';
import InitialValuesResetter from '../../common/components/ReduxForm/ReInitialValuesResetter';
import ReInput from '../../common/components/ReduxForm/ReInput';
import { requiredValidator, ValidationResult } from '../../common/store/Validation';
import ReFormStatus from '../../common/components/ReduxForm/ReFormStatus';
import Ratings from './Ratings';
import { RatingEditor, RatingTimestamp } from './RatingView';
import classNames from 'classnames';
import { Toolbar } from '../../common/components/Toolbar';

const messages = defineMessages({
  edit_rating_title: {
    id: 'rating.form.edit.title',
    description: 'Fieldset legend for editing a rating',
    defaultMessage: 'Comment by {username}',
  },
  new_rating_title: {
    id: 'rating.form.create.title',
    description: 'Fieldset legend for creating a new rating',
    defaultMessage: 'Your new rating',
  },
  rating_label: {
    id: 'rating.form.rating_label',
    description: 'Rating label',
    defaultMessage: 'Rating',
  },
  rating_comment_label: {
    id: 'rating.form.rating_comment_label',
    description: 'Rating label',
    defaultMessage: 'Comments',
  },
  rating_comment_placeholder: {
    id: 'rating.form.rating_comment_placeholder',
    description: 'Rating placeholder',
    defaultMessage: 'Leave a comment.',
  },
  submit: {
    id: 'rating.form.submit',
    description: 'Submit recipe button',
    defaultMessage: 'Comment',
  },
});

export interface IRatingFormProps {
  rating?: Rating;

  addRating?: (rating: RatingCreate) => Promise<ValidationResult>;
  editRating?: (rating: RatingUpdate) => Promise<ValidationResult>;
  onSubmitSuccess: () => void;
  onCancel: () => void;
}

export interface IFormDataProps {
  rating:  number;
  comment: string;
}

const RatingForm: React.FC<IRatingFormProps> = ({ rating, addRating, editRating, onSubmitSuccess, onCancel }: IRatingFormProps) => {
  const intl = useIntl();
  const { formatMessage } = intl;

  const [initialValues] = useState<Partial<IFormDataProps>>(rating ?? { rating: 0, comment: '' });

  const handleSubmit = useCallback(async (form: IFormDataProps) => {
    if (rating) {
      const res: RatingUpdate = {
        ...form,
        id: rating.id,
      };
      return editRating?.(res);
    } else {
      const res: RatingCreate = form;
      return addRating?.(res);
    }
  }, [addRating, rating?.id]);

  return (
    <ReduxForm
        initialValues = {initialValues}
        onSubmit = {handleSubmit}
        subscription = {{}}
        render = {({ form, handleSubmit: renderSubmit }) => (
          <Form onSubmit={renderSubmit} className={classNames('rating-form', { create: !rating, edit: rating })}>
            <ReFormStatus onSubmitSuccess={onSubmitSuccess} />

            <InitialValuesResetter form={form} initialValues={initialValues} />
            {rating && (
              <div className='d-flex' style={{ alignItems: 'center', justifyContent: 'end' }}>
                <RatingTimestamp rating={rating} />
                <RatingEditor rating={rating} />
              </div>
            )}
            <fieldset>
              <legend className='rating-form-heading'>
                {!rating && (
                  formatMessage(messages.new_rating_title)
                )}
                {rating && (
                  formatMessage(messages.edit_rating_title, { username: rating.pub_username })
                )}
              </legend>
              <Row>
                <Col className='form-group required'>
                  <div className='form-label'>{formatMessage(messages.rating_label)}</div>
                  <Field name='rating' validate={requiredValidator} validateFields={[]}>
                    {fprops => (
                      <Ratings
                          stars = {fprops.input.value}
                          onChange = {(value: number) => { fprops.input.onChange(value); }} />
                    )}
                  </Field>
                </Col>
              </Row>
              <Row>
                <Col>
                  <ReInput
                      name   = 'comment'
                      rows   = {4}
                      label  = {formatMessage(messages.rating_comment_label)}
                      placeholder = {formatMessage(messages.rating_comment_placeholder)}
                      maxLength = {1000}
                      required />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Toolbar>
                    <FormSpy subscription={{ values: true, submitting: true }}>
                      {({ values, submitting }) => (
                        <Button type='submit' variant='primary' disabled={!values.rating || !values.comment || submitting}>
                          {formatMessage(messages.submit)}
                        </Button>
                      )}
                    </FormSpy>
                    <Button variant='outline-primary' onClick={onCancel}>
                      {intl.messages['modal.close'] as string}
                    </Button>
                  </Toolbar>
                </Col>
              </Row>
            </fieldset>
          </Form>
        )} />
  );
};

export default RatingForm;
