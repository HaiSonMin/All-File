/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Input,
  Form,
  Button,
  FileInput,
  Textarea,
  FormRow,
} from "../../components";
import { useForm } from "react-hook-form";
import useCreateCabin from "./useCreateCabin";
import useUpdateCabin from "./useUpdateCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors: errorsForm } = formState; // Get All Error
  console.log("Re-render CreateCabin Form");

  // Create Cabin
  const { isCreating, createCabin } = useCreateCabin();

  // Update Cabin
  const { isUpdating, updateCabin } = useUpdateCabin();

  const isWorking = isCreating || isUpdating;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (!editId)
      return createCabin(
        { ...data, image },
        {
          onSuccess: (newCabin) => {
            console.log("newCabin::", newCabin);
            onCloseModal?.();
            reset(); // Reset All value of inputs
          },
        }
      );
    updateCabin(
      { newCabin: { ...data, image: image }, id: editId },
      {
        onSuccess: (cabinUpdate) => {
          console.log("cabinUpdated::::", cabinUpdate);
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  function onError(errors) {
    console.error({ ...errors });
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal && "modal"}
    >
      <FormRow label={"Cabin name"} error={errorsForm.name}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Please provide Cabin name" })}
        />
      </FormRow>

      <FormRow label={"Capacity"} error={errorsForm.maxCapacity}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Please provide capacity",
            min: {
              value: 1,
              message: "Please enter value getter than equal 1",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Price"} error={errorsForm.regularPrice}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Please provide regular price ",
            min: {
              value: 10,
              message: "Please enter value getter than equal 10",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Discount"} error={errorsForm.discount}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            validate: (value) =>
              +value < +getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow label={"Description"} error={errorsForm.description}>
        <Textarea type="number" id="description" {...register("description")} />
      </FormRow>

      <FormRow label={"Cabin image"}>
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={onCloseModal}>
          Cancel
        </Button>
        {!isEditSession ? (
          <Button disabled={isWorking}>
            {isWorking ? "Creating ...." : "Create cabin"}
          </Button>
        ) : (
          <Button disabled={isWorking}>
            {isWorking ? "Editing ...." : "Edit cabin"}
          </Button>
        )}
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
