import { Gender } from "@/types/enum-type";
import * as zod from "zod";

export const updateAdminProfileZodSchema = zod
  .object({
    adminId: zod.uuid("Admin ID must be a valid UUID").optional(),
    name: zod.string().min(1, "Name cannot be empty").optional(),
    image: zod.string().url("Invalid image URL").optional(),
    contactNumber: zod
      .string()
      .regex(/^[0-9]{10,15}$/, "Contact number must be 10-15 digits")
      .optional(),
    gender: zod.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER]).optional(),
    presentAddress: zod
      .string()
      .min(1, "Present address cannot be empty")
      .optional(),
    permanentAddress: zod
      .string()
      .min(1, "Permanent address cannot be empty")
      .optional(),
  })
  .refine(
    (data) =>
      data.name !== undefined ||
      data.image !== undefined ||
      data.contactNumber !== undefined ||
      data.gender !== undefined ||
      data.presentAddress !== undefined ||
      data.permanentAddress !== undefined,
    {
      message:
        "At least one field is required: name, image, contactNumber, gender, presentAddress, or permanentAddress",
    },
  );

export type UpdateAdminProfilePayload = zod.infer<
  typeof updateAdminProfileZodSchema
>;
