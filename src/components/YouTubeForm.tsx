import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

type FormValues = {
  username: string;
  email: string;
  channel: string;
  socials: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
    isPrimary: boolean;
  }[];
  age: number;
  dob: Date;
};

const YouTubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      socials: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "", isPrimary: false }],
      age: 0,
      dob: new Date(),
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log({ data });
  };

  const handleSetValue = () => {
    setValue(
      "socials",
      {
        twitter: "twitter",
        facebook: "facebook",
      },
      {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      }
    );
  };

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
  } = form;
  const { errors, touchedFields, dirtyFields, isDirty } = formState;

  console.log({ touchedFields, dirtyFields, isDirty });

  // watch accepts an array as well it will watch all the fields in the array, you can also not pass anything to watch to watch all fields
  const watchUserName = watch("username");

  useEffect(() => {
    const subscription = watch((value) => {
      console.log({ value });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  return (
    <div>
      <h1>YouTube Form</h1>
      <h2>{watchUserName}</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Name</label>
          <input
            type="text"
            id="username"
            {...register("username", { required: "Username is required" })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a different email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", { required: "Channel is required" })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("socials.twitter", {
              required: "Twitter handle is required",
            })}
          />
          <p className="error">{errors.socials?.twitter?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="facebook">facebook</label>
          <input
            type="text"
            id="facebook"
            {...register("socials.facebook", {
              required: "Facebook handle is required",
            })}
          />
          <p className="error">{errors.socials?.facebook?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="primary-phone">Primary Phone Number</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0", {
              required: "Primary phone number is required",
            })}
          />
          <p className="error">{errors.phoneNumbers?.[0]?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="secondary-phone">SecondaryPhone Number</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1", {
              required: "Secondary phone number is required",
            })}
          />
          <p className="error">{errors.phoneNumbers?.[1]?.message}</p>
        </div>

        <div>
          <label htmlFor="">List of phone numbers</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div className="form-control" key={field.id}>
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number`)}
                  />
                  <div style={{ display: "flex" }}>
                    <input
                      type="checkbox"
                      {...register(`phNumbers.${index}.isPrimary`)}
                      id={`phNumbers.${index}.isPrimary`}
                    />
                    <label htmlFor={`phNumbers.${index}.isPrimary`}>
                      Primary
                    </label>
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
            <button
              type="button"
              onClick={() => append({ number: "", isPrimary: false })}
            >
              Add phone Number
            </button>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: "Age is required",
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: "Dob is required",
            })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>

        <button type="submit">Submit</button>
        <button type="button" onClick={() => console.log(getValues())}>
          Get Values
        </button>
        <button type="button" onClick={handleSetValue}>
          Set Value
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
