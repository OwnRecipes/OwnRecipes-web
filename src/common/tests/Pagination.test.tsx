import create from '../../test/create';
import { PaginationLink } from '../components/Pagination';

test('PaginationLink', () => {
  const buildUrl = (): string => 'http://localhost:8080';
  const component = create(
    <PaginationLink
        title='17'
        offset={128}
        active
        buildUrl={buildUrl}
        />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('PaginationLink disabled', () => {
  const buildUrl = (): string => 'http://localhost:8080';
  const component = create(
    <PaginationLink
        title='<-'
        offset={128}
        disabled
        buildUrl={buildUrl}
        />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
