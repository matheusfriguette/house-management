"use client";

import * as Headless from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button, SubmitButton } from "@/components/ui/button";
import { ButtonGroupItem } from "@/components/ui/button-group";
import { ErrorMessage, Field, FieldGroup, Fieldset, Label } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { Radio } from "@/components/ui/radio";
import { Textarea } from "@/components/ui/textarea";
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
  const { errors, isSubmitting } = form.formState;

  useEffect(() => {
    if (isOpen) {
      form.reset(defaultValues);
    }
  }, [isOpen, form, defaultValues]);

  const handleCreateEdit = async (data: CreateEditItemDto) => {
    if (!item) {
      await createItemMutation.mutateAsync(data);
    } else {
      await editItemMutation.mutateAsync({ id: item.id, dto: data });
    }

    setIsOpen(false);
  };

  return (
    <ResponsiveDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={item ? "Editar item" : "Adicionar item"}
      trigger={
        item ? (
          <ButtonGroupItem>
            <PencilSquareIcon />
          </ButtonGroupItem>
        ) : (
          <Button type="button" color="teal">
            Adicionar item
          </Button>
        )
      }
      footer={<SubmitButton isLoading={isSubmitting}>Salvar</SubmitButton>}
      asForm
      onSubmit={form.handleSubmit(handleCreateEdit)}
    >
      <Fieldset>
        <FieldGroup>
          <Field>
            <Label>Nome</Label>
            <Input {...form.register("name")} invalid={Boolean(errors.name)} />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </Field>

          <Field>
            <Label>Descrição</Label>
            <Textarea {...form.register("description")} invalid={Boolean(errors.description)} />
            {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
          </Field>

          <Field>
            <Label>Prioridade</Label>
            <Headless.RadioGroup
              value={form.watch("priority")}
              onChange={(value) => form.setValue("priority", value)}
              className="mt-1 flex gap-6 sm:gap-8"
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
    </ResponsiveDialog>
  );
}
