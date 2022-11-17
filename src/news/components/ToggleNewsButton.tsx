import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import classNames from 'classnames';

import { Button } from 'react-bootstrap';

import { CombinedStore } from '../../app/Store';
import { useSelector } from '../../common/store/redux';
import { PendingState } from '../../common/store/GenericReducerType';

export interface IToggleNewsButtonProps {
  showNews: boolean;
  onClick: () => void;
}

const ToggleNewsButton: React.FC<IToggleNewsButtonProps> = ({ showNews, onClick }: IToggleNewsButtonProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    news_hide: {
      id: 'news.hide news button',
      defaultMessage: 'Got it!',
    },
    news_show: {
      id: 'news.show news button',
      defaultMessage: 'Show news',
    },
  });

  const connection = useSelector((state: CombinedStore) => state.connection);
  const news = useSelector((state: CombinedStore) => state.news);
  const newsList = news.items;

  if (!connection.hasConnection) {
    return null;
  }
  if (news.meta.pending === PendingState.COMPLETED && newsList != null && newsList.filter(entry => entry.frontpage !== false).length === 0) {
    return null;
  }

  return (
    <Button
        id = 'toggle-news-button'
        variant = 'outline-primary'
        onClick = {onClick}
        className = {classNames({
          show: !showNews,
          hide:  showNews,
        })}>
      {formatMessage(showNews ? messages.news_hide : messages.news_show)}
    </Button>
  );
};

export default ToggleNewsButton;
