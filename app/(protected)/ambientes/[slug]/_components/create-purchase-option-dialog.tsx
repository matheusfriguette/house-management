"use client";

import { Field, Fieldset } from "@headlessui/react";
import { LinkIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button, SubmitButton } from "@/components/ui/button";
import { ErrorMessage, FieldGroup } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { CreatePurchaseOptionDto, createPurchaseOptionSchema } from "@/lib/dtos";
import { useItems } from "@/lib/hooks/items";

export function CreatePurchaseOptionDialog({ itemId }: { itemId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const defaultValues = useMemo(
    () => ({
      url: "",
      itemId: itemId,
    }),
    [itemId],
  );

  const { createPurchaseOptionMutation } = useItems();
  const form = useForm<CreatePurchaseOptionDto>({
    resolver: zodResolver(createPurchaseOptionSchema),
    defaultValues,
  });
  const { errors, isSubmitting } = form.formState;

  useEffect(() => {
    if (isOpen) {
      form.reset(defaultValues);
    }
  }, [isOpen, form, defaultValues]);

  const handleCreate = async (data: CreatePurchaseOptionDto) => {
    await createPurchaseOptionMutation.mutateAsync(data);
    setIsOpen(false);
  };

  return (
    <ResponsiveDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Adicionar link"
      trigger={
        <Button outline>
          Adicionar link
          <LinkIcon />
        </Button>
      }
      footer={<SubmitButton isLoading={isSubmitting}>Salvar</SubmitButton>}
      asForm
      onSubmit={form.handleSubmit(handleCreate)}
    >
      <Fieldset>
        <FieldGroup>
          <Field>
            <Input placeholder="URL" {...form.register("url")} invalid={Boolean(errors.url)} autoFocus />
            {errors.url && <ErrorMessage>{errors.url.message}</ErrorMessage>}
          </Field>
        </FieldGroup>
      </Fieldset>
    </ResponsiveDialog>
  );
}
