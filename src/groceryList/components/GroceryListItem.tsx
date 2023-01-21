import { forwardRef, RefObject, useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { Dropdown, Col, Form, Row } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';
import { Form as ReduxForm } from 'react-final-form';

import Icon from '../../common/components/Icon';
import Checkbox from '../../common/components/Input/Checkbox';
import Modal from '../../common/components/Modal';
import { ValidationResult } from '../../common/store/Validation';
import { GroceryListItem, GroceryListItemUpdate } from '../store/GroceryListItemTypes';
import ReFormStatus from '../../common/components/ReduxForm/ReFormStatus';
import InitialValuesResetter from '../../common/components/ReduxForm/ReInitialValuesResetter';
import ReInput from '../../common/components/ReduxForm/ReInput';

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
  const intl = useIntl();
  const { formatMessage } = intl;
  const messages = defineMessages({
    edit_button: {
      id: 'grocery_list.item.edit_button',
      defaultMessage: 'Edit',
    },
    delete_button: {
      id: 'grocery_list.item.delete_button',
      defaultMessage: 'Delete',
    },
  });

  const [showEdit, setShowEdit] = useState<boolean>(false);
  const submitRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    onToggle(item.id, !item.completed);
  };

  const handleEditClick = () => {
    setShowEdit(true);
  };
  const handleEditClose = (autoClose?: boolean) => {
    if (autoClose) return;
    setShowEdit(false);
  };
  const handleEditSubmit = () => {
    submitRef.current?.click();
  };
  const handleEditItem = useCallback(async (upd: GroceryListItemUpdate) => (
    onUpdate(item.id, upd)
  ), [item.id]);

  const handleDeleteItem = () => {
    onDelete(item.id);
  };

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
  const intl = useIntl();
  const { formatMessage } = intl;
  const messages = defineMessages({
    old_title: {
      id: 'grocery_list.item.old_title_label',
      defaultMessage: 'Item',
    },
    new_title: {
      id: 'grocery_list.item.new_title_label',
      defaultMessage: 'New Title',
    },
  });

  const [initialValues] = useState<Partial<IEditItemFormDataProps>>({ oldTitle: item.title, newTitle: item.title });

  const handleSubmit = async (form: IEditItemFormDataProps) => {
    if (item.title === form.newTitle) return null;
    const upd: GroceryListItemUpdate = {
      title: form.newTitle,
    };
    return onSubmit(upd);
  };

  // if (!show) return null;

  return (
    <ReduxForm
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
