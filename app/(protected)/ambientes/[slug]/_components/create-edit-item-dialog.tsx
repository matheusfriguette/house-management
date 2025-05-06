"use client";

import * as Headless from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { ButtonGroupItem } from "@/components/ui/button-group";
import { Dialog, DialogActions, DialogBody, DialogTitle } from "@/components/ui/dialog";
import { ErrorMessage, Field, FieldGroup, Fieldset, Label } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { Radio } from "@/components/ui/radio";
import { CreateEditItemDto, createEditItemSchema } from "@/lib/dtos";
import { useItems } from "@/lib/hooks/items";
import { Item, Priority } from "@/lib/types";
import { getPriorityBadge } from "@/lib/utils";

export function CreateEditItemDialog({ roomId, item }: { roomId: string; item?: Item }) {
  const [isOpen, setIsOpen] = useState(false);

  const defaultValues = useMemo(
    () => ({
      name: item?.name ?? "",
      description: item?.description ?? "",
      priority: item?.priority ?? "medium",
      roomId: roomId,
    }),
    [item, roomId],
  );

  const { editItemMutation, createItemMutation } = useItems();
  const form = useForm<CreateEditItemDto>({
    resolver: zodResolver(createEditItemSchema),
    defaultValues,
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(defaultValues);
    }
  }, [isOpen, form, defaultValues]);

  const handleCreateEdit = async (data: CreateEditItemDto) => {
    if (!item) {
      createItemMutation.mutate(data, {
        onSuccess: () => {
          setIsOpen(false);
        },
      });
    } else {
      editItemMutation.mutate(
        { id: item.id, dto: data },
        {
          onSuccess: () => {
            setIsOpen(false);
          },
        },
      );
    }
  };

  return (
    <>
      {item ? (
        <ButtonGroupItem onClick={() => setIsOpen(true)}>
          <PencilSquareIcon />
        </ButtonGroupItem>
      ) : (
        <Button type="button" color="teal" onClick={() => setIsOpen(true)}>
          Adicionar item
        </Button>
      )}

      <Dialog open={isOpen} onClose={setIsOpen}>
        <form onSubmit={form.handleSubmit(handleCreateEdit)}>
          <DialogTitle>Adicionar item</DialogTitle>
          <DialogBody>
            <Fieldset>
              <FieldGroup>
                <Field>
                  <Label>Nome</Label>
                  <Input {...form.register("name")} invalid={Boolean(form.formState.errors.name)} />
                  {form.formState.errors.name && <ErrorMessage>{form.formState.errors.name.message}</ErrorMessage>}
                </Field>

                <Field>
                  <Label>Descrição</Label>
                  <Input {...form.register("description")} />
                </Field>

                <Field>
                  <Label>Prioridade</Label>
                  <Headless.RadioGroup
                    value={form.watch("priority")}
                    onChange={(value) => form.setValue("priority", value)}
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
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Salvar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
