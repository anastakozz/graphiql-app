import { useContext, useState } from 'react';
import EnterIcon from '../../assets/icons/enter-icon';
import { useAppDispatch } from '../../hooks';
import { introspectApi } from '../../services/api.service';
import Button from '../Button/Button';
import { updateApiUrl, updateApiError } from '../../store/apiSlice';
import { userContext } from '../../lib';
import { updateEditorResponse } from '../../store/jsonSlice';

export default function URLInput() {
  const errorMessages = useContext(userContext).localData?.apiResponse;
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');

  const checkApi = async () => {
    const data = await introspectApi(value);
    if (data instanceof Error) {
      dispatch(updateApiError(errorMessages && errorMessages.invalidUrl));
    } else {
      dispatch(updateApiUrl(value));
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
        <EnterIcon />
      </Button>
    </div>
  );
}
