import { forwardRef, RefObject, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Col, Form, Row } from 'react-bootstrap';
import { Form as ReduxForm } from 'react-final-form';
import { FormApi } from 'final-form';

import '../css/add_to_grocery_list_modal.css';

import { RootState } from '../../app/Store';
import Modal from '../../common/components/Modal';
import { ValidationResult } from '../../common/store/Validation';
import { Ingredient, IngredientGroup, SubRecipe } from '../store/RecipeTypes';
import ReFormStatus from '../../common/components/ReduxForm/ReFormStatus';
import InitialValuesResetter from '../../common/components/ReduxForm/ReInitialValuesResetter';
import { useDispatch, useSelector } from '../../common/store/redux';
import Checkbox from '../../common/components/Input/Checkbox';
import useCrash from '../../common/hooks/useCrash';
import Icon from '../../common/components/Icon';
import Button from '../../common/components/Button';
import P from '../../common/components/P';
import { PendingState } from '../../common/store/GenericReducerType';
import { GroceryList, GroceryListBulkAdd, GroceryListCreate } from '../../groceryList/store/GroceryListTypes';
import * as GroceryListsActions from '../../groceryList/store/GroceryListsActions';
import * as GroceryListActions from '../../groceryList/store/GroceryListActions';
import ReSelect from '../../common/components/ReduxForm/ReSelect';
import MeasurementContext from '../../common/context/MeasurementContext';
import IngredientGroups from './IngredientGroups';
import SubRecipes from './SubRecipes';
import { formatMeasurement } from './Ingredients';

export interface IAddToGroceryListModalProps {
  show: boolean;
  subrecipes: Array<SubRecipe> | undefined;
  ingredients: Array<IngredientGroup> | undefined;
  onSaveSuccess: () => void;
  onClose: () => void;
}

interface AddToGroceryListData {
  list: number;
  ingredients: Array<{ slug: string, title: string, ingredients: Array<number> }>;
  subrecipes: Array<number>;
}

const AddToGroceryListModal: React.FC<IAddToGroceryListModalProps> = ({
    show, subrecipes, ingredients, onSaveSuccess, onClose }: IAddToGroceryListModalProps) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const measurementContext = useContext(MeasurementContext);
  const formatMeasurementCb = useCallback((measurement: string | undefined, quantity: string | undefined) => formatMeasurement(intl, measurementContext, measurement, quantity), [measurementContext, intl]);

  const bulkAdd = useCallback(async (list: number, data: GroceryListBulkAdd) => GroceryListActions.bulkAdd(dispatch, list, data, formatMeasurementCb), [dispatch]);
  const createList = useCallback(async (item: GroceryListCreate) => GroceryListActions.create(dispatch, item), [dispatch]);

  const groceryListsState = useSelector((state: RootState) => state.groceryLists);
  const { items: lists } = groceryListsState;
  useEffect(() => {
    dispatch(GroceryListsActions.load());
  }, []);

  const bulkAddPending = useSelector((state: RootState) => state.groceryList.meta.pending);

  const submitRef = useRef<HTMLButtonElement>(null);

  const handleEditSubmit = useCallback(() => {
    submitRef.current?.click();
  }, [submitRef.current]);
  const handleSubmit = useCallback(async (form: AddToGroceryListData) => {
    const allIngredients = ingredients?.flatMap(ig => ig.ingredients) ?? [];
    const allSubrecipes  = subrecipes != null ? [...subrecipes] : [];

    const addIngredientGroups: Array<IngredientGroup> = [];
    form.ingredients.forEach(ig => {
      const addIngredients: Array<Ingredient> = ig.ingredients.map(i => allIngredients.find(ii => ii.id === i)).filter(Boolean) as Array<Ingredient>;
      if (ig.ingredients.length > 0) {
        addIngredientGroups.push({ slug: ig.slug, title: ig.title, ingredients: addIngredients });
      }
    });

    const addSubrecipes: Array<SubRecipe> = allSubrecipes.filter(s => form.subrecipes.includes(s.child_recipe_id));

    const bulkAddData: GroceryListBulkAdd = {
      ingredientGroups: addIngredientGroups,
      subrecipes: addSubrecipes,
    };

    return bulkAdd(form.list, bulkAddData);
  }, [ingredients, subrecipes, bulkAdd]);
  const handleSubmitSuccess = useCallback(() => {
    onSaveSuccess();
    onClose();
  }, [onSaveSuccess, onClose]);
  const handleModalClose = useCallback((autoClose: boolean) => {
    if (!autoClose) {
      onClose();
    }
  }, [onClose]);

  if (!show || lists == null || subrecipes == null || ingredients == null) return null;

  return (
    <Modal
        show = {show}
        title = {intl.messages['recipe.recipe_ingredient_button.add_groceries'] as string}
        onAccept = {handleEditSubmit}
        acceptButtonProps = {{ disabled: lists.length === 0 || bulkAddPending === PendingState.SAVING }}
        onClose  = {handleModalClose}
        className = 'add-to-grocery-list-modal'>
      <AddToGroceryListForm
          lists = {lists}
          subrecipes = {subrecipes}
          ingredients = {ingredients}
          onSubmit = {handleSubmit}
          onSubmitSuccess = {handleSubmitSuccess}
          onAddList = {createList}
          submitRef = {submitRef} />
    </Modal>
  );
};

