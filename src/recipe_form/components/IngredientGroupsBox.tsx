import React, { useContext, useEffect, useMemo, useState } from 'react';
import { defineMessages, IntlShape, useIntl } from 'react-intl';
import { useLocation } from 'react-router';
import { FormSpy } from 'react-final-form';
import { ValidationErrors } from 'final-form';

import '../css/smart_text_box.css';

import IngredientGroups from '../../recipe/components/IngredientGroups';
import formatQuantity from '../../recipe/utilts/formatQuantity';
import parseIngredient from '../utilts/parseIngredient';
import { Ingredient, IngredientGroup, IngredientInput, SubRecipe } from '../../recipe/store/RecipeTypes';
import SubRecipes from '../../recipe/components/SubRecipes';
import MeasurementContext from '../../common/context/MeasurementContext';
import { formatValidation } from '../../common/store/Validation';
import ReInput from '../../common/components/ReduxForm/ReInput';
import ReTextareaAutocomplete from '../../common/components/ReduxForm/ReTextareaAutocomplete';
import TabbedView from './TabbedView';
import { AutocompleteListItem } from '../../common/components/Input/TextareaAutocomplete';
import FieldSpyValues from '../../common/components/ReduxForm/FieldSpyValues';

export interface IIngredientGroupsBoxProps {
  nameIg:   string;
  nameSub:  string;

  fetchRecipeList: (searchTerm: string) => Promise<Array<AutocompleteListItem>>;
}

function normalizeLine(line: string): string {
  let res = line.replace(/\t/g, ' ');
  res = res.trim();
  return res;
}

/* IngredientGroups */

export function ingredientsFormatter(intl: IntlShape, formatter: Record<string, string>, values: Array<IngredientGroup>): string {
  let tr = '';
  if (values) {
    values.filter(ig => ig.title.trim().length > 0 || ig.ingredients.length > 0).forEach(ig => {
      if (ig.title) {
        tr += `${ig.title}:\n`;
      }
      ig.ingredients.forEach(i => {
        const locMsrmnt = i.measurement ? formatter[i.measurement] : '';
        tr += i.numerator ? `${formatQuantity(1, 1, i.numerator, i.denominator)} ` : '';
        tr += locMsrmnt ? `${(intl as IntlShape).formatMessage({ id: `measurement.${locMsrmnt.toLocaleLowerCase()}` }, { itemCount: i.numerator })} ` : '';
        tr += `${i.title}\n`;
      });
      tr += '\n';
    });
  }
  if (tr.endsWith('\n')) {
    return tr.substring(0, tr.length - 2);
  }
  return tr;
}

export function ingredientsParser(parser: Record<string, string>, value: string | undefined): Array<IngredientGroup> {
  if (!value) return [];
  const dict = [{ title: '', ingredients: [] }];
  let igTitle = '';
  let ings: Array<IngredientInput> | undefined = dict.find(t => t.title === '')?.ingredients; // Should always exist, as it is the init group.
  if (ings == null) throw new Error('Invalid state: ings may not be null.');
  if (value) {
    const tags = value.split('\n').map(line => normalizeLine(line)).filter(t => t.length > 0);
    tags.forEach(line => {
      if (line.length > 0) {
        // Check if the line is an IG title
        // If line is IG title, update igTitle and continue
        // Else add ing to the current ig group
        if (line.endsWith(':') && line.length > 1) {
          igTitle = line.substring(0, line.length - 1);
          dict.push({ title: igTitle, ingredients: [] });
          ings = dict.find(t => t.title === igTitle)?.ingredients; // Should always exist, as we just pushed it.
          if (ings == null) throw new Error('Invalid state: The create ings may not be null.');
        } else {
          if (ings == null) throw new Error('Invalid state: ings may not be null.');
          ings.push(parseIngredient(parser, line));
        }
      }
    });
  }
  return dict;
}

/* SubRecipe */

export function subrecipesFormatter(intl: IntlShape, formatter: Record<string, string>, values: Array<SubRecipe>) {
  let tr = '';
  if (values) {
    values.forEach(i => {
      const locMsrmnt = i.measurement ? formatter[i.measurement] : '';
      tr += i.numerator ? `${formatQuantity(1, 1, i.numerator, i.denominator)} ` : '';
      tr += locMsrmnt ? `${(intl as IntlShape).formatMessage({ id: `measurement.${locMsrmnt.toLocaleLowerCase()}` }, { itemCount: i.numerator })} ` : '';
      tr += `${i.title}\n`;
    });
  }
  return tr.substring(0, tr.length - 1);
}

export function subrecipesParser(parser: Record<string, string>, value: string | undefined): Array<SubRecipe> {
  if (!value) return [];
  const ings: Array<SubRecipe> = [];
  const subRecipes = value.split('\n').map(line => normalizeLine(line)).filter(t => t.length > 1 && !t.startsWith(':'));
  subRecipes.forEach(sr => {
    if (sr.length > 0) {
      ings.push(parseIngredient(parser, sr) as SubRecipe);
    }
  });
  return ings;
}

interface IItemProps {
  entity: AutocompleteListItem;
}
const Item = ({ entity: { char } }: IItemProps) => <div>{char}</div>;

