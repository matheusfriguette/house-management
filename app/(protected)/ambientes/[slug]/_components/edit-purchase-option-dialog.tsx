"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import { SubmitButton } from "@/components/ui/button";
import { Dialog, DialogActions, DialogBody, DialogTitle } from "@/components/ui/dialog";
import { ErrorMessage, Field, FieldGroup, Fieldset, Label } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { EditPurchaseOptionDto, editPurchaseOptionSchema } from "@/lib/dtos";
import { useItems } from "@/lib/hooks/items";
import { PurchaseOption } from "@/lib/types";
import { formatMoney } from "@/lib/utils";

export function EditPurchaseOptionDialog({
  itemId,
  purchaseOption,
  isOpen,
  setIsOpen,
}: {
  itemId: string;
  purchaseOption: PurchaseOption;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const defaultValues = useMemo(
    () => ({
      itemId: itemId,
      url: purchaseOption.url,
      metadata: {
        title: purchaseOption.metadata.title,
        price: formatMoney(purchaseOption.metadata.price),
        imageUrl: purchaseOption.metadata.imageUrl,
      },
    }),
    [itemId, purchaseOption],
  );

  const { editPurchaseOptionMutation } = useItems();
  const form = useForm<EditPurchaseOptionDto>({
    resolver: zodResolver(editPurchaseOptionSchema),
    defaultValues,
  });
  const { errors, isSubmitting } = form.formState;

  useEffect(() => {
    if (isOpen) {
      form.reset(defaultValues);
    }
  }, [isOpen, form, defaultValues]);

  const handleEdit = async (data: EditPurchaseOptionDto) => {
    await editPurchaseOptionMutation.mutateAsync({ id: purchaseOption.id, itemId, dto: data });
    setIsOpen(false);
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
                <Input {...form.register("metadata.title")} invalid={Boolean(errors.metadata?.title)} autoFocus  />
                {errors.metadata?.title && <ErrorMessage>{errors.metadata?.title.message}</ErrorMessage>}
              </Field>

              <Field>
                <Label>Preço</Label>
                <Input
                  {...form.register("metadata.price")}
                  onChange={(e) => {
                    const float = (Number(e.target.value.replace(/\D/g, "")) / 100).toFixed(2);

                    form.setValue("metadata.price", formatMoney(Number(float)), {
                      shouldValidate: true,
                    });
                  }}
                  invalid={Boolean(errors.metadata?.price)}
                />
                {errors.metadata?.price && <ErrorMessage>{errors.metadata?.price.message}</ErrorMessage>}
              </Field>

              <Field>
                <Label>URL da imagem</Label>
                <Input {...form.register("metadata.imageUrl")} invalid={Boolean(errors.metadata?.imageUrl)} />
                {errors.metadata?.imageUrl && <ErrorMessage>{errors.metadata?.imageUrl.message}</ErrorMessage>}
              </Field>
            </FieldGroup>
          </Fieldset>
        </DialogBody>
        <DialogActions>
          <SubmitButton isLoading={isSubmitting}>Salvar</SubmitButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}