interface IAddToGroceryListProps {
  lists:       Array<GroceryList>;
  subrecipes:  Array<SubRecipe>;
  ingredients: Array<IngredientGroup>;
  onSubmit: (upd: AddToGroceryListData) => Promise<ValidationResult>;
  onSubmitSuccess: () => void;
  onAddList: (item: GroceryListCreate) => Promise<ValidationResult>;
  submitRef: RefObject<HTMLButtonElement>;
}

interface IAddToGroceryListFormDataProps {
  list: string;
  subrecipes:  Record<string, boolean>;
  ingredients: Record<string, Record<string, boolean>>;
}

function initializeCheckboxes(cbs: Array<string>): Record<string, boolean> {
  const res: Record<string, boolean> = {};
  cbs.forEach(cb => {
    res[cb] = true;
  });
  return res;
}

function initializeInredientGroupsCheckboxes(igs: Array<IngredientGroup>): Record<string, Record<string, boolean>> {
  const res: Record<string, Record<string, boolean>> = {};
  igs.forEach(ig => {
    res[ig.slug] = { ...initializeCheckboxes(ig.ingredients.flatMap(i => `cb-${i.id}`)) };
  });
  return res;
}

function uniquify<T>(arr: Array<T>): Array<T> {
  return Array.from(new Set(arr));
}

const AddToGroceryListForm = forwardRef<HTMLFormElement, IAddToGroceryListProps>(({
    lists, subrecipes, ingredients, onSubmit, onSubmitSuccess, onAddList, submitRef }: IAddToGroceryListProps, ref) => {
  const crash = useCrash();

  const [initialValues] = useState<Partial<IAddToGroceryListFormDataProps>>({
    list: lists.length > 0 ? lists[lists.length - 1].id.toString() : undefined,
    ingredients: initializeInredientGroupsCheckboxes(ingredients),
    subrecipes: {
      ...initializeCheckboxes(subrecipes.flatMap(sr => `cb-${sr.child_recipe_id}`)),
    },
  });
  // console.log(`initialValues=${JSON.stringify(initialValues, undefined, 2)}`);

  const handleSubmit = useCallback(async (form: IAddToGroceryListFormDataProps): Promise<ValidationResult> => {
    /*
      form is something like:

      list: 2,
      ingredients: {
        default: {
          cb-123: true,
          cb-124: true,
        },
        dough: {
          cb-223: true,
          cb-625: true,
        },
      subrecipe-cb-451: true,
    */

    const addSubrecipes: Array<number> = [];
    Object.keys(form.subrecipes).forEach(s => {
      if (form.subrecipes[s]) {
        addSubrecipes.push(parseInt(s.substring(s.indexOf('-') + 1)));
      }
    });
    const addIngredientGroups: Array<{ slug: string, title: string, ingredients: Array<number> }> = [];
    Object.keys(form.ingredients ?? {}).forEach(igSlug => {
      const addIgIngredients: Set<number> = new Set();
      const ig = ingredients.find(igg => igg.slug === igSlug);
      if (!ig) { crash(`Invalid state: There is not IngredientGroup for slug "${igSlug}"`); return; }
      const igIngredients = form.ingredients[igSlug];
      Object.keys(igIngredients).forEach(i => {
        if (igIngredients[i]) {
          addIgIngredients.add(parseInt(i.substring(i.indexOf('-') + 1)));
        }
      });
      if (Object.keys(igIngredients).length > 0) {
        addIngredientGroups.push({ slug: ig.slug, title: ig.title, ingredients: Array.from(addIgIngredients) });
      }
    });

    const upd: AddToGroceryListData = {
      list:        parseInt(form.list),
      ingredients: addIngredientGroups,
      subrecipes:  uniquify(addSubrecipes),
    };
    return onSubmit(upd);
  }, [ingredients, onSubmit]);

  return (
    <ReduxForm
        initialValues = {initialValues}
        onSubmit = {handleSubmit}
        subscription = {{}}
        render = {({ form, handleSubmit: renderSubmit }) => (
          <Form onSubmit={renderSubmit} ref={ref}>
            <ReFormStatus onSubmitSuccess={onSubmitSuccess} />
            <InitialValuesResetter form={form} initialValues={initialValues} />

            <ListRow
                lists = {lists}
                form = {form}
                onAddList = {onAddList} />

            {lists.length > 0 && (
              <>
                <Row className='additional-checkbox-row'>
                  <Col>
                    <ToggleAllCheckbox
                        name = 'toggle-all'
                        form = {form}
                        />
                  </Col>
                </Row>

                <Row className='ingredients-and-subrecipes'>
                  <Col>
                    <SubRecipes
                        subRecipes = {subrecipes}
                        selectable
                        />
                    <IngredientGroups
                        groups = {ingredients}
                        hasSubrecipes = {subrecipes != null && subrecipes.length > 0}
                        selectable
                        />
                  </Col>
                </Row>
              </>
            )}
            <button type='submit' ref={submitRef} className='visibility-hidden'>Submit</button>
          </Form>
        )} />
  );
});

