import { Button } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';

import '../../common/css/modal.css';

import Icon from '../../common/components/Icon';
import P from '../../common/components/P';

export interface ISearchReloadProps {
  onReloadClick: () => void;
}

const messages = defineMessages({
  search_nothing_found_yet_heading: {
    id: 'random.reload.heading',
    description: 'Nothing found?',
    defaultMessage: 'Not the right one?',
  },
  search_nothing_found_yet: {
    id: 'random.reload.text',
    description: 'Nothing found? Text',
    defaultMessage: 'Just give it another try.',
  },
  search_reload_button: {
    id: 'random.reload.button',
    description: 'Title/tooltip of the icon button to reload to recipes.',
    defaultMessage: 'Reload recipes',
  },
});

const SearchReload: React.FC<ISearchReloadProps> = ({ onReloadClick }: ISearchReloadProps) => {
  const { formatMessage } = useIntl();

  return (
    <div className='search-reload reload-container print-hidden'>
      <div className='search-reload modal-content'>
        <div className='search-reload-box'>
          <h2>{formatMessage(messages.search_nothing_found_yet_heading)}</h2>
          <P>{formatMessage(messages.search_nothing_found_yet)}</P>
        </div>
        <div className='search-reload-button-box'>
          <Button id='reload-random-button' variant='primary' aria-label={formatMessage(messages.search_reload_button)} onClick={onReloadClick}>
            <Icon icon='arrow-repeat' variant='light' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchReload;
