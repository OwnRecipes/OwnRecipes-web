/* eslint-disable camelcase */
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';
import React, { useState } from 'react';

import '../css/recipe_header.css';

import { getResourcePath, optionallyFormatMessage } from '../../common/utility';
import Icon from '../../common/components/Icon';
import Chip from '../../common/components/Chip';
import Ratings from '../../rating/components/Ratings';
import P from '../../common/components/P';
import { Recipe } from '../store/RecipeTypes';
import Modal from '../../common/components/Modal';
import WidthHeightRatio from '../../common/components/WidthHeightRatio';
import Image from '../../common/components/Image';
import Tooltip from '../../common/components/Tooltip';
import ImageViewer from '../../common/components/ImageViewer';
import CookingModeButton from './CookingModeButton';

export interface IRecipeHeaderProps {
  recipe:       Recipe | undefined;
  showEditLink: boolean;

  deleteRecipe: () => void;
  // onAddToMenuClick: () => void;
}

const RecipeHeader: React.FC<IRecipeHeaderProps> = ({
    recipe, showEditLink, deleteRecipe }: IRecipeHeaderProps) => {
  const intl = useIntl();
  const { formatMessage } = intl;

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
      defaultMessage: 'minutes',
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

  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const handleDeleteClick  = () => { setShowDeleteConfirm(true); };
  const handleDeleteAccept = () => { deleteRecipe(); };
  const handleDeleteClose  = () => { setShowDeleteConfirm(false); };

  const editLink = showEditLink ? (
    <Tooltip id='edit tooltip' tooltip={formatMessage(messages.edit_tooltip)}>
      <Link to={getResourcePath(`/recipe/edit/${recipe?.slug}`)}>
        <Button variant='outline-primary' size='sm'>
          <i className='bi bi-pencil-fill' />
        </Button>
      </Link>
    </Tooltip>
  ) : null;

  const deleteLink = showEditLink ? (
    <Tooltip id='trash tooltip' tooltip={formatMessage(messages.delete_tooltip)}>
      <Button variant='outline-danger' size='sm' onClick={handleDeleteClick}>
        <Icon icon='trash' />
      </Button>
    </Tooltip>
  ) : null;

  let hostname = '';
  if (recipe?.source && recipe.source.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g)) {
    // Get Host name of a URL
    const a = document.createElement('a');
    a.href = recipe.source;
    hostname = a.hostname;
  }

  const printButton = (
    <Tooltip id='print tooltip' tooltip={formatMessage(messages.print_tooltip)}>
      <Button variant='outline-primary' aria-label='Print receipt' onClick={window.print}>
        <Icon icon='printer' />
      </Button>
    </Tooltip>
  );

  const optionButtons = (
    <div className='options print-hidden'>
      <div className='options-wrapper'>
        {showEditLink && (
          <>
            {editLink}
            {deleteLink}
          </>
        )}
        {/*
          <Button variant='outline-primary' aria-label='Add receipt to menu' onClick={onAddToMenuClick}>
            <Icon icon='calendar' />
          </Button>
        */}
        <CookingModeButton />
        {printButton}
      </div>
    </div>
  );

  const chips = recipe != null ? (
    <>
      <div className='recipe-header-chips'>
        {recipe.prepTime != null && recipe.prepTime > 0 && (
          <Chip variant='secondary'>
            <Icon icon='clock' />
            {`${formatMessage(messages.prep_time)}: `}
            {recipe.prepTime}
            {` ${formatMessage(messages.minutes)}`}
          </Chip>
        )}
        {recipe.cookTime != null && recipe.cookTime > 0 && (
          <Chip variant='secondary'>
            <Icon icon='clock' />
            {`${formatMessage(messages.cooking_time)}: `}
            {recipe.cookTime}
            {` ${formatMessage(messages.minutes)}`}
          </Chip>
        )}
        {recipe.course != null && recipe.course.title != null && recipe.course.title.length > 0 && (
          <Chip variant='secondary'>
            <Icon icon='bar-chart' />
            {optionallyFormatMessage(intl, 'course.', recipe.course.title)}
          </Chip>
        )}
        {recipe.cuisine != null && recipe.cuisine.title != null && recipe.cuisine.title.length > 0 && (
          <Chip variant='secondary'>
            <Icon icon='globe' variant='light' />
            {optionallyFormatMessage(intl, 'cuisine.', recipe.cuisine.title)}
          </Chip>
        )}
      </div>
      <div className='recipe-header-chips'>
        <Chip variant='secondary'>
          <Icon icon='calendar' />
          {recipe?.updateDate && new Date(recipe.updateDate).toLocaleDateString(intl.locale)}
        </Chip>
        <Chip variant='secondary'>
          <Icon icon='person' />
          {recipe?.username ?? ''}
        </Chip>
      </div>
      {recipe.tags != null && recipe.tags.length > 0 && (
        <div className='recipe-header-chips'>
          {recipe.tags.map(t => (
            <Chip key={String(t.title)} variant='secondary'>
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
            <Ratings stars={recipe?.rating ?? 0} />
            {chips}
            {recipe?.source && (
              <div>
                {`${formatMessage(messages.source)}: `}
                {hostname.length > 0 && <a href={recipe.source} target='_blank' rel='noreferrer'>{hostname}</a>}
                {hostname.length === 0 && recipe.source}
              </div>
            )}
          </Col>
        </Row>
      </article>

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
