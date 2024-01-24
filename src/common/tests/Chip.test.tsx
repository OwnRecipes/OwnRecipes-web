import renderer from 'react-test-renderer';

import Chip from '../components/Chip';

test('Chip', () => {
  const component = renderer.create(
    <Chip
        color='secondary'
        className='some class'
        >
      Some string test
    </Chip>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
