import { forwardRef, RefObject, useCallback, useRef, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Col, Form, Row } from 'react-bootstrap';
import { ValidationErrors } from 'final-form';
import { Form as ReForm } from 'react-final-form';
import moment from 'moment';

import { create, update } from '../store/MenuItemActions';
import { useDispatch, useSelector } from '../../common/store/redux';
import { RootState } from '../../app/Store';
import { PendingState } from '../../common/store/GenericReducerType';
import Modal from '../../common/components/Modal';
import { requiredValidator, ValidationResult } from '../../common/store/Validation';
import ReFormStatus from '../../common/components/ReInput/ReFormStatus';
import InitialValuesResetter from '../../common/components/ReInput/ReInitialValuesResetter';
import ReAsyncSelect from '../../common/components/ReInput/ReAsyncSelect';
import { fetchRecipeList } from '../store/MenuItemsActions';
import FieldSpyValues from '../../common/components/ReInput/FieldSpyValues';
import ReInput from '../../common/components/ReInput/ReInput';
import ReDateTime from '../../common/components/ReInput/ReDateTime';
import { SelectDataType } from '../../common/components/Input/Select';
import { MenuItem, MenuItemUpdate } from '../store/MenuItemTypes';
import { Recipe } from '../../recipe/store/RecipeTypes';

const messages = defineMessages({
  ext_title: {
    id: 'menu_item_modal.ext_title',
    description: 'External recipe title',
    defaultMessage: 'External recipe',
  },
  ext_source: {
    id: 'menu_item_modal.ext_source',
    description: 'External recipe source',
    defaultMessage: 'External recipe source',
  },
  recipe: {
    id: 'menu_item_modal.recipe',
    description: 'Recipe',
    defaultMessage: 'Recipe',
  },
  start_date: {
    id: 'menu_item_modal.start_date',
    description: 'Start Date',
    defaultMessage: 'Start Date',
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

    const savePending: PendingState = useSelector((state: RootState) => state.menuItem.meta.pending);

    const submitRef = useRef<HTMLButtonElement>(null);

    const handleEditSubmit = useCallback(() => {
      submitRef.current?.click();
    }, [submitRef.current]);
    const handleSubmit = useCallback(async (form: IMenuItemModalFormDataProps) => {
      const data: MenuItemUpdate = {
        recipe: form.recipe || null,
        ext_title: form.ext_title || '',
        ext_source: form.ext_source || '',
        start_date: moment.unix(form.start_date).toISOString(),
        complete: false,
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
  ext_title: string | undefined;
  ext_source: string | undefined;
  start_date: number;
}

function formatNumber(val: number | undefined): string {
  return val != null ? String(val) : '';
}

function parseAsNumber(val: string | undefined): number | undefined {
  return val ? parseInt(val) : undefined;
}

function handleValidate(values: IMenuItemModalFormDataProps): ValidationErrors {
  const errors: ValidationErrors = {};
  errors.recipe = requiredValidator(values.recipe || values.ext_title);
  return errors;
}

const MenuItemModalForm = forwardRef<HTMLFormElement, IMenuItemModalFormProps>(({
  item, recipe, recipeReadonly, fetchRecipes, onSubmit, onSubmitSuccess, submitRef }: IMenuItemModalFormProps, ref) => {
    const intl = useIntl();
    const { formatMessage } = intl;
    const recipeId = item?.recipe_data?.id || recipe?.id;

    const [initialValues] = useState<Partial<IMenuItemModalFormDataProps>>({
      recipe: recipeId,
      ext_title: item?.ext_title,
      ext_source: item?.ext_source,
      start_date: moment(item?.start_date || new Date()).unix(),
    });

    return (
      <ReForm
          initialValues = {initialValues}
          onSubmit = {onSubmit}
          validate = {handleValidate}
          subscription = {{}}
          render = {({ form, handleSubmit: renderSubmit }) => (
            <Form onSubmit={renderSubmit} ref={ref}>
              <ReFormStatus onSubmitSuccess={onSubmitSuccess} />
              <InitialValuesResetter form={form} initialValues={initialValues} />

              <Row>
                <Col xs={12}>
                  <FieldSpyValues fieldNames={['ext_title', 'ext_source']}>
                    {values => (
                      <ReAsyncSelect
                          name   = 'recipe'
                          initialValueLabel = {item?.recipe_data?.title || recipe?.title}
                          label  = {formatMessage(messages.recipe)}
                          loadOptions = {fetchRecipes}
                          format = {formatNumber}
                          parse = {parseAsNumber}
                          readOnly = {recipeReadonly || Boolean(values.ext_title) || Boolean(values.ext_source)}
                          />
                    )}
                  </FieldSpyValues>
                </Col>
                {!recipeReadonly && (
                  <FieldSpyValues fieldNames={['recipe']}>
                    {values => (
                      <>
                        <Col xs={12}>
                          <ReInput
                              label      = {formatMessage(messages.ext_title)}
                              name       = 'ext_title'
                              readOnly   = {Boolean(values.recipe)} />
                        </Col>
                        <Col xs={12}>
                          <ReInput
                              label      = {formatMessage(messages.ext_source)}
                              name       = 'ext_source'
                              readOnly   = {Boolean(values.recipe)} />
                        </Col>
                      </>
                    )}
                  </FieldSpyValues>
                )}
                <Col xs={12}>
                  <ReDateTime
                      label      = {formatMessage(messages.start_date)}
                      name       = 'start_date'
                      timeFormat = {false}
                      required />
                </Col>
              </Row>

              <button type='submit' ref={submitRef} className='visibility-hidden'>Submit</button>
            </Form>
          )} />
    );
});

export default MenuItemModal;
