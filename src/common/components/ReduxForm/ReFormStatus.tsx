import { FormSpy } from 'react-final-form';
import { ValidationError } from '../../store/Validation';
import FormStatus from '../FormStatus';

export interface IReFormStatusProps {
  onSubmitSuccess?: () => void;
}

const ReFormStatus: React.FC<IReFormStatusProps> = ({
  onSubmitSuccess }: IReFormStatusProps) => (
    <FormSpy subscription={{ dirty: true, submitting: true, submitErrors: true }}>
      {({ dirty, submitting, submitErrors }) => (
        <FormStatus
            dirty = {dirty}
            submitting = {submitting}
            errors = {(submitErrors) as Record<string, ValidationError>}
            onSubmitSuccess = {onSubmitSuccess} />
      )}
    </FormSpy>
);

export default ReFormStatus;
