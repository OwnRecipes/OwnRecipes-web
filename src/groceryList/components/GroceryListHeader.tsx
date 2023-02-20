import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { defineMessages, useIntl } from 'react-intl';
import { Form as ReduxForm, FormSpy } from 'react-final-form';
import { useLocation, useNavigate } from 'react-router';
import { Button, Dropdown, Form } from 'react-bootstrap';

import '../css/grocery_list_header.css';

import { GroceryList, GroceryListCreate, GroceryListUpdate } from '../store/GroceryListTypes';
import Icon from '../../common/components/Icon';
import Modal from '../../common/components/Modal';
import ReFormStatus from '../../common/components/ReduxForm/ReFormStatus';
import InitialValuesResetter from '../../common/components/ReduxForm/ReInitialValuesResetter';
import ReInput from '../../common/components/ReduxForm/ReInput';
import NavLink from '../../header/components/NavLink';
import NavButton from '../../common/components/NavButton';
import { getRoutePath } from '../../common/utility';
import Tooltip from '../../common/components/Tooltip';
import GroceryListSummary from './GroceryListSummary';
import { GroceryListItem } from '../store/GroceryListItemTypes';
import { GROCERY_LIST_FILTER } from '../containers/GroceryListContainer';
import { ValidationResult } from '../../common/store/Validation';

export interface IGroceryListHeaderProps {
  list: GroceryList | undefined;
  isNew: boolean;
  onCreate: (item: GroceryListCreate) => Promise<ValidationResult>;
  onUpdate: (upd: GroceryListUpdate) => Promise<ValidationResult>;
  onRemove: () => void;

  items: Array<GroceryListItem> | undefined;
  filter: GROCERY_LIST_FILTER;
  onChangeFilter: (newFilter: GROCERY_LIST_FILTER) => void;
}

interface FormDataProps {
  title: string;
}

