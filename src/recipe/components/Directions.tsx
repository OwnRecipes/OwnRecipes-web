import { useMemo } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import classNames from 'classnames';

import '../css/directions.css';

import { IngredientGroup } from '../store/RecipeTypes';
import P from '../../common/components/P';
import IngredientGroups from './IngredientGroups';

export interface IDirectionsProps {
  directions: string;
  ingredients: Array<IngredientGroup>;
}

type DirectionWithIngredients = {
  heading?:     string;
  directions:   Array<string>;
  ingredients?: Array<IngredientGroup>;
}

type DirectionsWithIngredients = Array<DirectionWithIngredients>;

function getIngredientsForStep(heading: string, unassignedIngredients: Array<IngredientGroup>): IngredientGroup | undefined {
  const igIndex = unassignedIngredients.findIndex(ig => ig.title === heading);
  if (igIndex >= 0) {
    const igs = unassignedIngredients.splice(igIndex, 1);
    return igs[0];
  }

  return undefined;
}

function pushDirections(groups: DirectionsWithIngredients, heading: string, directions: Array<string>, unassignedIngredients: Array<IngredientGroup>) {
  if (directions.length === 0) return;

  const ig = getIngredientsForStep(heading, unassignedIngredients);

  groups.push({
    heading:     heading,
    directions:  directions,
    ingredients: ig ? [ig] : undefined,
  });
}

function assignRemainingIngredients(groups: DirectionsWithIngredients, unassignedIngredients: Array<IngredientGroup>) {
  if (unassignedIngredients.length === 0) return;

  const untitledStep = groups.find(di => !di.heading);
  if (untitledStep) {
    if (untitledStep.ingredients) {
      untitledStep.ingredients.push(...unassignedIngredients);
    } else {
      untitledStep.ingredients = [...unassignedIngredients];
    }
  } else {
    groups.unshift({ directions: [], ingredients: [...unassignedIngredients] });
  }

  unassignedIngredients.splice(0, unassignedIngredients.length);
}

function parseDirections(directionsString: string, ingredients: Array<IngredientGroup>): DirectionsWithIngredients {
  const unassignedIngredients = [...ingredients];
  const isMultiStep = directionsString.includes('\n');

  const directionsGroups: DirectionsWithIngredients = [];
  let directions: Array<string> = [];
  let nextHeading = '';

  if (isMultiStep) {
    directionsString.split('\n').filter(direction => direction.length > 0).forEach(direction => {
      if (direction.endsWith(':')) {
        pushDirections(directionsGroups, nextHeading, directions, unassignedIngredients);
        nextHeading = direction.substring(0, direction.length - 1);
        directions = [];
      } else {
        directions.push(direction);
      }
    });

    pushDirections(directionsGroups, nextHeading, directions, unassignedIngredients);
  } else {
    pushDirections(directionsGroups, '', [directionsString], unassignedIngredients);
  }

  assignRemainingIngredients(directionsGroups, unassignedIngredients);

  return directionsGroups;
}

function formatDirections(directions: DirectionsWithIngredients) {
  return directions
    .filter(di => di.directions.length > 0 || (di.ingredients != null && di.ingredients.length > 0))
    .map(di => {
      let directionsJsx: React.ReactElement | undefined;
      if (di.directions.length === 1) {
        directionsJsx = (
          <div className='direction'>
            {di.directions[0]}
          </div>
        );
      } else if (di.directions.length > 1) {
        directionsJsx = (
          <ol className='directions'>
            {di.directions.map(direction => (
              <li className='direction' key={direction}>
                {direction}
              </li>
            ))}
          </ol>
        );
      }

      const isDefaultGroup = !di.heading;

      return (
        <div key={di.heading ?? ''} className={classNames('subgroup', di.heading || 'default-group')}>
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          {di.heading && <h3>{di.heading}:</h3>}
          {di.ingredients && di.ingredients.length > 0 && (
            <div className='ingredients'>
              <IngredientGroups groups={di.ingredients} hasSubrecipes={isDefaultGroup && directions.length > 1} />
            </div>
          )}
          {directionsJsx}
        </div>
      );
    });
}

const Directions: React.FC<IDirectionsProps> = ({ directions: directionsString, ingredients }: IDirectionsProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    directions: {
      id: 'recipe.directions',
      description: 'Directions',
      defaultMessage: 'Directions',
    },
    no_directions: {
      id: 'recipe.directions.no_directions',
      description: 'No directions provided message',
      defaultMessage: '(This recipe has no directions.)',
    },
  });

  const hasData = directionsString.trim().length > 1; // Ignore single fake char.

  const directionGroups: DirectionsWithIngredients = useMemo(() => parseDirections(directionsString, ingredients), [directionsString, ingredients]);
  const directionsGroupsJsx: Array<React.ReactNode> = useMemo(() => formatDirections(directionGroups), [directionGroups]);

  return (
    <article className={classNames('directions', { 'multi-directions': directionGroups.length > 1 })}>
      <h2>{formatMessage(messages.directions)}</h2>
      {!hasData && (
        <P className='placeholder'>{formatMessage(messages.no_directions)}</P>
      )}
      {hasData && directionsGroupsJsx}
    </article>
  );
};

export default Directions;
