import { useContext, useState } from 'react';
import { UpdateIcon, DoneIcon } from '../../assets/icons';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { introspectApi } from '../../services/api.service';
import Button from '../Button/Button';
import { updateApiUrl, updateApiError } from '../../store/apiSlice';
import { userContext } from '../../lib';
import { updateEditorResponse } from '../../store/jsonSlice';

export default function URLInput() {
  const dispatch = useAppDispatch();
  const errorMessages = useContext(userContext).localData?.apiResponse;
  const url = useAppSelector((state) => state.api.apiUrl);

  const [isFetching, setIsFetching] = useState(false);
  const [value, setValue] = useState('');

  const checkApi = async () => {
    setIsFetching(true);
    const data = await introspectApi(value);
    if (data instanceof Error) {
      dispatch(updateApiError(errorMessages && errorMessages.invalidUrl));
      setIsFetching(false);
    } else {
      dispatch(updateApiUrl(value));
      setIsFetching(false);
    }
  };

  const updateValue = (value: string) => {
    setValue(value);
    dispatch(updateApiUrl(''));
    dispatch(updateEditorResponse(''));
  };

  return (
    <div className="url-component">
      <input
        placeholder="https://your-url"
        type="text"
        className="url-input"
        onChange={(e) => updateValue(e.target.value)}
      />
      <Button className="input-button" onClick={checkApi} disabled={value.length === 0}>
        {url.length > 0 ? (
          <DoneIcon />
        ) : (
          <div className={isFetching ? 'rotating-element' : ''}>
            <UpdateIcon />
          </div>
        )}
      </Button>
    </div>
  );
}
