import CircularProgress from './CircularProgress';

interface ILoadingProps {
  message?: string;
}

const Loading = ({ message }: ILoadingProps) => (
  <div className='spinner'>
    {message && <h3 className='no-results'>{ message }</h3>}
    <CircularProgress />
  </div>
);

export default Loading;
