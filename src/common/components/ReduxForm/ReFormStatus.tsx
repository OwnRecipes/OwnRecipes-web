import { FormSpy } from 'react-final-form';
import FormStatus from '../FormStatus';

export interface IReFormStatusProps {
  onSubmitSuccess?: () => void;
}

const ReFormStatus: React.FC<IReFormStatusProps> = ({
  onSubmitSuccess }: IReFormStatusProps) => (
    <FormSpy subscription={{ dirty: true, submitting: true, submitSucceeded: true }}>
      {({ dirty, submitting, submitSucceeded }) => (
        <FormStatus dirty={dirty} submitting={submitting} submitSucceeded={submitSucceeded} onSubmitSuccess={onSubmitSuccess} />
      )}
    </FormSpy>
);

export default ReFormStatus;
