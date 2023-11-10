import { useForm } from "react-hook-form";
import useUpdateUser from "./useUpdateUser";
import { Button, Form, FormRow, Input, SpinnerMini } from "../../components";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();

  const { errors: errorsForm } = formState;

  const { isUpdating, updateUser } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Password (min 8 characters)" error={errorsForm?.password}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Confirm password" error={errorsForm?.passwordConfirm}>
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>
          {isUpdating ? <SpinnerMini /> : "Update password"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
