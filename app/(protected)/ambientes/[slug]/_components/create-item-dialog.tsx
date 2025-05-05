"use client";

import * as Headless from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Dialog, DialogActions, DialogBody, DialogTitle } from "@/components/ui/dialog";
import { ErrorMessage, Field, FieldGroup, Fieldset, Label } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { Radio } from "@/components/ui/radio";
import { createItem } from "@/lib/api/items";
import { CreateItemDto, createItemSchema } from "@/lib/dtos";
import { Priority, Room } from "@/lib/types";
import { getPriorityBadge } from "@/lib/utils";

export function CreateItemDialog({ roomId, roomSlug }: { roomId: string; roomSlug: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const {
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateItemDto>({
    resolver: zodResolver(createItemSchema),
    defaultValues: {
      name: "",
      description: "",
      priority: "medium",
      roomId,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: CreateItemDto) => createItem(data),
    onSuccess: (item) => {
      console.log(item);
      queryClient.setQueryData(["room", roomSlug], (room: Room) => {
        if (!room) return room;

        return {
          ...room,
          items: [...room.items, item],
        };
      });

      setIsOpen(false);
      reset();
    },
  });

  const handleCreateItem = async (data: CreateItemDto) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Button type="button" color="teal" onClick={() => setIsOpen(true)}>
        Adicionar item
      </Button>

      <Dialog open={isOpen} onClose={setIsOpen}>
        <form onSubmit={handleSubmit(handleCreateItem)}>
          <DialogTitle>Adicionar item</DialogTitle>
          <DialogBody>
            <Fieldset>
              <FieldGroup>
                <Field>
                  <Label>Nome</Label>
                  <Input {...register("name")} invalid={Boolean(errors.name)} />
                  {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </Field>

                <Field>
                  <Label>Descrição</Label>
                  <Input {...register("description")} />
                </Field>

                <Field>
                  <Label>Prioridade</Label>
                  <Headless.RadioGroup
                    value={watch("priority")}
                    onChange={(value) => setValue("priority", value)}
                    className="flex gap-6 sm:gap-8"
                  >
                    {["low", "medium", "high"].map((level) => (
                      <Headless.Field key={level} className="flex items-center gap-2">
                        <Radio value={level} color="teal" />
                        <Headless.Label className="text-base/6 select-none sm:text-sm/6">
                          {getPriorityBadge(level as Priority).label}
                        </Headless.Label>
                      </Headless.Field>
                    ))}
                  </Headless.RadioGroup>
                </Field>
              </FieldGroup>
            </Fieldset>
          </DialogBody>
          <DialogActions>
            <Button type="submit" disabled={isSubmitting}>
              Salvar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
