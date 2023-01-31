import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import SaveIcon from "./SaveIcon";
import EditIcon from "./EditIcon";
import CloseIcon from "./CloseIcon";
import './TextField.css'
import { ScreenReaderText } from "./ScreenReaderText";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: String;
    onSave?: (value: any) => Promise<void>
}

export function TextField ({ id, label, onSave, ...props }: TextFieldProps) {
  const [editMode, setEditMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null);
  const editBtnRef = useRef<HTMLButtonElement>(null);

  const closeEditMode = () => {
    setEditMode(false)
    editBtnRef?.current?.focus();
  }

  const openEditMode = () => {
      setEditMode(true)
  }

  const onEditHandler = async () => {
    const currentValue = inputRef?.current?.value;

    const onSavePromise = await onSave?.(currentValue);

    closeEditMode();

    return onSavePromise;
  }

  useEffect(() => {
    if (!editMode) {
      return;
    };

    inputRef?.current?.focus()
  }, [editMode])

  const labelId = `label-${id}`;
  const cancelScreenReaderId = `cancel-screen-reader-text-${id}`;
  const editScreenReaderId = `edit-screen-reader-text-${id}`;
  
  return (
    <div className="textfield--wrapper">
        <div className="textfield--header">
            <label htmlFor={id} id={labelId}>{label}</label>
            <div className="textfield--header-actions">
            {editMode && (
                <button 
                  onClick={closeEditMode} 
                  aria-label="Cancel" 
                  title="Cancel" 
                  className="textfield--header-action"
                  aria-controls={id}
                  aria-describedby={`${cancelScreenReaderId} ${labelId}`}
                >
                  <CloseIcon aria-hidden="true" />
                  <ScreenReaderText id={cancelScreenReaderId}>
                    Cancel editing
                  </ScreenReaderText>
                </button>
            )}
                <button 
                  ref={editBtnRef} 
                  onClick={editMode ? onEditHandler : openEditMode}
                  aria-label={editMode ? 'Save' : 'Edit'}
                  title={editMode ? 'Save' : 'Edit'}
                  className="textfield--header-action"
                  aria-describedby={`${editScreenReaderId} ${labelId}`}
                  aria-controls={id}
                >                  
                  {editMode ? <SaveIcon aria-hidden="true" /> : <EditIcon aria-hidden="true" />}
                  <ScreenReaderText id={cancelScreenReaderId}>
                    {editMode ? 'Save changes' : 'Edit'}
                  </ScreenReaderText>
                </button>
            </div>
        </div>
        <input id={id} {...props} readOnly={!editMode} ref={inputRef} className="textfield--input"/>
    </div>
  )
}