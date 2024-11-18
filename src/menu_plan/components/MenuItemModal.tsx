import { forwardRef, RefObject, useCallback, useRef, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Col, Form, Row } from 'react-bootstrap';
import { Form as ReduxForm } from 'react-final-form';
import moment from 'moment';

import { create, update } from '../store/MenuItemActions';
import { useDispatch, useSelector } from '../../common/store/redux';
import { RootState } from '../../app/Store';
import { PendingState } from '../../common/store/GenericReducerType';
import Modal from '../../common/components/Modal';
import { ValidationResult } from '../../common/store/Validation';
import ReFormStatus from '../../common/components/ReduxForm/ReFormStatus';
import InitialValuesResetter from '../../common/components/ReduxForm/ReInitialValuesResetter';
import ReAsyncSelect from '../../common/components/ReduxForm/ReAsyncSelect';
import { fetchRecipeList } from '../store/MenuItemsActions';
import ReCheckbox from '../../common/components/ReduxForm/ReCheckbox';
import ReDateTime from '../../common/components/ReduxForm/ReDateTime';
import { SelectDataType } from '../../common/components/Input/Select';
import { MenuItem, MenuItemUpdate } from '../store/MenuItemTypes';
import { Recipe } from '../../recipe/store/RecipeTypes';

const messages = defineMessages({
  start_date: {
    id: 'menu_item_modal.start_date',
    description: 'Start Date',
    defaultMessage: 'Start Date',
  },
  recipe: {
    id: 'menu_item_modal.recipe',
    description: 'Recipe',
    defaultMessage: 'Recipe',
  },
  complete: {
    id: 'menu_item_modal.complete',
    description: 'Complete',
    defaultMessage: 'Complete',
  },
});

export interface IMenuItemModalProps {
  show: boolean;
  item?: Partial<MenuItem>;
  recipe?: Recipe;
  recipeReadonly?: boolean;
  onSaveSuccess: () => void;
  onClose: () => void;
}

const MenuItemModal: React.FC<IMenuItemModalProps> = ({
  show, item, recipe, recipeReadonly, onSaveSuccess, onClose }: IMenuItemModalProps) => {
    const intl = useIntl();
    const dispatch = useDispatch();

    const modalTitle = intl.messages['recipe.add_to_menu_tooltip'] as string;

    const handleModalClose = useCallback((autoClose: boolean) => {
      if (!autoClose) {
        onClose();
      }
    }, [onClose]);

    const savePending = useSelector((state: RootState) => state.menuItem.meta.pending);

    const submitRef = useRef<HTMLButtonElement>(null);

    const handleEditSubmit = useCallback(() => {
      submitRef.current?.click();
    }, [submitRef.current]);
    const handleSubmit = useCallback(async (form: IMenuItemModalFormDataProps) => {
      const data: MenuItemUpdate = {
        recipe: form.recipe || 0,
        complete: form.complete,
        start_date: moment.unix(form.start_date).toISOString(),
      };
      if (item?.id == null) {
        return create(dispatch, data);
      } else {
        return update(dispatch, item?.id, data);
      }
    }, [item?.id]);
    const handleSubmitSuccess = useCallback(() => {
      onSaveSuccess();
      onClose();
    }, [onSaveSuccess, onClose]);

    if (!show) return null;

    return (
      <Modal
          show = {show}
          title = {modalTitle}
          onAccept = {handleEditSubmit}
          acceptButtonProps = {{ disabled: savePending === PendingState.SAVING }}
          onClose = {handleModalClose}>
        <MenuItemModalForm
            item = {item}
            recipe = {recipe}
            recipeReadonly = {recipeReadonly}
            fetchRecipes = {fetchRecipeList}
            onSubmit = {handleSubmit}
            onSubmitSuccess = {handleSubmitSuccess}
            submitRef = {submitRef}
            />
      </Modal>
    );
};

interface IMenuItemModalFormProps {
  item?: Partial<MenuItem>;
  recipe?: Recipe;
  recipeReadonly?: boolean;
  fetchRecipes: (searchTerm: string) => Promise<Array<SelectDataType>>;
  onSubmit: (upd: IMenuItemModalFormDataProps) => Promise<ValidationResult>;
  onSubmitSuccess: () => void;
  submitRef: RefObject<HTMLButtonElement>;
}

interface IMenuItemModalFormDataProps {
  recipe: number | undefined;
  complete: boolean;
  start_date: number;
}

const MenuItemModalForm = forwardRef<HTMLFormElement, IMenuItemModalFormProps>(({
  item, recipe, recipeReadonly, fetchRecipes, onSubmit, onSubmitSuccess, submitRef }: IMenuItemModalFormProps, ref) => {
    const intl = useIntl();
    const { formatMessage } = intl;
    const recipeId = item?.recipe_data?.id || recipe?.id;

    const [initialValues] = useState<Partial<IMenuItemModalFormDataProps>>({
      recipe: recipeId,
      start_date: moment(item?.start_date || new Date()).unix(),
      complete: false,
    });
    // console.log(`initialValues=${JSON.stringify(initialValues, undefined, 2)}`);

    return (
      <ReduxForm
          initialValues = {initialValues}
          onSubmit = {onSubmit}
          subscription = {{}}
          render = {({ form, handleSubmit: renderSubmit }) => (
            <Form onSubmit={renderSubmit} ref={ref}>
              <ReFormStatus onSubmitSuccess={onSubmitSuccess} />
              <InitialValuesResetter form={form} initialValues={initialValues} />

              <Row>
                <Col xs={12}>
                  <ReAsyncSelect
                      name   = 'recipe'
                      initialValueLabel = {item?.recipe_data?.title || recipe?.title}
                      label  = {formatMessage(messages.recipe)}
                      loadOptions = {fetchRecipes}
                      readOnly = {recipeReadonly}
                      required
                      />
                </Col>
                <Col xs={12}>
                  <ReDateTime
                      label      = {formatMessage(messages.start_date)}
                      name       = 'start_date'
                      timeFormat = {false}
                      required />
                </Col>
                <Col xs={12}>
                  <ReCheckbox
                      name    = 'complete'
                      label   = {formatMessage(messages.complete)} />
                </Col>
              </Row>

              <button type='submit' ref={submitRef} className='visibility-hidden'>Submit</button>
            </Form>
          )} />
    );
});

export default MenuItemModal;
