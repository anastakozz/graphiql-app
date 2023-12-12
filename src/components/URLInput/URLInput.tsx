import { EnterIcon } from '../../assets/icons/enter-icon';
import Button from '../Button/Button';

export default function URLInput() {
  return (
    <div className="url-component">
      <input placeholder="https://your-url" type="text" className="url-input" />
      <Button className="input-button">
        <EnterIcon />
      </Button>
    </div>
  );
}
