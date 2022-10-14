import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Col, Container, Form, Row } from 'react-bootstrap';

import '../../recipe/css/recipe.css';
import '../css/recipe_form.css';

import Checkbox from '../../common/components/Checkbox';
import Input from '../../common/components/Input';

import IngredientGroupsBox from './IngredientGroupsBox';
import DirectionBox from './DirectionBox';
import Status from '../containers/Status';
import { Recipe } from '../../recipe/store/RecipeTypes';
import { AutocompleteListItem } from '../store/types';
import { formatValidation, ValidationResult } from '../../common/store/Validation';
import TagListContainer from '../containers/TagListContainer';
import CourseSelectContainer from '../containers/CourseSelectContainer';
import CuisineSelectContainer from '../containers/CuisineSelectContainer';
import RecipeFormToolbar from '../containers/RecipeFormToolbar';
import RecipeFormImageRow from './RecipeFormImageRow';
import useCrash from '../../common/hooks/useCrash';

export interface IRecipeFormProps {
  form:      Recipe | undefined;
  validation: ValidationResult | undefined;

  fetchRecipeList: (searchTerm: string) => Promise<AutocompleteListItem[]>;

  update:   (name: string, value: unknown) => void;
  validate: (form: Recipe) => void;
  save:     (form: Recipe) => void;
}

const RecipeForm: React.FC<IRecipeFormProps> = ({
    form, validation,
    fetchRecipeList, update, validate, save } : IRecipeFormProps) => {
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

  const crash = useCrash();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (form == null) { crash('Invalid state: form may not be undefined.'); return; }
    e.preventDefault();
    save(form);
  };

  const handleInvalid = () => {
    if (form == null) { crash('Invalid state: form may not be undefined.'); return; }
    validate(form);
  };

  return (
    <Form className='recipe-form' onSubmit={handleSubmit} onInvalid={handleInvalid}>
      <Container>
        <Row>
          <Status />
        </Row>
        <Row>
          <Col id='recipe-meta' md={5} lg={4}>
            <Row>
              <Col xs={12}>
                <Input
                    name     = 'title'
                    label    = {formatMessage(messages.name_label)}
                    value    = {form?.title ?? ''}
                    required
                    errors   = {formatValidation(intl, validation?.title)}
                    onChange = {update} />
              </Col>
            </Row>

            <RecipeFormImageRow
                form = {form}
                update = {update}
                />

            <Row>
              <Col xs={12} sm={6}>
                <CourseSelectContainer
                    name     = 'course'
                    label    = {formatMessage(messages.course_label)}
                    value    = {form?.course?.title ?? ''}
                    errors   = {formatValidation(intl, validation?.course)}
                    onChange = {update} />
              </Col>
              <Col xs={12} sm={6}>
                <CuisineSelectContainer
                    name     = 'cuisine'
                    label    = {formatMessage(messages.cuisine_label)}
                    value    = {form?.cuisine?.title ?? ''}
                    errors   = {formatValidation(intl, validation?.cuisine)}
                    onChange = {update} />
              </Col>
              <Col xs={12}>
                <TagListContainer
                    name     = 'tags'
                    label    = {formatMessage(messages.tags_label)}
                    value    = {form?.tags?.map(t => t.title) ?? []}
                    errors   = {formatValidation(intl, validation?.tags)}
                    onChange = {update} />
              </Col>
            </Row>

            <Row>
              <Col xs={12} sm={6}>
                <Input
                    name     = 'prepTime'
                    type     = 'number'
                    label    = {formatMessage(messages.prep_time_label)}
                    value    = {form?.prepTime ?? ''}
                    min      = {1}
                    max      = {999}
                    errors   = {formatValidation(intl, validation?.prepTime)}
                    onChange = {update} />
              </Col>
              <Col xs={12} sm={6}>
                <Input
                    name     = 'cookTime'
                    type     = 'number'
                    label    = {formatMessage(messages.cooking_time_label)}
                    value    = {form?.cookTime ?? ''}
                    errors   = {formatValidation(intl, validation?.cookTime)}
                    onChange = {update} />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Input
                    name     = 'servings'
                    type     = 'number'
                    label    = {formatMessage(messages.servings_label)}
                    value    = {form?.servings ?? ''}
                    min      = {1}
                    max      = {999}
                    required
                    errors   = {formatValidation(intl, validation?.servings)}
                    onChange = {update} />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Input
                    name     = 'source'
                    label    = {formatMessage(messages.source_label)}
                    tooltip  = {formatMessage(messages.source_tooltip)}
                    value    = {form?.source ?? ''}
                    errors   = {formatValidation(intl, validation?.source)}
                    onChange = {update} />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Checkbox
                    name      = 'public'
                    label     = {formatMessage(messages.public_label)}
                    value     = {form?.public ?? false}
                    errors    = {formatValidation(intl, validation?.public)}
                    onChange  = {update} />
              </Col>
            </Row>

          </Col>
          <Col id='recipe' md={7} lg={8}>
            <Input
                name     = 'info'
                rows     = {3}
                label    = {formatMessage(messages.information_label)}
                placeholder = {formatMessage(messages.information_placeholder)}
                value    = {form?.info ?? ''}
                errors   = {formatValidation(intl, validation?.info)}
                onChange = {update} />
            <IngredientGroupsBox
                name     = 'ingredientGroups'
                errors   = {formatValidation(intl, validation?.ingredientGroups) || formatValidation(intl, validation?.subrecipes)}
                groups   = {form?.ingredientGroups}
                subrecipes = {form?.subrecipes}
                fetchRecipeList = {fetchRecipeList}
                onChange = {update} />
            <DirectionBox
                name       = 'directions'
                directions = {form?.directions ?? ''}
                errors     = {formatValidation(intl, validation?.directions)}
                onChange   = {update} />

            <RecipeFormToolbar />
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default RecipeForm;
