import { useForm } from "react-hook-form";
import { Button, Form, FormRow, Input, SpinnerMini } from "../../components";
import useSignUp from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { isLoading, signUp } = useSignUp();

  const { errors: errorsForm } = formState;

  function onSubmit(data) {
    const { fullName, email, password } = data;
    signUp({ fullName, email, password }, { onSettled: () => reset() });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Full name" error={errorsForm?.fullName}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "Please provide full name",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errorsForm?.email}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "Please provide email",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errorsForm?.password}>
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "Please provide password",
            minLength: {
              value: 8,
              message: "Password must be getter than equal 8 character",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errorsForm?.passwordConfirm}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "Please provide confirm password",
            validate: (value) =>
              value === getValues().password ||
              "ConfirmPass word has matching with password",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {" "}
          {isLoading ? <SpinnerMini /> : "Create new user"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