interface IListRowProps {
  lists: Array<GroceryList>;
  form: FormApi<IAddToGroceryListFormDataProps, Partial<IAddToGroceryListFormDataProps>>;
  onAddList: (item: GroceryListCreate) => Promise<ValidationResult>;
}

const ListRow: React.FC<IListRowProps> = ({
    lists, form, onAddList }: IListRowProps) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const messages = defineMessages({
    list: {
      id: 'grocery_list.form.list',
      defaultMessage: 'List',
    },
    new_text: {
      id: 'grocery_list.item.new_text',
      defaultMessage: 'Create a new grocery list to get started.',
    },
    new_list_title: {
      id: 'grocery_list.item.new_title',
      defaultMessage: 'My grocery list',
    },
  });

  const [addedNewList, setAddedNewList] = useState<boolean>(false);
  const prevListIds = useRef<Array<number> | undefined>();

  const handleAddListClick = useCallback(() => {
    const newListTitle = `${formatMessage(messages.new_list_title)}`;
    const suffixes = lists
        .filter(l => l.title.startsWith(newListTitle))
        .map(l => parseInt(l.title.substring(newListTitle.length)))
        .filter(i => !Number.isNaN(i) || i < 0)
        .sort((a, b) => a - b);
    const suffix = suffixes.length > 0 ? (suffixes[suffixes.length - 1] + 1) : 1;

    prevListIds.current = lists.map(l => l.id);
    onAddList({ title: `${newListTitle} ${suffix}` })
        .then(() => {
          setAddedNewList(true);
        });
  }, [lists, onAddList, formatMessage]);

  useEffect(() => {
    if (prevListIds.current == null) return;
    const newIds = lists.map(l => l.id);

    const newList = newIds.find(i => !prevListIds.current?.includes(i));
    if (!newList) return;
    form.change('list', newList.toString());

    prevListIds.current = [];
  }, [lists]);

  return (
    <Row>
      <Col className='input-with-button'>
        {lists.length === 0 && (
          <>
            <P>{formatMessage(messages.new_text)}</P>
            <Button id='add-list-button' type='button' onClick={handleAddListClick} variant='primary' className='add-list-button' aria-label='Add list'>
              {intl.messages['nav.grocery_list_create'] as string}
            </Button>
          </>
        )}
        {lists.length > 0 && (
          <>
            <ReSelect
                name   = 'list'
                label  = {formatMessage(messages.list)}
                data   = {lists.map(l => ({ value: l.id.toString(), label: l.title }))}
                readOnly = {lists.length === 0}
                disabled = {lists.length === 0} />
            {!addedNewList && (
              <Button id='add-list-button' type='button' onClick={handleAddListClick} variant='transparent' className='add-list-button' aria-label='Add list' tooltip={intl.messages['nav.grocery_list_create'] as string}>
                <Icon icon='plus-lg' variant='light' size='2x' />
              </Button>
            )}
          </>
        )}
      </Col>
    </Row>
  );
};

interface IToggleAllCheckboxProps {
  name: string;
  form: FormApi<IAddToGroceryListFormDataProps, Partial<IAddToGroceryListFormDataProps>>;
}

const ToggleAllCheckbox: React.FC<IToggleAllCheckboxProps> = ({
    name, form }: IToggleAllCheckboxProps) => {
  const intl = useIntl();
  const [value, setValue] = useState<boolean>(true);

  const handleChange = useCallback((_name: string, newValue: boolean) => {
    setValue(newValue);

    const registeredFields = form.getRegisteredFields();

    const ingredientGroupsCbs = registeredFields.filter(f => f.startsWith('ingredients.') && f.includes('cb-'));
    const subrecipesCbs = registeredFields.filter(f => f.startsWith('subrecipes.') && f.includes('cb-'));

    const allCbs = [...ingredientGroupsCbs, ...subrecipesCbs];
    allCbs.forEach(cbKey => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      form.change(cbKey as any, newValue);
    });
  }, [form]);

  return (
    <Checkbox
        name   = {name}
        label  = {intl.messages['grocery_list.items.toggle_all'] as string}
        value  = {value}
        onChange = {handleChange} />
  );
};

export default AddToGroceryListModal;
