import Directions from '../components/Directions';
import create from '../../test/create';

import data from './data';

test('Direction component test', () => {
  const component = create(
    <Directions directions={data.directions} ingredients={[]} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
