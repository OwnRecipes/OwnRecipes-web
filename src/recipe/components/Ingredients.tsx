import { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { defineMessages, IntlShape, useIntl } from 'react-intl';

import '../css/ingredients.css';

import MeasurementContext, { IMeasurementContext } from '../../common/context/MeasurementContext';
import HeaderLink from '../../common/components/HeaderLink';
import { optionallyFormatMessage, slugify } from '../../common/utility';
import { Ingredient, IngredientGroup } from '../store/RecipeTypes';
import ReCheckbox from '../../common/components/ReduxForm/ReCheckbox';

export interface IIngredientsProps {
  showCaptions: boolean;
  group: IngredientGroup;
  data: Array<Ingredient>;
  withHeaderLink?: boolean;
  selectable?: boolean;
}

export function formatMeasurement(intl: IntlShape, measurementsContext: IMeasurementContext, measurement: string | undefined, quantity: string | undefined): string {
  let measurementString: string;
  if (measurement != null) {
    const measurementParserId = measurementsContext.formatter[measurementsContext.parser[measurement]];
    if (measurementParserId != null) {
      measurementString = optionallyFormatMessage(intl, 'measurement.', measurementParserId, { itemCount: quantity });
    } else {
      measurementString = measurement;
    }
  } else {
    measurementString = '';
  }

  return measurementString;
}

const Ingredients: React.FC<IIngredientsProps> = ({
    showCaptions, group, data, withHeaderLink, selectable }: IIngredientsProps) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const messages = defineMessages({
    quantity: {
      id: 'ingredients.table.quantity',
      description: 'Ingredients table quantity header',
      defaultMessage: 'Quantity',
    },
    ingredient: {
      id: 'ingredients.table.ingredient',
      description: 'Ingredients table ingredient header',
      defaultMessage: 'Ingredient',
    },
  });

  const measurementsContext = useContext(MeasurementContext);
  const caption = showCaptions && group.title ? group.title : undefined;
  const captionSlug = slugify(caption ?? '');

  const ingredients = data.map((ingredient, index) => {
    const quantityS   = ingredient.quantity;
    const msrmtString = formatMeasurement(intl, measurementsContext, ingredient.measurement, ingredient.quantity);
    const titleString = ingredient.title;
    const fullString  = [quantityS, msrmtString, titleString].join(' ');
    const renderQuantity: boolean = Boolean(quantityS) || Boolean(msrmtString);

    return (
      <tr className='ingredient' key={(ingredient.id ?? index).toString()}>
        {selectable && (
          <td className='selection'>
            <ReCheckbox
                label = {fullString}
                className = 'label-sr-only'
                name  = {`ingredients.${group.slug}.cb-${ingredient.id}`} />
          </td>
        )}
        <td className='quantity'>
          {renderQuantity && (
            <span>
              {quantityS}
              {quantityS != null && quantityS.length > 0 && msrmtString.length > 0 && ' '}
              {msrmtString}
            </span>
          )}
        </td>
        <td className='ingredient'>
          <span>
            {titleString}
          </span>
        </td>
      </tr>
    );
  });

  return (
    <Table striped size='sm' className='table ingredients-table'>
      {caption && (
        <caption id={withHeaderLink ? `ingredients-${captionSlug}` : undefined} className='subheading h3'>
          {`${caption}:`}
          {withHeaderLink && <HeaderLink linkFor={`ingredients-${captionSlug}`} />}
        </caption>
      )}
      <thead className='hideme'>
        <tr>
          {selectable && (
            <th><span>Selection</span></th>
          )}
          <th><span>{formatMessage(messages.quantity)}</span></th>
          <th><span>{formatMessage(messages.ingredient)}</span></th>
        </tr>
      </thead>
      <tbody>
        {ingredients}
      </tbody>
    </Table>
  );
};

export default Ingredients;
