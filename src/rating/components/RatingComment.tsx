import { useCallback, useState } from 'react';
import { useLocation } from 'react-router';
import classNames from 'classnames';

import { Rating, RatingUpdate } from '../store/types';
import PageScroller from '../../common/components/PageScroller';
import RatingForm from './RatingForm';
import { ValidationResult } from '../../common/store/Validation';
import RatingView, { RatingToolbar } from './RatingView';
import { isDemoMode } from '../../common/utility';

export interface IRatingCommentProps {
  rating:     Rating;
  onEdit?:    (upd: RatingUpdate) => Promise<ValidationResult>;
  onDelete?:  (ratingId: number) => Promise<ValidationResult>;
}

const RatingComment: React.FC<IRatingCommentProps> = ({
    rating, onEdit, onDelete }: IRatingCommentProps) => {
  const { hash } = useLocation();
  const hashId = (hash ?? '').replace('#', '');

  const [editMode, setEditMode] = useState<boolean>(false);
  const handleEditModeReset = useCallback(() => { setEditMode(false); }, []);

  const handleEditClick    = useCallback(() => { setEditMode(true); }, []);
  const handleDeleteClick  = useCallback(() => onDelete?.(rating.id), [rating.id]);

  const ratingContainerId = `rating-${rating.id}`;

  return (
    <div id={ratingContainerId} className={classNames('rating-comment', { 'perma-link-active': ratingContainerId === hashId })}>
      <PageScroller uriFragmentId={ratingContainerId} />
      {!editMode && (
        <RatingView
            rating = {rating}
            />
      )}
      {editMode && (
        <RatingForm
            rating = {rating}
            editRating = {onEdit}
            onSubmitSuccess = {handleEditModeReset}
            onCancel = {handleEditModeReset}
            />
      )}
      {!editMode && !isDemoMode() && (
        <RatingToolbar
            rating = {rating}
            onEdit = {onEdit ? handleEditClick : undefined}
            onDelete = {onDelete ? handleDeleteClick : undefined}
            />
      )}
    </div>
  );
};

export default RatingComment;
