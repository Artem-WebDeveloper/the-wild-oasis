type CabinForm = {
  description: string;
  discount: number;
  maxCapacity: number;
  name: string;
  regularPrice: number;
};

export type CabinFormValues = CabinForm & { image: FileList | string };
export type CreateCabinFormValues = CabinForm & { image: File };
export type EditCabinFormValues = CabinForm & { image: File | string };

export type CabinPayload = CabinForm & { image: File | string };
