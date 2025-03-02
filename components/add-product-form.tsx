"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  category: z.enum(["Electronics", "Clothing", "Accessories"], {
    required_error: "Please select a category.",
  }),
  stockAvailability: z.coerce.number().int().nonnegative({
    message: "Stock must be a non-negative integer.",
  }),
  imageUrl: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .or(z.literal("")),
});

type MyProps = {
  loading: boolean;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
};

export default function AddProductForm(props: MyProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: undefined,
      category: undefined,
      stockAvailability: undefined,
      imageUrl: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    props.onSubmit(values);
  }

  const handleImageUrlChange = (url: string) => {
    if (url && url.match(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i)) {
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="w-full mx-auto p-6 px-[200px]">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                disabled={props.loading}
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                disabled={props.loading}
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5">$</span>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          className="pl-7"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                disabled={props.loading}
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Clothing">Clothing</SelectItem>
                        <SelectItem value="Accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                disabled={props.loading}
                control={form.control}
                name="stockAvailability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Availability</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        placeholder="Enter stock quantity"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                disabled={props.loading}
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleImageUrlChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter a valid URL for the product image
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={props.loading}>
                {props.loading ? "Uploading..." : "Add Product"}
              </Button>
            </form>
          </Form>
        </div>

        <div className="md:col-span-5">
          <Card className="h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center h-full">
              {imagePreview ? (
                <div className="w-full aspect-square relative overflow-hidden rounded-md">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Product preview"
                    className="object-cover w-full h-full"
                    onError={() => setImagePreview(null)}
                  />
                </div>
              ) : (
                <div className="w-full aspect-square bg-muted flex items-center justify-center rounded-md">
                  <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  <span className="sr-only">No image preview available</span>
                </div>
              )}
              <p className="mt-2 text-sm text-muted-foreground text-center">
                {imagePreview ? "Image Preview" : "No image preview available"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
