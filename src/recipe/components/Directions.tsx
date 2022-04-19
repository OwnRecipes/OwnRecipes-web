import { defineMessages, useIntl } from 'react-intl';

import '../css/directions.css';

import P from '../../common/components/P';

export interface IDirectionsProps {
  data: string;
}

function pushDirections(groups: Array<React.ReactNode>, heading: string, directions: Array<React.ReactNode>) {
  if (directions.length === 0) return;
  groups.push(
    <div key={heading} className='subgroup'>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      {heading && <h3>{heading}:</h3>}
      <ol className='directions'>
        {directions}
      </ol>
    </div>
  );
}

const Directions: React.FC<IDirectionsProps> = ({ data }: IDirectionsProps) => {
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

  const hasData = data.trim().length > 1; // Ignore single fake char.
  const isMultiStep = data.includes('\n');

  const directionsGroups: Array<React.ReactNode> = [];
  let directions: Array<React.ReactNode> = [];
  let nextHeading = '';

  if (isMultiStep) {
    data.split('\n').filter(direction => direction.length > 0).forEach(direction => {
          if (direction.endsWith(':')) {
        pushDirections(directionsGroups, nextHeading, directions);
        nextHeading = direction.substring(0, direction.length - 1);
            directions = [];
          } else {
            directions.push(
              <li className='direction' key={direction}>
                {direction}
              </li>
            );
          }
      });

    pushDirections(directionsGroups, nextHeading, directions);
  }

  return (
    <article className='directions'>
      <h2>{formatMessage(messages.directions)}</h2>
      {!hasData && (
        <P className='placeholder'>{formatMessage(messages.no_directions)}</P>
      )}
      {hasData && (
        <>
          {!isMultiStep && <div className='subgroup'>{data}</div>}
          {isMultiStep && directionsGroups}
        </>
      )}
    </article>
  );
};

export default Directions;
