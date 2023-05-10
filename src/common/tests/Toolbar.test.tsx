import create from '../../test/create';
import { Toolbar } from '../components/Toolbar';

test('Toolbar', () => {
  const component = create(
    <Toolbar>
      <span>x</span>
    </Toolbar>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Toolbar end', () => {
  const component = create(
    <Toolbar position='end'>
      <span>x</span>
    </Toolbar>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
