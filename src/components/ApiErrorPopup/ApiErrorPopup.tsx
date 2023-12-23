import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateApiError } from '../../store/apiSlice';
import { ErrorPopUp } from '../../components';

export default function ApiErrorPopup() {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.api.apiError);

  const closeError = () => {
    dispatch(updateApiError(null));
  };

  return error && <ErrorPopUp error={error} onClick={closeError} />;
}
