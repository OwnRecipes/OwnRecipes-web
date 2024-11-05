import { useEffect, useMemo } from 'react';
import { defineMessages, IntlShape, useIntl } from 'react-intl';
import classNames from 'classnames';

import { Carousel } from 'react-bootstrap';

import { RootState } from '../../app/Store';
import * as NewsActions from '../store/actions';
import { useDispatch, useSelector } from '../../common/store/redux';

import P from '../../common/components/P';
import { PendingState } from '../../common/store/GenericReducerType';
import Loading from '../../common/components/Loading';
import { optionallyFormatMessage } from '../../common/utility';

defineMessages({
  news_placeholder_introduction: {
    id: 'news.placeholder.introduction',
    defaultMessage: 'OwnRecipes is an open source recipe management site. You can share recipes with friends, rate recipes, store your favorite recipes to find easily, and more.',
  },
});

const NewsCarousel: React.FC = () => {
  const intl = useIntl();

  const dispatch = useDispatch();
  const news = useSelector((state: RootState) => state.news);
  const newsList = news.items;

  useEffect(() => {
    if (newsList != null && newsList.length !== 0) return;
    dispatch(NewsActions.load());
  }, []);

  const carouselItems = useMemo(() => {
    const translateContent = (intll: IntlShape, entryContent: string) => {
      if (entryContent.startsWith('%') && entryContent.endsWith('%')) {
        return optionallyFormatMessage(intll, 'news.placeholder.', entryContent.substring(1, entryContent.length - 1).toLocaleLowerCase());
      } else {
        return entryContent;
      }
    };

    return (
      newsList?.filter(entry => entry.frontpage && entry.content !== '%features%').map(entry => (
        <Carousel.Item key={entry.id}>
          {entry.image && <img className='d-block' src={entry.image} alt='' />}
          <Carousel.Caption className={classNames({ 'with-image': entry.image != null })}>
            <h2>{entry.title}</h2>
            <P>{translateContent(intl, entry.content)}</P>
          </Carousel.Caption>
        </Carousel.Item>
      )) ?? []);
    }, [newsList, intl.locale]);

  return (
    <>
      {news.meta.pending === PendingState.LOADING && (
        <Loading />
      )}
      {carouselItems.length > 0 && (
        <Carousel
            className = {classNames('news-carousel', { 'with-controls': carouselItems.length > 1 })}
            interval = {15000}
            controls = {carouselItems.length > 1}
            indicators = {carouselItems.length > 1}>
          {carouselItems}
        </Carousel>
      )}
    </>
  );
};

export default NewsCarousel;
