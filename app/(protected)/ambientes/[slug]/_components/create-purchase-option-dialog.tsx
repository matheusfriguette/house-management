"use client";

import { Field, Fieldset } from "@headlessui/react";
import { LinkIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Dialog, DialogActions, DialogBody, DialogTitle } from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { CreatePurchaseOptionDto, createPurchaseOptionSchema } from "@/lib/dtos";
import { useItems } from "@/lib/hooks/items";

export default function CreatePurchaseOptionDialog({ itemId }: { itemId: string }) {
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

  useEffect(() => {
    if (isOpen) {
      form.reset(defaultValues);
    }
  }, [isOpen, form, defaultValues]);

  const handleCreate = async (data: CreatePurchaseOptionDto) => {
    createPurchaseOptionMutation.mutate(data, {
      onSuccess: () => {
        setIsOpen(false);
        form.reset();
      },
    });
  };

  return (
    <>
      <Button outline onClick={() => setIsOpen(true)}>
        Adicionar link
        <LinkIcon />
      </Button>

      <Dialog open={isOpen} onClose={setIsOpen}>
        <form onSubmit={form.handleSubmit(handleCreate)}>
          <DialogTitle>Adicionar link</DialogTitle>
          <DialogBody>
            <Fieldset>
              <FieldGroup>
                <Field>
                  <Input placeholder="URL" {...form.register("url")} invalid={Boolean(form.formState.errors.url)} />
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
