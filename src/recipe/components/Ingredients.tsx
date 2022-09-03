import { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';
import MeasurementContext from '../../common/context/MeasurementContext';

// import { Checkbox } from '../../common/components/FormComponents';
import { optionallyFormatMessage } from '../../common/utility';
import { Ingredient } from '../store/RecipeTypes';

export interface IIngredientsProps {
  caption: string | undefined;
  data: Array<Ingredient>;
  // checkIngredient: (id: number, checked: boolean) => void;
}

const Ingredients: React.FC<IIngredientsProps> = ({
    caption, data /* , checkIngredient */ }: IIngredientsProps) => {
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
    const quantityString    = ingredient.quantity;
    let measurementString: string;
    if (ingredient.measurement != null) {
      const measurementParserId = measurementsContext.formatter[measurementsContext.parser[ingredient.measurement]];
      if (measurementParserId != null) {
        measurementString = optionallyFormatMessage(intl, 'measurement.', measurementParserId, { itemCount: ingredient.quantity });
      } else {
        measurementString = ingredient.measurement;
      }
    } else {
      measurementString = '';
    }
    const titleString = ingredient.title;

    return (
      <tr className='ingredient' key={String(ingredient.id ?? index)}>
        {/*
        <Checkbox
            name    = {String(ingredient.id)}
            checked = {ingredient.checked ?? false}
            change  = {(name, newValue) => checkIngredient(parseInt(name), newValue)} /> */}
        <td className='quantity'>
          <span>
            {quantityString}
            {quantityString != null && quantityString.length > 0 && measurementString.length > 0 && ' '}
            {measurementString}
          </span>
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
      {caption && <caption className='subheading h3'>{caption}:</caption>}
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
