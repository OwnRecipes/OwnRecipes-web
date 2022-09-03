import renderer from 'react-test-renderer';

import Input from '../components/Input/Input';

test('Input type text', () => {
  const handleChange = jest.fn();
  const component = renderer.create(
    <Input
        name  = 'myInput'
        label = 'My Input'
        type  = 'text'
        value = 'Some value'
        placeholder = 'Some placeholder'
        autoComplete = 'Some autocomplete'
        onChange = {handleChange} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Input type number', () => {
  const handleChange = jest.fn();
  const component = renderer.create(
    <Input
        name  = 'myInput'
        label = 'My Input'
        type  = 'number'
        value = '17'
        placeholder = 'Some placeholder'
        autoComplete = 'Some autocomplete'
        onChange = {handleChange} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Input type text multirow', () => {
  const handleChange = jest.fn();
  const component = renderer.create(
    <Input
        name  = 'myInput'
        label = 'My Input'
        type  = 'text'
        rows  = {4}
        value = 'Some value'
        placeholder = 'Some placeholder'
        autoComplete = 'Some autocomplete'
        onChange = {handleChange} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Input required', () => {
  const handleChange = jest.fn();
  const component = renderer.create(
    <Input
        name  = 'myInput'
        label = 'My Input'
        type  = 'text'
        value = 'Some value'
        required
        onChange = {handleChange} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Input readOnly', () => {
  const component = renderer.create(
    <Input
        name  = 'myInput'
        label = 'My Input'
        type  = 'text'
        value = 'Some value'
        readOnly />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Input inputAdornmentStart', () => {
  const component = renderer.create(
    <Input
        name  = 'myInput'
        label = 'My Input'
        type  = 'text'
        value = 'Some value'
        inputAdornmentStart = {<span className='some span'>some span</span>} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
