import { useState } from 'react';
import { EnterIcon } from '../../assets/icons/enter-icon';
import { useAppDispatch } from '../../hooks';
import { introspectApi } from '../../services/api.service';
import Button from '../Button/Button';
import { updateApiSchema, updateApiUrl, updateApiError } from '../../store/apiSlice';

export default function URLInput() {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');

  const getSchema = async () => {
    const data = await introspectApi(value);
    if (data instanceof Error) {
      dispatch(updateApiError(data.message));
    } else {
      dispatch(updateApiSchema(data));
      dispatch(updateApiUrl(value));
    }
  };
  return (
    <div className="url-component">
      <input
        placeholder="https://your-url"
        type="text"
        className="url-input"
        onChange={(e) => setValue(e.target.value)}
      />
      <Button className="input-button" onClick={getSchema} disabled={value.length === 0}>
        <EnterIcon />
      </Button>
    </div>
  );
}
