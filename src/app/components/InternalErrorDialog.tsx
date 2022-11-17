import { lazy, Suspense, useEffect, useState } from 'react';

import { useSelector } from '../../common/store/redux';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import { CombinedStore } from '../Store';

const InternalErrorDialogFC = lazy(() => import('./InternalErrorDialogFC'));

const InternalErrorDialog = () => {
  const internalError = useSelector((state: CombinedStore) => state.internalError.item);

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(internalError != null);
  }, [internalError]);

  const handleClose = () => {
    setOpen(false);
  };

  if (!open || !internalError) return null;

  return (
    <Suspense fallback={<LoadingSpinner position='screen-center' />}>
      <InternalErrorDialogFC
          internalError = {internalError}
          onClose = {handleClose} />
    </Suspense>
  );
};

export default InternalErrorDialog;
