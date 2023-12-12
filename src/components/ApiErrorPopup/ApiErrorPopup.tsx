import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateApiError } from '../../store/apiSlice';
import { Button } from '../../components';

export default function ApiErrorPopup() {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.api.apiError);

  const closeError = () => {
    dispatch(updateApiError(null));
  };

  return (
    error && (
      <>
        <div className="popup-shade" onClick={closeError}></div>
        <div className="popup">
          <Button onClick={closeError} className="error-button">
            x
          </Button>
          <div>{error}</div>
        </div>
      </>
    )
  );
}
