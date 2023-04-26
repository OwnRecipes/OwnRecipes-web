import { Component, forwardRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';
import { FormSpy } from 'react-final-form';

import { RootState } from '../../app/Store';
import { useDispatch, useSelector } from '../../common/store/redux';
import { getRoutePath, isDemoMode } from '../../common/utility';
import * as RecipeActions from '../../recipe/store/RecipeActions';
import LoadingSpinner from '../../common/components/LoadingSpinner';

const RecipeFormToolbar: React.FC = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const recipeState = useSelector((state: RootState) => state.recipeForm);

  const preload = useCallback(() => { if (recipeState.item) dispatch(RecipeActions.preload(recipeState.item)); }, [dispatch, recipeState.item]);
  const onLink = useCallback(() => nav(getRoutePath(`/recipe/${recipeState.item?.slug}`)), [recipeState.item?.slug]);

  const id = recipeState.item?.id;
  const isNew = id == null || id === 0;

  return (
    <FormSpy subscription={{ pristine: true, submitting: true }}>
      {({ pristine, submitting }) => (
        <SubmitViewButton isNew={isNew} pristine={pristine} submitting={submitting} onSubmit={preload} onLink={onLink} />
      )}
    </FormSpy>
  );
};

interface ISubmitViewButtonProps {
  isNew:      boolean;
  submitting: boolean;
  pristine:   boolean;

  onSubmit: () => void;
  onLink: () => void;
}

const SubmitViewButton = forwardRef<HTMLButtonElement, ISubmitViewButtonProps>(({
    isNew, submitting, pristine, onSubmit, onLink, ...rest }: ISubmitViewButtonProps, ref) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const messages = defineMessages({
    submit: {
      id: 'recipe.create.submit',
      description: 'Submit recipe button',
      defaultMessage: 'Submit recipe',
    },
    view: {
      id: 'recipe.create.view',
      description: 'View recipe button',
      defaultMessage: 'View',
    },
  });

  const asView = !isNew && pristine;

  const onClick = useCallback(() => {
    // This seems stupid, and it feels stupid.
    // But we do not want to replace the button,
    // to prevent losing focus.
    if (asView) {
      onLink();
    } else {
      onSubmit();
    }
  }, [asView, onLink, onSubmit]);

  return (
    <Button
        variant  = 'primary'
        type     = {asView ? 'button' : 'submit'}
        // Do not disable on submitting, to prevent losing focus
        disabled = {(isDemoMode() && !asView)}
        onClick = {onClick}
        accessKey = {asView ? undefined : 's'}
        {...rest}
        className = {submitting ? 'disabled' : undefined}
        ref = {ref}>
      <span style={{ visibility: submitting ? 'hidden' : 'initial' }}>{formatMessage(asView ? messages.view : messages.submit)}</span>
      {submitting && <LoadingSpinner style={{ position: 'absolute', color: 'var(--primaryText)' }} />}
    </Button>
  );
});

export const SubmittingObserver = forwardRef<SubmittingObserverClass>((_props, ref) => (
  <FormSpy subscription={{ pristine: true, submitting: true }}>
    {({ submitting }) => (
      <SubmittingObserverClass submitting={submitting} ref={ref} />
    )}
  </FormSpy>
));

interface ISubmittingObserverClassProps {
  submitting: boolean;
}

export class SubmittingObserverClass extends Component<ISubmittingObserverClassProps> {
  // eslint-disable-next-line react/no-unused-class-component-methods
  getSubmitting(): boolean {
    return this.props.submitting;
  }

  render() {
    return null;
  }
}

export default RecipeFormToolbar;
