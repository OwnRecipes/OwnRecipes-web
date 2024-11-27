import CircularProgress from './CircularProgress';

interface ILoadingProps {
  message?: string;
}

const Loading = ({ message }: ILoadingProps) => (
  <div className='spinner'>
    {message && <span className='h3 no-results'>{ message }</span>}
    <CircularProgress />
  </div>
);

export default Loading;
