import { FormControl, FormControlProps } from 'rsuite'

export const FieldControl: React.FC<FormControlProps> = (props) => (
  <FormControl errorPlacement="topStart" {...props}></FormControl>
  // <div>TODO</div>
)
