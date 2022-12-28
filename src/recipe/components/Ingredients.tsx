import { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { defineMessages, IntlShape, useIntl } from 'react-intl';

import MeasurementContext, { IMeasurementContext } from '../../common/context/MeasurementContext';
import HeaderLink from '../../common/components/HeaderLink';
// import { Checkbox } from '../../common/components/FormComponents';
import { optionallyFormatMessage } from '../../common/utility';
import { Ingredient } from '../store/RecipeTypes';

export interface IIngredientsProps {
  caption: string | undefined;
  data: Array<Ingredient>;
  withHeaderLink?: boolean;
  // checkIngredient: (id: number, checked: boolean) => void;
}

export function formatMeasurement(measurementsContext: IMeasurementContext, measurement: string | undefined, intl: IntlShape, quantity: string | undefined): string {
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
    caption, data, withHeaderLink /* , checkIngredient */ }: IIngredientsProps) => {
  const intl = useIntl();
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

  const ingredients = data.map((ingredient, index) => {
    const quantityS    = ingredient.quantity;
    const measurementString = formatMeasurement(measurementsContext, ingredient.measurement, intl, ingredient.quantity);
    const titleString = ingredient.title;
    const renderQuantity: boolean = Boolean(quantityS) || Boolean(measurementString);

    return (
      <tr className='ingredient' key={String(ingredient.id ?? index)}>
        {/*
        <Checkbox
            name    = {String(ingredient.id)}
            checked = {ingredient.checked ?? false}
            change  = {(name, newValue) => checkIngredient(parseInt(name), newValue)} /> */}
        <td className='quantity'>
          {renderQuantity && (
            <span>
              {quantityS}
              {quantityS != null && quantityS.length > 0 && measurementString.length > 0 && ' '}
              {measurementString}
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
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      {caption && (
        <caption id={withHeaderLink ? `ingredients-${caption}` : undefined} className='subheading h3'>
          {`${caption}:`}
          {withHeaderLink && <HeaderLink linkFor={`ingredients-${caption}`} />}
        </caption>
      )}
      <thead className='hideme'>
        <tr>
          <th><span>{intl.formatMessage(messages.quantity)}</span></th>
          <th><span>{intl.formatMessage(messages.ingredient)}</span></th>
        </tr>
      </thead>
      <tbody>
        {ingredients}
      </tbody>
    </Table>
  );
};

export default Ingredients;
