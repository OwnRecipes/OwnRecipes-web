import { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import * as _ from 'lodash-es';

import * as RecipeGroupActions from '../../recipe_groups/store/actions';
import { useDispatch, useSelector } from '../../common/store/redux';
import { RootState } from '../../app/Store';
import useSingle from '../../common/hooks/useSingle';
import { optionallyFormatMessage, sortByLabel } from '../../common/utility';
import { Course } from '../../recipe/store/RecipeTypes';
import ReCreatableSelect from '../../common/components/ReInput/ReCreatableSelect';

export interface ICourseSelectContainerProps {
  name: string;
  label: string;
}

const CourseSelectContainer: React.FC<ICourseSelectContainerProps> = ({
    name, label }: ICourseSelectContainerProps) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const fetchCourses = useCallback(() => { dispatch(RecipeGroupActions.fetchCourses()); }, []);
  const courses = useSelector((state: RootState) => state.recipeGroups.courses.items);
  useSingle(fetchCourses, courses);

  const data = useMemo(() => courses
      ?.map(c => ({ value: c.title, label: optionallyFormatMessage(intl, 'course.', c.title) }))
      .sort(sortByLabel), [courses, intl.locale]);

  const parser = useCallback((newValue: string | undefined): Course | undefined => {
    if (newValue == null) {
      return undefined;
    } else {
      return courses?.find(c => c.title === newValue) ?? { title: newValue } as Course;
    }
  }, [courses]);

  const formatter = useCallback((value: Array<Course> | Course): Array<string> | string => (
    _.castArray(value).map(v => v.title)
  ), []);

  return (
    <ReCreatableSelect
        name = {name}
        label = {label}
        data = {data}
        parser = {parser}
        formatter = {formatter}
        />
  );
};

export default CourseSelectContainer;
