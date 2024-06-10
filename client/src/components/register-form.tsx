"use client";
import { login } from "@/app/(auth)/_action";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import ValidationInput from "@/components/validation-input";
import safeFetch from "@/lib/safeFetch";
import { RegisterReturnSchema, userAuthSchema } from "@/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userAuthSchema),
  });
  return (
    <form
      className="space-y-5 p-5"
      onSubmit={handleSubmit(async (data) => {
        const { data: d, error } = await safeFetch(
          RegisterReturnSchema,
          "/auth/register",
          {
            method: "POST",
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (error) {
          setError("root", {
            message: "Something went wrong!",
          });
          return;
        }
        reset();
        await login({ identifier: data.email, password: data.password });
      })}
    >
      <ValidationInput
        isError={!!errors?.email?.message}
        errorMessage={errors?.email?.message as string}
        type={"email"}
        {...register("email")}
        placeholder={"Enter email or username"}
        className="h-12"
      />
      <ValidationInput
        isError={!!errors?.password?.message}
        errorMessage={errors?.password?.message as string}
        type={"password"}
        {...register("password")}
        placeholder={"Enter password"}
        className="h-12"
      />
      {errors.root && (
        <p className="text-sm text-red-500">{errors.root.message}</p>
      )}
      <SubmitButton
        className="w-full"
        name={"Register"}
        isLoading={isSubmitting}
      />
      <hr />
      <Button
        type={"submit"}
        variant={"outline"}
        asChild
        className="w-full relative"
      >
        <Link href={"/login"} className="absolute inset-0">
          Login
        </Link>
      </Button>
    </form>
  );
};

export default RegisterForm;
