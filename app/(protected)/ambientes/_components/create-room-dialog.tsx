"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Dialog, DialogActions, DialogBody, DialogTitle } from "@/components/ui/dialog";
import { ErrorMessage, Field, FieldGroup, Fieldset, Label } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { createRoom } from "@/lib/api/rooms";
import { CreateRoomDto, createRoomSchema } from "@/lib/dtos";

export function CreateRoomDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const form = useForm<CreateRoomDto>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: CreateRoomDto) => createRoom(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      setIsOpen(false);
      form.reset();
    },
  });

  const handleCreateRoom = async (data: CreateRoomDto) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Button type="button" color="teal" onClick={() => setIsOpen(true)}>
        Adicionar ambiente
      </Button>

      <Dialog open={isOpen} onClose={setIsOpen}>
        <form onSubmit={form.handleSubmit(handleCreateRoom)}>
          <DialogTitle>Adicionar ambiente</DialogTitle>
          <DialogBody>
            <Fieldset>
              <FieldGroup>
                <Field>
                  <Label>Nome</Label>
                  <Input {...form.register("name")} invalid={Boolean(form.formState.errors.name)} />
                  {form.formState.errors.name && <ErrorMessage>{form.formState.errors.name.message}</ErrorMessage>}
                </Field>
              </FieldGroup>
            </Fieldset>
          </DialogBody>
          <DialogActions>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Salvar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
