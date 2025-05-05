"use client";

import { Field, Fieldset } from "@headlessui/react";
import { LinkIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { ButtonGroupItem } from "@/components/ui/button-group";
import { Dialog, DialogActions, DialogBody, DialogTitle } from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { createPurchaseOption, deletePurchaseOption } from "@/lib/api/purchase-options";
import { CreatePurchaseOptionDto, createPurchaseOptionSchema } from "@/lib/dtos";
import { PurchaseOption, Room } from "@/lib/types";
import { LinkList } from "./link-list";

export default function LinkDialog({
  itemId,
  roomSlug,
  purchaseOptions,
}: {
  itemId: string;
  roomSlug: string;
  purchaseOptions: PurchaseOption[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const queryClient = useQueryClient();
  const form = useForm<CreatePurchaseOptionDto>({
    resolver: zodResolver(createPurchaseOptionSchema),
    defaultValues: {
      url: "",
      itemId: itemId,
    },
  });

  const createPurchaseOptionMutation = useMutation({
    mutationFn: async (data: CreatePurchaseOptionDto) => createPurchaseOption(data),
    onSuccess: (purchaseOption) => {
      queryClient.setQueryData(["room", roomSlug], (room: Room) => {
        if (!room) return room;

        return {
          ...room,
          items: room.items.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  purchaseOptions: [...item.purchaseOptions, purchaseOption],
                }
              : item,
          ),
        };
      });

      setIsAdding(false);
      form.reset();
    },
  });

  const deletePurchaseOptionMutation = useMutation({
    mutationFn: async (id: string) => deletePurchaseOption(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["room"] });
    },
  });

  const handleSubmit = async (data: CreatePurchaseOptionDto) => {
    createPurchaseOptionMutation.mutate(data);
  };

  const handleDelete = (id: string) => {
    deletePurchaseOptionMutation.mutate(id);
  };

  return (
    <>
      <ButtonGroupItem onClick={() => setIsOpen(true)}>
        <LinkIcon />
        Links
      </ButtonGroupItem>

      <Dialog open={isOpen} onClose={setIsOpen}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogTitle>Links salvos</DialogTitle>
          <DialogBody>
            <LinkList purchaseOptions={purchaseOptions} onDelete={handleDelete} />

            {isAdding && (
              <Fieldset className="mt-4">
                <FieldGroup>
                  <Field className="sm:col-span-2">
                    <Input placeholder="URL" {...form.register("url")} invalid={Boolean(form.formState.errors.url)} />
                  </Field>
                </FieldGroup>
              </Fieldset>
            )}
          </DialogBody>
          <DialogActions>
            {isAdding ? (
              <>
                <Button
                  outline
                  type="submit"
                  onClick={() => {
                    setIsAdding(false);
                    form.reset();
                  }}
                >
                  Cancelar
                </Button>

                <Button type="submit" disabled={form.formState.isSubmitting}>
                  Salvar
                </Button>
              </>
            ) : (
              <Button type="button" onClick={() => setIsAdding(true)}>
                Adicionar link
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
