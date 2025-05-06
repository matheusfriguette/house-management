"use client";

import { AuthLayout } from "@/components/ui/auth-layout";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, Fieldset, Label } from "@/components/ui/fieldset";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/api/auth";
import { LoginDto, loginSchema } from "@/lib/dtos";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Page() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function handleLogin(data: LoginDto) {
    const { token } = await login(data);

    localStorage.setItem("token", token);
    router.push("/ambientes");
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(handleLogin)} className="grid w-full max-w-sm grid-cols-1 gap-8">
        <Heading>Faça login em sua conta</Heading>

        <Fieldset>
          <FieldGroup>
            <Field>
              <Label>Usuário</Label>
              <Input type="text" {...register("username")} />
            </Field>

            <Field>
              <Label>Senha</Label>
              <Input type="password" {...register("password")} />
            </Field>
          </FieldGroup>
        </Fieldset>

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </AuthLayout>
  );
}