const GroceryListHeader: React.FC<IGroceryListHeaderProps> = ({
    list, isNew, onCreate, onUpdate, onRemove,
    items, filter, onChangeFilter }: IGroceryListHeaderProps) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const messages = defineMessages({
    new_title_placeholder: {
      id: 'grocery_list.header.title_placeholder',
      defaultMessage: '(Enter a new title)',
    },
    confirm_delete_message: {
      id: 'grocery_list.header.confirm_delete',
      description: 'Are you sure you want to delete this list?',
      defaultMessage: 'Are you sure you want to delete this list?',
    },
    edit_list: {
      id: 'grocery_list.header.edit_list_button',
      defaultMessage: 'Edit',
    },
    delete_list: {
      id: 'grocery_list.header.delete_list_button',
      defaultMessage: 'Delete',
    },
    back_to_lists: {
      id: 'grocery_list.header.back_to_lists',
      defaultMessage: 'To my grocery lists',
    },
  });

  const location = useLocation();
  const nav = useNavigate();

  const parentPagePath = location.pathname.substring(0, location.pathname.lastIndexOf('/create'));

  const titleRef = useRef(null);
  const inputRef = useRef(null);

  const [editMode, setEditMode] = useState<boolean>(isNew);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const handleDeleteClick  = useCallback(() => { setShowDeleteConfirm(true); }, []);
  const handleDeleteAccept = useCallback(() => { onRemove(); }, [onRemove]);
  const handleDeleteClose  = useCallback(() => { setShowDeleteConfirm(false); }, []);

  const listSlug = list?.slug;

  useEffect(() => {
    if (editMode !== isNew) {
      setEditMode(isNew);
    }
    if (showDeleteConfirm) {
      setShowDeleteConfirm(false);
    }
  }, [isNew, list]);

  const handleEditClick = useCallback(() => {
    setEditMode(true);
    if (inputRef != null && inputRef.current != null) {
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (inputRef.current as any).focus();
      }, 1);
    }
  }, [inputRef?.current]);

  const handleRevertClick = useCallback(() => {
    setEditMode(false);
  }, []);

  const handleSubmit = useCallback(async (form: FormDataProps) => {
    if (isNew) {
      const createList: GroceryListCreate = {
        title: form.title,
      };
      return onCreate(createList);
    } else {
      const updList: GroceryListUpdate = {
        title: form.title,
      };
      return onUpdate(updList);
    }
  }, [isNew, onCreate, onUpdate]);
  const handleSubmitSuccess = useCallback(() => {
    if (isNew) {
      nav(`${parentPagePath}/${listSlug}`);
    }

    setEditMode(false);
    if (titleRef != null && titleRef.current != null) {
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (titleRef.current as any).focus();
      }, 1);
    }
  }, [isNew, parentPagePath, listSlug, titleRef?.current]);

  const initialValues: Partial<FormDataProps> = useMemo(() => (list ? { title: list.title } : {}), [list]);

  return (
    <>
      <div className={classNames({
          editing: editMode,
          'list-header': true,
        })}>
        <div className='grocery-list-title-bar' tabIndex={-1} ref={titleRef}>
          {list && !isNew && !editMode && (
            <>
              <Tooltip id='to-grocery-lists' tooltip={formatMessage(messages.back_to_lists)} placement='bottom'>
                <NavButton variant='transparent' to={getRoutePath('/grocery-lists')} className='print-hidden'><Icon icon='caret-left' /></NavButton>
              </Tooltip>
              <h2>{list.title}</h2>
            </>
          )}

          {editMode && (
            <ReduxForm
                initialValues = {initialValues}
                onSubmit = {handleSubmit}
                subscription = {{}}
                render = {({ form, handleSubmit: renderSubmit }) => (
                  <Form onSubmit={renderSubmit} className='change-grocery-list-title-form'>
                    <ReFormStatus onSubmitSuccess={handleSubmitSuccess} />

                    <InitialValuesResetter form={form} initialValues={initialValues} />

                    <div className='title-group'>
                      <ReInput
                          name = 'title'
                          placeholder = {formatMessage(messages.new_title_placeholder)}
                          ref = {inputRef}
                          />
                      <FormSpy subscription={{ values: true, submitting: true }}>
                        {({ values, submitting }) => (
                          <>
                            <Button type='submit' variant='outline-primary' disabled={!values.title || submitting}>
                              <Icon icon='check' variant='light' size='2x' />
                            </Button>
                            {!isNew && (
                              <Button type='button' variant='outline-secondary' disabled={!values.title || submitting} onClick={handleRevertClick}>
                                <Icon icon='x' variant='light' size='2x' />
                              </Button>
                            )}
                          </>
                        )}
                      </FormSpy>
                    </div>
                  </Form>
            )} />
          )}

          {!editMode && (
            <Dropdown>
              <Dropdown.Toggle id='grocery-header-option-menu' variant='transparent' className='print-hidden'>
                <Icon icon='three-dots-vertical' variant='light' />
              </Dropdown.Toggle>

              <Dropdown.Menu id='grocery-header-option-menu-dropdown'>
                <Dropdown.Item onClick={handleEditClick}>{formatMessage(messages.edit_list)}</Dropdown.Item>
                <Dropdown.Item onClick={handleDeleteClick}>{formatMessage(messages.delete_list)}</Dropdown.Item>
                <Dropdown.Divider />
                <NavLink to={`${parentPagePath}/create`} active={false}>{intl.messages['nav.grocery_list_create'] as string}</NavLink>
              </Dropdown.Menu>
            </Dropdown>
          )}

        </div>
        {!isNew && (
          <GroceryListSummary
              list   = {list}
              items  = {items}
              filter = {filter}
              onChangeFilter = {onChangeFilter} />
        )}
      </div>

      <Modal
          show = {showDeleteConfirm}
          title = {intl.messages['recipe.confirm_delete_title'] as string}
          acceptTitle = {intl.messages['recipe.confirm_delete_accept'] as string}
          onAccept = {handleDeleteAccept}
          onClose  = {handleDeleteClose}
          acceptButtonProps = {{ variant: 'danger' }}>
        {intl.formatMessage(messages.confirm_delete_message)}
      </Modal>
    </>
  );
};

export default GroceryListHeader;
