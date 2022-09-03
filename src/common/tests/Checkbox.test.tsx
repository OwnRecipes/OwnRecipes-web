import renderer from 'react-test-renderer';

import Checkbox from '../components/Input/Checkbox';

test('Checkbox', () => {
  const component = renderer.create(
    <Checkbox
        name='cb'
        label='some label'
        className='some class'
        value
        />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox required', () => {
  const component = renderer.create(
    <Checkbox
        name='cb'
        label='some label'
        className='some class'
        value
        required
        />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox readonly', () => {
  const component = renderer.create(
    <Checkbox
        name='cb'
        label='some label'
        className='some class'
        value
        required
        readOnly
        />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox disabled', () => {
  const component = renderer.create(
    <Checkbox
        name='cb'
        label='some label'
        className='some class'
        value
        required
        disabled
        />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox error', () => {
  const component = renderer.create(
    <Checkbox
        name='cb'
        label='some label'
        className='some class'
        value
        required
        errors='Oh no!'
        />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox complex', () => {
  const component = renderer.create(
    <Checkbox
        name='cb'
        label='some label'
        className='some class'
        value
        required
        tooltip='some tooltip'
        helpText='some advice'
        errors='Oh no!'
        />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
