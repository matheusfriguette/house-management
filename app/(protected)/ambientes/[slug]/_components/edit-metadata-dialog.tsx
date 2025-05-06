"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Dialog, DialogActions, DialogBody, DialogTitle } from "@/components/ui/dialog";
import { ErrorMessage, Field, FieldGroup, Fieldset, Label } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { EditMetadaDto, editMetadataSchema } from "@/lib/dtos";
import { useItems } from "@/lib/hooks/items";
import { Metadata } from "@/lib/types";

export function EditMetadataDialog({
  metadata,
  isOpen,
  setIsOpen,
}: {
  metadata: Metadata;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const defaultValues = useMemo(
    () => ({
      title: metadata.title,
      price: metadata.price.toString(),
      imageUrl: metadata.imageUrl,
    }),
    [metadata],
  );

  const { editMetadataMutation } = useItems();
  const form = useForm<EditMetadaDto>({
    resolver: zodResolver(editMetadataSchema),
    defaultValues,
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(defaultValues);
    }
  }, [isOpen, form, defaultValues]);

  const handleEdit = async (data: EditMetadaDto) => {
    editMetadataMutation.mutate(
      { id: metadata.id, dto: data },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onClose={setIsOpen}>
      <form onSubmit={form.handleSubmit(handleEdit)}>
        <DialogTitle>Editar dados</DialogTitle>
        <DialogBody>
          <Fieldset>
            <FieldGroup>
              <Field>
                <Label>Título</Label>
                <Input {...form.register("title")} invalid={Boolean(form.formState.errors.title)} />
                {form.formState.errors.title && <ErrorMessage>{form.formState.errors.title.message}</ErrorMessage>}
              </Field>

              <Field>
                <Label>Preço</Label>
                <Input {...form.register("price")} invalid={Boolean(form.formState.errors.price)} />
                {form.formState.errors.price && <ErrorMessage>{form.formState.errors.price.message}</ErrorMessage>}
              </Field>

              <Field>
                <Label>URL da imagem</Label>
                <Input {...form.register("imageUrl")} invalid={Boolean(form.formState.errors.imageUrl)} />
                {form.formState.errors.imageUrl && (
                  <ErrorMessage>{form.formState.errors.imageUrl.message}</ErrorMessage>
                )}
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
  );
}
