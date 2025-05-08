"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button, SubmitButton } from "@/components/ui/button";
import { ErrorMessage, Field, FieldGroup, Fieldset, Label } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { CreateRoomDto, createRoomSchema } from "@/lib/dtos";
import { useRooms } from "@/lib/hooks/rooms";

export function CreateRoomDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const defaultValues = useMemo(
    () => ({
      name: "",
    }),
    [],
  );

  const { createRoomMutation } = useRooms();
  const form = useForm<CreateRoomDto>({
    resolver: zodResolver(createRoomSchema),
    defaultValues,
  });
  const { errors, isSubmitting } = form.formState;

  useEffect(() => {
    if (isOpen) {
      form.reset(defaultValues);
    }
  }, [isOpen, form, defaultValues]);

  const handleCreate = async (data: CreateRoomDto) => {
    await createRoomMutation.mutateAsync(data);
    setIsOpen(false);
  };

  return (
    <ResponsiveDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Adicionar ambiente"
      trigger={
        <Button type="button" color="teal">
          Adicionar ambiente
        </Button>
      }
      footer={<SubmitButton isLoading={isSubmitting}>Salvar</SubmitButton>}
      asForm
      onSubmit={form.handleSubmit(handleCreate)}
    >
      <Fieldset>
        <FieldGroup>
          <Field>
            <Label>Nome</Label>
            <Input {...form.register("name")} invalid={Boolean(errors.name)} />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </Field>
        </FieldGroup>
      </Fieldset>
    </ResponsiveDialog>
  );
}
