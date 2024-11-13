import { useCallback, useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';

import '../css/recipe_header.css';

import { Recipe } from '../store/RecipeTypes';
import { getRoutePath, isDemoMode, optionallyFormatMessage } from '../../common/utility';
import Icon from '../../common/components/Icon';
import Chip from '../../common/components/Chip';
import Ratings from '../../rating/components/Ratings';
import P from '../../common/components/P';
import Modal from '../../common/components/Modal';
import WidthHeightRatio from '../../common/components/WidthHeightRatio';
import Image from '../../common/components/Image';
import ImageViewer from '../../common/components/ImageViewer';
import Button from '../../common/components/Button';
import NavButton from '../../common/components/NavButton';
import { Toolbar } from '../../common/components/Toolbar';
import CookingModeButton from './CookingModeButton';
import Tooltip from '../../common/components/Tooltip';

const editorMessages = defineMessages({
  edited_by: {
    id: 'recipe.edited_by',
    description: 'The recipe was edited by ...',
    defaultMessage: 'Edited by',
  },
});

interface IRecipeEditorProps {
  recipe: Recipe;
}

export const RecipeEditor: React.FC<IRecipeEditorProps> = ({ recipe }: IRecipeEditorProps) => {
  const { formatMessage, locale } = useIntl();

  if (recipe.update_date && new Date(recipe.update_date).getTime() > 0 && recipe.update_username) {
    const editorS = `${formatMessage(editorMessages.edited_by)}: ${recipe.update_username}`;
    const editDateS = new Date(recipe.update_date).toLocaleString(locale);
    const tooltipJsx = (
      <div className='d-flex-column'>
        <div>{editorS}</div>
        <div>{editDateS}</div>
      </div>
    );
    return (
      <Tooltip id={`${recipe.id}-editor-tooltip`} tooltip={tooltipJsx}>
        <Icon icon='pencil' size='1x' style={{ marginLeft: '5px', marginRight: 0 }} ariaLabel={`${formatMessage(editorMessages.edited_by)}: ${recipe.update_username}. ${editDateS}`} />
      </Tooltip>
    );
  } else {
    return null;
  }
};

export const RecipeTimestamp: React.FC<IRecipeEditorProps> = ({ recipe }: IRecipeEditorProps) => {
  const { locale } = useIntl();
  if (recipe.update_date && new Date(recipe.update_date).getTime() > 0 && recipe.update_username === recipe.pub_username) {
    return (
      <>
        <Icon icon='calendar' />
        {new Date(recipe.update_date).toLocaleDateString(locale)}
      </>
    );
  } else {
    return (
      <>
        <Icon icon='calendar' />
        {new Date(recipe.pub_date).toLocaleDateString(locale)}
      </>
    );
  }
};

const messages = defineMessages({
  edit_tooltip: {
    id: 'recipe.edit_tooltip',
    description: 'Tooltip displayed when hovering the edit recipe icon button',
    defaultMessage: 'Edit this recipe',
  },
  delete_tooltip: {
    id: 'recipe.delete_tooltip',
    description: 'Tooltip displayed when hovering the delete recipe icon button',
    defaultMessage: 'Delete this recipe',
  },
  print_tooltip: {
    id: 'recipe.print_tooltip',
    description: 'Tooltip displayed when hovering the print icon button',
    defaultMessage: 'Print this recipe',
  },
  add_to_menu_tooltip: {
    id: 'recipe.add_to_menu_tooltip',
    description: 'Tooltip displayed when hovering the add-recipe-to-menu button',
    defaultMessage: 'Add recipe to menu',
  },
  recipe_comments: {
    id: 'recipe.comments',
    description: 'Button to comments',
    defaultMessage: 'Comments',
  },
  prep_time: {
    id: 'recipe.prep_time',
    description: 'Preparation time',
    defaultMessage: 'Prep time',
  },
  cooking_time: {
    id: 'recipe.cooking_time',
    description: 'Cooking time',
    defaultMessage: 'Cooking time',
  },
  minutes: {
    id: 'recipe.minutes',
    description: 'minutes',
    defaultMessage: '{count, plural, one {# minute} other {# minutes}}',
  },
  source: {
    id: 'recipe.source',
    description: 'Source of the recipe',
    defaultMessage: 'Source',
  },
  created_by: {
    id: 'recipe.created_by',
    description: 'Created by',
    defaultMessage: 'Created by',
  },
  last_updated: {
    id: 'recipe.last_updated',
    description: 'Last Updated',
    defaultMessage: 'Last Updated',
  },
  confirm_delete_title: {
    id: 'recipe.confirm_delete_title',
    description: 'Confirm deletion - dialog title',
    defaultMessage: 'Confirm deletion',
  },
  confirm_delete_message: {
    id: 'recipe.confirm_delete',
    description: 'Are you sure you want to delete this recipe?',
    defaultMessage: 'Are you sure you want to delete this recipe?',
  },
  confirm_delete_accept: {
    id: 'recipe.confirm_delete_accept',
    description: 'Confirm deletion - Accept button title',
    defaultMessage: 'Delete',
  },
});

export interface IRecipeHeaderProps {
  recipe:   Recipe | undefined;
  editable: boolean;

  onEditRecipe: () => void;
  deleteRecipe: () => void;
  onAddToMenuClick: () => void;
}

const RecipeHeader: React.FC<IRecipeHeaderProps> = ({
    recipe, editable, onEditRecipe, deleteRecipe, onAddToMenuClick }: IRecipeHeaderProps) => {
  const intl = useIntl();
  const { formatMessage } = intl;

  const handleEditClick    = useCallback(() => { onEditRecipe(); }, [onEditRecipe]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const handleDeleteClick  = useCallback(() => { setShowDeleteConfirm(true); }, []);
  const handleDeleteAccept = useCallback(() => { deleteRecipe(); }, [deleteRecipe]);
  const handleDeleteClose  = useCallback(() => { setShowDeleteConfirm(false); }, []);

  const editLink = editable ? (
    <NavButton
        id='edit-recipe-button'
        variant = 'outline-primary'
        tooltip={formatMessage(messages.edit_tooltip)}
        to={getRoutePath(`/recipe/edit/${recipe?.slug}`)}
        onClick={handleEditClick}
        size='sm'>
      <Icon icon='pencil' />
    </NavButton>
  ) : null;

  const deleteLink = editable ? (
    <Button id='trash-recipe-button' variant='outline-danger' size='sm' onClick={handleDeleteClick} tooltip={formatMessage(messages.delete_tooltip)}>
      <Icon icon='trash' />
    </Button>
  ) : null;

  const source = useMemo(() => {
    if (recipe?.source) {
      let hostname = '';
      if (recipe?.source && recipe.source.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g)) {
        // Get Host name of a URL
        const a = document.createElement('a');
        a.href = recipe.source;
        hostname = a.hostname;
      }

      return (
        <div>
          {`${formatMessage(messages.source)}: `}
          {hostname.length > 0 && (
            <>
              <a href={recipe.source} target='_blank' rel='noreferrer' className='print-hidden'>{hostname}</a>
              <a href={recipe.source} target='_blank' rel='noreferrer' className='print-only'>{recipe.source}</a>
            </>
          )}
          {hostname.length === 0 && recipe.source}
        </div>
      );
    } else {
      return null;
    }
  }, [recipe?.source, intl.locale]);

  const printButton = (
    <Button id='print-recipe-button' variant='outline-primary' onClick={window.print} tooltip={formatMessage(messages.print_tooltip)}>
      <Icon icon='printer' />
    </Button>
  );

  const addToMenuButton = (
    <Button id='add-to-menu' variant='outline-primary'tooltip={formatMessage(messages.add_to_menu_tooltip)} onClick={onAddToMenuClick}>
      <Icon icon='calendar' />
    </Button>
  );

  const optionButtons = (
    <div className='options print-hidden'>
      <Toolbar position='end'>
        {editable && (
          <>
            {editLink}
            {deleteLink}
          </>
        )}
        {!isDemoMode() && addToMenuButton}
        <CookingModeButton />
        {printButton}
      </Toolbar>
    </div>
  );

  const chips = recipe != null ? (
    <>
      <div className='recipe-header-chips'>
        {recipe.prepTime != null && recipe.prepTime > 0 && (
          <Chip color='secondary'>
            <Icon icon='clock' />
            {`${formatMessage(messages.prep_time)}: `}
            {` ${formatMessage(messages.minutes, { count: recipe.prepTime })}`}
          </Chip>
        )}
        {recipe.cookTime != null && recipe.cookTime > 0 && (
          <Chip color='secondary'>
            <Icon icon='clock' />
            {`${formatMessage(messages.cooking_time)}: `}
            {` ${formatMessage(messages.minutes, { count: recipe.cookTime })}`}
          </Chip>
        )}
        {recipe.course != null && recipe.course.title != null && recipe.course.title.length > 0 && (
          <Chip color='secondary'>
            <Icon icon='bar-chart' />
            {optionallyFormatMessage(intl, 'course.', recipe.course.title)}
          </Chip>
        )}
        {recipe.cuisine != null && recipe.cuisine.title != null && recipe.cuisine.title.length > 0 && (
          <Chip color='secondary'>
            <Icon icon='globe' variant='light' />
            {optionallyFormatMessage(intl, 'cuisine.', recipe.cuisine.title)}
          </Chip>
        )}
      </div>
      <div className='recipe-header-chips'>
        <Chip color='secondary'>
          <RecipeTimestamp recipe={recipe} />
          <RecipeEditor recipe={recipe} />
        </Chip>
        <Chip color='secondary'>
          <Icon icon='person' />
          {recipe?.pub_username ?? ''}
        </Chip>
      </div>
      {recipe.tags != null && recipe.tags.length > 0 && (
        <div className='recipe-header-chips'>
          {recipe.tags.map(t => (
            <Chip key={String(t.title)} color='secondary'>
              {optionallyFormatMessage(intl, 'tag.', t.title)}
            </Chip>
          ))}
        </div>
      )}
    </>
  ) : null;

  return (
    <>
      <article className='recipe-header'>
        <h1 className='d-block d-xl-none'>{recipe?.title}</h1>

        <Row className='flex-row-reverse justify-content-center'>
          {recipe != null && recipe.photo && (
            <>
              <Col xl={6} lg={12} className='img-wrapper print-hidden'>
                <WidthHeightRatio height={66.67} width={100}>
                  <ImageViewer>
                    <Image
                        src = {recipe.photo}
                        alt = ''
                        className='img-responsive print-hidden' />
                  </ImageViewer>
                </WidthHeightRatio>
                {optionButtons}
              </Col>
              <Col sm={7} xs={12} className='col-sm-push-5 print-only'>
                <WidthHeightRatio height={66.67} width={100} className='print-only print-image'>
                  <ImageViewer>
                    <Image
                        src = {recipe.photoThumbnail ?? recipe.photo}
                        alt = '' />
                  </ImageViewer>
                </WidthHeightRatio>
              </Col>
            </>
          )}
          {recipe != null && !recipe.photo && (
            optionButtons
          )}

          <Col xl={6} lg={12} className='info-wrapper'>
            <h1 className='d-none d-xl-block'>{recipe?.title}</h1>
            <P>{recipe?.info}</P>
            <Ratings stars={recipe?.rating ?? 0} showCount={false} />
            {chips}
            {source}

          </Col>
        </Row>
      </article>
      <hr className='recipe-header-hr' />

      <Modal
          show        = {showDeleteConfirm}
          title       = {formatMessage(messages.confirm_delete_title)}
          acceptTitle = {formatMessage(messages.confirm_delete_accept)}
          acceptButtonProps = {{ variant: 'danger' }}
          onAccept    = {handleDeleteAccept}
          onClose     = {handleDeleteClose}
          className   = 'delete'>
        {formatMessage(messages.confirm_delete_message)}
      </Modal>
    </>
  );
};

export default RecipeHeader;
