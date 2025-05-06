import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSlug } from "@/components/slug-context";
import { createItem, deleteItem, editItem, togglePurchased } from "@/lib/api/items";
import { editMetadata } from "@/lib/api/metadata";
import { createPurchaseOption, deletePurchaseOption, toggleFavorite } from "@/lib/api/purchase-options";
import { CreateEditItemDto, CreatePurchaseOptionDto, EditMetadaDto } from "@/lib/dtos";
import { Room } from "@/lib/types";

export function useItems() {
  const slug = useSlug();
  const queryClient = useQueryClient();

  const createItemMutation = useMutation({
    mutationFn: async (data: CreateEditItemDto) => createItem(data),
    onSuccess: (item) => {
      queryClient.setQueryData(["room", slug], (room: Room) => {
        return {
          ...room,
          items: [...room.items, item],
        };
      });
    },
  });

  const editItemMutation = useMutation({
    mutationFn: async ({ id, dto }: { id: string; dto: CreateEditItemDto }) => editItem(id, dto),
    onSuccess: (newItem, { id }) => {
      queryClient.setQueryData(["room", slug], (room: Room) => {
        return {
          ...room,
          items: room.items.map((item) => (item.id === id ? { ...item, ...newItem } : item)),
        };
      });
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: async (id: string) => deleteItem(id),
    onSuccess: async (_, id: string) => {
      queryClient.setQueryData(["room", slug], (room: Room) => ({
        ...room,
        items: room.items.filter((item) => item.id !== id),
      }));
    },
  });

  const togglePurchasedMutation = useMutation({
    mutationFn: async (id: string) => togglePurchased(id),
    onMutate: (id) => {
      queryClient.setQueryData(["room", slug], (room: Room) => ({
        ...room,
        items: room.items.map((item) =>
          item.id === id
            ? {
                ...item,
                isPurchased: !item.isPurchased,
              }
            : item,
        ),
      }));
    },
  });

  const createPurchaseOptionMutation = useMutation({
    mutationFn: async (data: CreatePurchaseOptionDto) => createPurchaseOption(data),
    onSuccess: (purchaseOption, data) => {
      queryClient.setQueryData(["room", slug], (room: Room) => {
        return {
          ...room,
          items: room.items.map((item) =>
            item.id === data.itemId
              ? {
                  ...item,
                  purchaseOptions: [...item.purchaseOptions, purchaseOption],
                }
              : item,
          ),
        };
      });
    },
  });

  const deletePurchaseOptionMutation = useMutation({
    mutationFn: async (id: string) => deletePurchaseOption(id),
    onSuccess: (_, id: string) => {
      queryClient.setQueryData(["room", slug], (room: Room) => ({
        ...room,
        items: room.items.map((item) => ({
          ...item,
          purchaseOptions: item.purchaseOptions.filter((purchaseOption) => purchaseOption.id !== id),
        })),
      }));
    },
  });

  const toggleFavoriteMutation = useMutation({
    mutationFn: async ({ id }: { id: string; itemId: string }) => toggleFavorite(id),
    onMutate: ({ id, itemId }) => {
      queryClient.setQueryData(["room", slug], (room: Room) => ({
        ...room,
        items: room.items.map((item) =>
          item.id === itemId
            ? {
                ...item,
                purchaseOptions: item.purchaseOptions.map((purchaseOption) =>
                  purchaseOption.id === id
                    ? { ...purchaseOption, isFavorite: !purchaseOption.isFavorite }
                    : { ...purchaseOption, isFavorite: false },
                ),
              }
            : item,
        ),
      }));
    },
  });

  const editMetadataMutation = useMutation({
    mutationFn: async ({ id, dto }: { id: string; dto: EditMetadaDto }) => editMetadata(id, dto),
    // onSuccess: (newItem, { id }) => {
    //   queryClient.setQueryData(["room", slug], (room: Room) => {
    //     return {
    //       ...room,
    //       items: room.items.map((item) => (item.id === id ? { ...item, ...newItem } : item)),
    //     };
    //   });
    // },
  });

  return {
    createItemMutation,
    editItemMutation,
    deleteItemMutation,
    togglePurchasedMutation,
    createPurchaseOptionMutation,
    deletePurchaseOptionMutation,
    toggleFavoriteMutation,
    editMetadataMutation,
  };
}
