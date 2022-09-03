import React, { useContext, useMemo } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Form as ReduxForm } from 'react-final-form';

import '../../recipe/css/recipe.css';
import '../css/recipe_form.css';

import IngredientGroupsBox, { ingredientsFormatter, ingredientsParser, subrecipesFormatter, subrecipesParser } from './IngredientGroupsBox';
import DirectionBox from './DirectionBox';
import Status from './Status';
import { Recipe } from '../../recipe/store/RecipeTypes';
import TagListContainer from '../containers/TagListContainer';
import CourseSelectContainer from '../containers/CourseSelectContainer';
import CuisineSelectContainer from '../containers/CuisineSelectContainer';
import RecipeFormToolbar from '../containers/RecipeFormToolbar';
import RecipeFormImageRow from './RecipeFormImageRow';
import ReInput from '../../common/components/ReduxForm/ReInput';
import ReCheckbox from '../../common/components/ReduxForm/ReCheckbox';
import InitialValuesResetter from '../../common/components/ReduxForm/ReInitialValuesResetter';
import { AutocompleteListItem } from '../../common/components/Input/TextareaAutocomplete';
import MeasurementContext from '../../common/context/MeasurementContext';

export interface IRecipeFormProps {
  recipe: Recipe | undefined;

  fetchRecipeList: (searchTerm: string) => Promise<AutocompleteListItem[]>;
  onSubmit: (form: Recipe) => void;
}

type RecipeFormatted = {
  ingredientGroupsS: string;
  subrecipesS: string;
} & Recipe;

const RecipeForm: React.FC<IRecipeFormProps> = ({
    recipe,
    fetchRecipeList, onSubmit } : IRecipeFormProps) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const messages = defineMessages({
    name_label: {
      id: 'recipe.create.name_label',
      description: 'Recipe name label',
      defaultMessage: 'Recipe name',
    },
    course_label: {
      id: 'recipe.create.course_label',
      description: 'Course label',
      defaultMessage: 'Course',
    },
    cuisine_label: {
      id: 'recipe.create.cuisine_label',
      description: 'Cuisine label',
      defaultMessage: 'Cuisine',
    },
    tags_label: {
      id: 'recipe.create.tags_label',
      description: 'Tags label',
      defaultMessage: 'Tags',
    },
    prep_time_label: {
      id: 'recipe.create.prep_time_label',
      description: 'Prep time label',
      defaultMessage: 'Prep time (min)',
    },
    cooking_time_label: {
      id: 'recipe.create.cooking_time_label',
      description: 'Cooking time label',
      defaultMessage: 'Cooking time (min)',
    },
    servings_label: {
      id: 'recipe.create.servings_label',
      description: 'Servings label',
      defaultMessage: 'Servings',
    },
    information_label: {
      id: 'recipe.create.information_label',
      description: 'Recipe information label',
      defaultMessage: 'Recipe information',
    },
    information_placeholder: {
      id: 'recipe.create.information_placeholder',
      description: 'Recipe information placeholder',
      defaultMessage: 'A quick description of the recipe',
    },
    source_label: {
      id: 'recipe.create.source_label',
      description: 'Rating source label',
      defaultMessage: 'Source',
    },
    source_tooltip: {
      id: 'recipe.create.source_tooltip',
      description: 'Rating source tooltip',
      defaultMessage: 'Where the original recipe is from.',
    },
    public_label: {
      id: 'recipe.create.public_label',
      description: 'Recipe set public label',
      defaultMessage: 'Public Recipe',
    },
  });

  const measurementsContext = useContext(MeasurementContext);

  const handleSubmit = (form: RecipeFormatted) => onSubmit({
    ...form,
    ingredientGroups: ingredientsParser(measurementsContext.parser, form.ingredientGroupsS),
    subrecipes:        subrecipesParser(measurementsContext.parser, form.subrecipesS),
  });

  const initialValues: Partial<RecipeFormatted> | undefined = useMemo(() => (
    recipe ? {
      ...recipe,
      ingredientGroupsS: ingredientsFormatter(intl, measurementsContext.formatter, recipe.ingredientGroups),
      subrecipesS:        subrecipesFormatter(intl, measurementsContext.formatter, recipe.subrecipes),
    } : {
      slug: '',
      public: true,
      servings: 1,
      ingredientGroupsS: '',
      subrecipesS: '',
    }), [recipe]);

  // console.log(`[RecipeForm] initialValues=${JSON.stringify(initialValues)}`);

  return (
    <ReduxForm
        initialValues = {initialValues}
        onSubmit = {handleSubmit}
        subscription = {{}}
        render = {({ form, handleSubmit: renderSubmit }) => (
          <Form className='recipe-form' onSubmit={renderSubmit}>
            <Status />
            <InitialValuesResetter form={form} initialValues={initialValues} />
            <Container>
              <Row>
                <Col id='recipe-meta' md={5} lg={4}>
                  <Row>
                    <Col xs={12}>
                      <ReInput
                          name      = 'title'
                          label     = {formatMessage(messages.name_label)}
                          required
                          />
                    </Col>
                  </Row>

                  <RecipeFormImageRow />

                  <Row>
                    <Col xs={12} sm={6}>
                      <CourseSelectContainer
                          name     = 'course'
                          label    = {formatMessage(messages.course_label)} />
                    </Col>
                    <Col xs={12} sm={6}>
                      <CuisineSelectContainer
                          name     = 'cuisine'
                          label    = {formatMessage(messages.cuisine_label)} />
                    </Col>
                    <Col xs={12}>
                      <TagListContainer
                          name     = 'tags'
                          label    = {formatMessage(messages.tags_label)} />
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} sm={6}>
                      <ReInput
                          name     = 'prepTime'
                          type     = 'number'
                          label    = {formatMessage(messages.prep_time_label)}
                          min      = {1}
                          max      = {999} />
                    </Col>
                    <Col xs={12} sm={6}>
                      <ReInput
                          name     = 'cookTime'
                          type     = 'number'
                          label    = {formatMessage(messages.cooking_time_label)} />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <ReInput
                          name     = 'servings'
                          type     = 'number'
                          label    = {formatMessage(messages.servings_label)}
                          min      = {1}
                          max      = {999}
                          required />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <ReInput
                          name     = 'source'
                          label    = {formatMessage(messages.source_label)}
                          tooltip  = {formatMessage(messages.source_tooltip)} />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <ReCheckbox
                          name      = 'public'
                          label     = {formatMessage(messages.public_label)} />
                    </Col>
                  </Row>

                </Col>
                <Col id='recipe' md={7} lg={8}>
                  <ReInput
                      name     = 'info'
                      rows     = {3}
                      label    = {formatMessage(messages.information_label)}
                      placeholder = {formatMessage(messages.information_placeholder)} />
                  <IngredientGroupsBox
                      nameIg   = 'ingredientGroupsS'
                      nameSub  = 'subrecipesS'
                      fetchRecipeList = {fetchRecipeList} />
                  <DirectionBox
                      name       = 'directions' />

                  <RecipeFormToolbar />
                </Col>
              </Row>
            </Container>
          </Form>
    )} />
  );
};

export default RecipeForm;
