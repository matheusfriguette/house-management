"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircleSolid, Xmark } from "iconoir-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PurchaseOption } from "../_lib/types";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

const formSchema = z.object({
  url: z.string().min(1, "Item name is required"),
  price: z
    .number()
    .min(0.01, "Price must be at least $0.01")
    .max(1000000, "Price too high"),
  label: z.string().max(500).optional(),
  item_id: z.string(),
});

export default function LinkDialog({
  itemId,
  purchaseOptions,
  onCreatePurchaseOption,
}: {
  itemId: string;
  purchaseOptions: PurchaseOption[];
  onCreatePurchaseOption: (values: z.infer<typeof formSchema>) => Promise<void>;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      price: 0,
      label: "",
      item_id: itemId,
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    onCreatePurchaseOption(values);
    form.reset();
    setIsAdding(false);
  }

  return (
    <Dialog>
      <DialogTrigger className="text-sm text-blue-500 hover:underline">
        {purchaseOptions.length} links
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Saved Links</DialogTitle>
        </DialogHeader>

        {!isAdding ? (
          <>
            <ul className="flex flex-col gap-2">
              {purchaseOptions.map((option, i) => (
                <li key={i} className="flex items-center">
                  <a
                    href={option.url}
                    target="_blank"
                    className="flex-1 truncate text-blue-500 hover:underline"
                  >
                    {option.label || new URL(option.url).hostname}
                  </a>
                  <button className="text-gray-400 hover:text-red-500">
                    <Xmark className="size-5" />
                  </button>
                </li>
              ))}
            </ul>
            <DialogFooter>
              <Button onClick={() => setIsAdding(true)} fullWidth>
                <PlusCircleSolid className="size-5" />
                <span className="ml-2">Add link</span>
              </Button>
            </DialogFooter>
          </>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Coffee table, Desk lamp..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Coffee table, Desk lamp..."
                          type="number"
                          {...field}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            field.onChange(isNaN(value) ? 0 : value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Label</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Coffee table, Desk lamp..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false);
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Saving..." : "Save Item"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
