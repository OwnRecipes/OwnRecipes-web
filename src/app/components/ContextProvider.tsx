/* eslint-disable react/jsx-indent */
import AuthContextProvider from '../../account/context/AuthContextProvider';
import DynamicHeightContextProvider from '../../common/context/DynamicHeightContextProvider';
import MeasurementContextProvider from '../../common/context/MeasurementContextProvider';
import IntlProvider from './IntlProvider';

interface IContextProviderProps {
  children: React.ReactNode;
}

const ContextProvider: React.FC<IContextProviderProps> = ({ children }: IContextProviderProps) => (
  <IntlProvider>
    <AuthContextProvider>
    <MeasurementContextProvider>
    <DynamicHeightContextProvider>
      {children}
    </DynamicHeightContextProvider>
    </MeasurementContextProvider>
    </AuthContextProvider>
  </IntlProvider>
);

export default ContextProvider;
