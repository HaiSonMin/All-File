import useUser from "./useUser";
import { useState } from "react";
import {
  Button,
  FileInput,
  Form,
  FormRow,
  Input,
  SpinnerMini,
} from "../../components";
import useUpdateUser from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  const { isUpdating, updateUser } = useUpdateUser();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    if (!fullName) return;
    updateUser({ fullName, avatar });
  }

  function handlerCancel() {
    setFullName("");
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isUpdating}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary" onClick={handlerCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isUpdating}>
          {isUpdating ? <SpinnerMini /> : "Update account"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
