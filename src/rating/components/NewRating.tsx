import { useCallback, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';
import { Field, Form as ReduxForm, FormSpy } from 'react-final-form';

import { RatingCreate } from '../store/types';
import InitialValuesResetter from '../../common/components/ReduxForm/ReInitialValuesResetter';
import ReInput from '../../common/components/ReduxForm/ReInput';
import { requiredValidator, ValidationResult } from '../../common/store/Validation';
import ReFormStatus from '../../common/components/ReduxForm/ReFormStatus';
import Ratings from './Ratings';

export interface INewRatingProps {
  show: boolean;
  recipeSlug: string;
  userId: number;

  addRating: (recipeSlug: string, rating: RatingCreate) => Promise<ValidationResult>;
  onAddRatingSuccess: () => void;
}

export interface IFormDataProps {
  rating:  number;
  comment: string;
}

const NewRating: React.FC<INewRatingProps> = ({ show, recipeSlug, userId, addRating, onAddRatingSuccess }: INewRatingProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    new_rating_title: {
      id: 'newRating.create.title',
      description: 'Fieldset legend for creating a new rating',
      defaultMessage: 'Your new rating',
    },
    rating_placeholder: {
      id: 'newRating.create.rating_placeholder',
      description: 'Rating placeholder',
      defaultMessage: 'Rate this recipe from 0 to 5',
    },
    rating_label: {
      id: 'newRating.create.rating_label',
      description: 'Rating label',
      defaultMessage: 'Rating',
    },
    rating_comment_placeholder: {
      id: 'newRating.create.rating_comment_placeholder',
      description: 'Rating placeholder',
      defaultMessage: 'Leave a comment!',
    },
    rating_comment_label: {
      id: 'newRating.create.rating_comment_label',
      description: 'Rating label',
      defaultMessage: 'Comments',
    },
    submit: {
      id: 'newRating.create.submit',
      description: 'Submit recipe button',
      defaultMessage: 'Comment',
    },
  });

  const [initialValues] = useState<Partial<IFormDataProps>>({ rating: 0, comment: '' });

  const handleSubmit = useCallback(async (form: IFormDataProps) => {
    const newRating: RatingCreate = {
      rating:     form.rating,
      comment:    form.comment,
      userId:     userId,
    };
    return addRating(recipeSlug, newRating);
  }, [recipeSlug, userId, addRating]);

  if (!show) return null;

  return (
    <ReduxForm
        initialValues = {initialValues}
        onSubmit = {handleSubmit}
        subscription = {{}}
        render = {({ form, handleSubmit: renderSubmit }) => (
          <Form onSubmit={renderSubmit} className='new-rating'>
            <ReFormStatus onSubmitSuccess={onAddRatingSuccess} />

            <InitialValuesResetter form={form} initialValues={initialValues} />
            <fieldset>
              <legend className='new-rating-heading'>{formatMessage(messages.new_rating_title)}</legend>
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
                <Col xs={12} className='toolbar'>
                  <FormSpy subscription={{ values: true, submitting: true }}>
                    {({ values, submitting }) => (
                      <Button type='submit' variant='primary' disabled={!values.rating || !values.comment || submitting}>
                        {formatMessage(messages.submit)}
                      </Button>
                    )}
                  </FormSpy>
                </Col>
              </Row>
            </fieldset>
          </Form>
        )} />
  );
};

export default NewRating;