const IngredientGroupsBox: React.FC<IIngredientGroupsBoxProps> = ({
    nameIg, nameSub, fetchRecipeList }: IIngredientGroupsBoxProps) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const messages = defineMessages({
    ingredients_label: {
      id: 'recipe.create.ingredients_label',
      description: 'Recipe ingredients label',
      defaultMessage: 'Ingredients',
    },
    ingredients_tooltip: {
      id: 'recipe.create.ing.info_desc',
      description: 'info_desc',
      defaultMessage: 'Each Ingredient should be on its own line. You can form groups by ending the groups first line with a colon (":").',
    },
    ingredients_placeholder: {
      id: 'recipe.create.ing.ingredients_placeholder',
      description: 'Example for writing ingredients',
      defaultMessage: 'Dough:\n300 g flour\n100 ml milk\n\nDip:\n100 ml olive oil\n...',
    },

    subrecipes_label: {
      id: 'recipe.create.subrecipes_label',
      description: 'Recipe links label',
      defaultMessage: 'Recipe links',
    },
    subrecipes_tooltip: {
      id: 'recipe.create.subrecipes.tooltip',
      description: 'Subrecipes tooltip',
      defaultMessage: 'If the recipe is made of several subrecipes, then link them here. Each Recipe Link should be on its own line.',
    },
    subrecipes_placeholder: {
      id: 'recipe.create.subrecipes.placeholder',
      description: 'Subreceipes placeholder',
      defaultMessage: ':dough-1\n:olive-oil-dip-1',
    },
  });

  const location = useLocation();

  const [activeTab, setActiveTab] = useState<string>('0');

  useEffect(() => {
    if (location.pathname.endsWith('/create')) {
      setActiveTab('0');
    }
  }, [location.pathname]);

  const measurementsContext = useContext(MeasurementContext);

  const checkErrorneous = (errors: ValidationErrors, touched: Record<string, boolean> | undefined) => {
    if (touched?.[nameIg] === true && errors?.[nameIg] != null) {
      return formatValidation(intl, errors?.[nameIg]);
    } else if (touched?.[nameSub] && errors?.[nameSub] != null) {
      return formatValidation(intl, errors?.[nameSub]);
    } else {
      return undefined;
    }
  };

  return (
    <FormSpy subscription={{ errors: true, touched: true, initialValues: true }}>
      {({ errors, touched, initialValues }) => (
        <TabbedView
            id       = 'ingredients'
            labels   = {[formatMessage(messages.ingredients_label), formatMessage(messages.subrecipes_label)]}

            activeTab = {activeTab}
            onSelect  = {setActiveTab}

            errors   = {checkErrorneous(errors, touched)}
            tooltips = {[formatMessage(messages.ingredients_tooltip), formatMessage(messages.subrecipes_tooltip)]}>
          <FieldSpyValues fieldNames={[nameSub]}>
            {values => (
              <ReInput
                  name     = {nameIg}
                  rows     = {8}
                  placeholder = {formatMessage(messages.ingredients_placeholder)}
                  required = {initialValues && !values[nameSub]} />
            )}
          </FieldSpyValues>
          <div className='form-group'>
            <ReTextareaAutocomplete
                name  = {nameSub}
                rows = {8}
                placeholder = {formatMessage(messages.subrecipes_placeholder)}
                trigger={{
                ':': {
                  dataProvider: token => fetchRecipeList(token),
                  component: Item,
                  output: item => item.char,
                },
              }} />
          </div>
          <FieldSpyValues fieldNames={[nameIg, nameSub]}>
            {values => (
              <>
                {activeTab === 'preview' && (
                  <IngredientsPreview
                      igData = {ingredientsParser(measurementsContext.parser, values[nameIg])}
                      srData = {subrecipesParser(measurementsContext.parser,  values[nameSub])} />
                )}
              </>
            )}
          </FieldSpyValues>
        </TabbedView>
      )}
    </FormSpy>
  );
};

interface IIngredientsPreviewProps {
  igData: Array<IngredientGroup>;
  srData: Array<SubRecipe>;
}

const recurseIngredients = (igs: Array<IngredientGroup>, cb: (ingr: Ingredient) => Ingredient): Array<IngredientGroup> => igs.map(ig => ({
  ...ig,
  ingredients: ig.ingredients.map(ingredient => cb(ingredient)),
}));

const IngredientsPreview: React.FC<IIngredientsPreviewProps> = ({ igData, srData }: IIngredientsPreviewProps) => {
  const igDataFormatted = useMemo(() => recurseIngredients(igData, i => {
      const custom = formatQuantity(1, 1, i.numerator, i.denominator);
      return { ...i, quantity: custom };
    }), [igData]);

  const srDataFormatted = useMemo(() => srData.map(i => {
    const custom = formatQuantity(1, 1, i.numerator, i.denominator);
    return { ...i, quantity: custom };
  }), [igData]);

  return (
    <div className='recipe-details'>
      <div className='recipe-schema'>
        <article className='ingredients-panel'>
          <div className='ingredient-groups'>
            <SubRecipes subRecipes={srDataFormatted} />
            <IngredientGroups groups={igDataFormatted} hasSubrecipes={srData.length > 0} />
          </div>
        </article>
      </div>
    </div>
  );
};

export default IngredientGroupsBox;
