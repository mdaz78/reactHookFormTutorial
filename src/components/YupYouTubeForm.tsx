import { useForm } from "react-hook-form";
import * as Yup from "yup";

export type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const schema = Yup.object().shape({});

const YupYouTubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const { handleSubmit, formState } = form;
  const { errors } = formState;

  return (
    <div>
      <h1>Yup YouTube Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...form.register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
          />
          <p>{errors.username?.message}</p>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...form.register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
            })}
          />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...form.register("channel", {
              required: {
                value: true,
                message: "Channel is required",
              },
            })}
          />
          <p>{errors?.channel?.message}</p>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default YupYouTubeForm;
