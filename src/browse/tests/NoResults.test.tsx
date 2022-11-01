import NoResults from '../components/NoResults';
import create from '../../test/create';

test('NoResults component test', () => {
  const component = create(
    <NoResults />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
