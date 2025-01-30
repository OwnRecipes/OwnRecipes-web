import { forwardRef, RefObject, useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { Dropdown, Col, Form, Row } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';
import { Form as ReForm } from 'react-final-form';

import Icon from '../../common/components/Icon';
import Checkbox from '../../common/components/Input/Checkbox';
import Modal from '../../common/components/Modal';
import { ValidationResult } from '../../common/store/Validation';
import { GroceryListItem, GroceryListItemUpdate } from '../store/GroceryListItemTypes';
import ReFormStatus from '../../common/components/ReInput/ReFormStatus';
import InitialValuesResetter from '../../common/components/ReInput/ReInitialValuesResetter';
import ReInput from '../../common/components/ReInput/ReInput';

const messages = defineMessages({
  edit_button: {
    id: 'grocery_list.item.edit_button',
    defaultMessage: 'Edit',
  },
  delete_button: {
    id: 'grocery_list.item.delete_button',
    defaultMessage: 'Delete',
  },
  old_title: {
    id: 'grocery_list.item.old_title_label',
    defaultMessage: 'Item',
  },
  new_title: {
    id: 'grocery_list.item.new_title_label',
    defaultMessage: 'New Title',
  },
});

export interface IGroceryListItemFCProps {
  item: GroceryListItem;
  className?: string;
  onToggle:  (itemId: number, completed: boolean) => void;
  onUpdate:  (itemId: number, upd: GroceryListItemUpdate) => Promise<ValidationResult>;
  onDelete:  (itemId: number) => void;
}

const GroceryListItemFC: React.FC<IGroceryListItemFCProps> = ({
    item, className,
    onToggle, onUpdate, onDelete }: IGroceryListItemFCProps) => {
  const { formatMessage } = useIntl();

  const [showEdit, setShowEdit] = useState<boolean>(false);
  const submitRef = useRef<HTMLButtonElement>(null);

  const handleToggle = useCallback(() => {
    onToggle(item.id, !item.completed);
  }, [onToggle, item]);

  const handleEditClick = useCallback(() => {
    setShowEdit(true);
  }, []);
  const handleEditClose = useCallback((autoClose?: boolean) => {
    if (autoClose) return;
    setShowEdit(false);
  }, []);
  const handleEditSubmit = useCallback(() => {
    submitRef.current?.click();
  }, [submitRef.current]);
  const handleEditItem = useCallback(async (upd: GroceryListItemUpdate) => (
    onUpdate(item.id, upd)
  ), [onUpdate, item.id]);

  const handleDeleteItem = useCallback(() => {
    onDelete(item.id);
  }, [onDelete, item.id]);

  return (
    <div className={classNames('grocery-list-item', className)}>
      <Checkbox
          name  = {`${item.listId}-${item.id}-toggle`}
          label = {item.title}
          value = {item.completed}
          onChange = {handleToggle}
          className = 'grocery-list-item-cb grocery-list-item-margin'
          />
      <Dropdown className='options-dropdown print-hidden'>
        <Dropdown.Toggle variant='transparent'>
          <Icon icon='three-dots-vertical' variant='light' />
        </Dropdown.Toggle>

        <Dropdown.Menu id='grocery-header-option-menu-dropdown'>
          <Dropdown.Item onClick={handleEditClick}>{formatMessage(messages.edit_button)}</Dropdown.Item>
          <Dropdown.Item onClick={handleDeleteItem}>{formatMessage(messages.delete_button)}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {showEdit && (
        <Modal
            show
            title = {formatMessage(messages.edit_button)}
            onAccept = {handleEditSubmit}
            onClose = {handleEditClose}
            size = 'sm'>
          <EditItemForm item={item} onSubmit={handleEditItem} onSubmitSuccess={handleEditClose} submitRef={submitRef} />
        </Modal>
      )}
    </div>
  );
};

interface IEditItemFormProps {
  item: GroceryListItem;
  onSubmit: (upd: GroceryListItemUpdate) => Promise<ValidationResult>;
  onSubmitSuccess: () => void;
  submitRef: RefObject<HTMLButtonElement>;
}

interface IEditItemFormDataProps {
  oldTitle: string;
  newTitle: string;
}

const EditItemForm = forwardRef<HTMLFormElement, IEditItemFormProps>(({
    item, onSubmit, onSubmitSuccess, submitRef }: IEditItemFormProps, ref) => {
  const { formatMessage } = useIntl();

  const [initialValues] = useState<Partial<IEditItemFormDataProps>>({ oldTitle: item.title, newTitle: item.title });

  const handleSubmit = useCallback(async (form: IEditItemFormDataProps) => {
    if (item.title === form.newTitle) return null;
    const upd: GroceryListItemUpdate = {
      title: form.newTitle,
    };
    return onSubmit(upd);
  }, [item.title, onSubmit]);

  return (
    <ReForm
        initialValues = {initialValues}
        onSubmit = {handleSubmit}
        subscription = {{}}
        render = {({ form, handleSubmit: renderSubmit }) => (
          <Form onSubmit={renderSubmit} ref={ref}>
            <ReFormStatus onSubmitSuccess={onSubmitSuccess} />

            <InitialValuesResetter form={form} initialValues={initialValues} />
            <Row>
              <Col>
                <ReInput
                    name   = 'oldTitle'
                    label  = {formatMessage(messages.old_title)}
                    readOnly />
              </Col>
            </Row>
            <Row>
              <Col>
                <ReInput
                    name   = 'newTitle'
                    label  = {formatMessage(messages.new_title)}
                    required
                    autoFocus />
              </Col>
            </Row>
            <button type='submit' ref={submitRef} className='visibility-hidden'>Submit</button>
          </Form>
        )} />
  );
});

export default GroceryListItemFC;
