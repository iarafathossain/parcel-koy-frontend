import { Gender } from "@/types/enum-type";
import * as zod from "zod";

export const createRiderZodSchema = zod.object({
  password: zod
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be at most 50 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, &)",
    ),
  rider: zod.object({
    name: zod.string().min(1, "Name is required"),
    email: zod.email("Invalid email address"),
    contactNumber: zod
      .string()
      .min(11, "Contact number must be at least 11 characters long")
      .max(11, "Contact number must be at most 11 characters long")
      .regex(/^[0-9]+$/, "Contact number must contain only digits"),
    gender: zod.enum(
      [Gender.MALE, Gender.FEMALE, Gender.OTHER],
      "Invalid gender value",
    ),
    presentAddress: zod.string().optional(),
    permanentAddress: zod.string().optional(),
    age: zod.int().min(18, "Rider age must be at least 18").optional(),
    hubId: zod.string().uuid("Hub id must be a valid UUID"),
  }),
});

export type CreateRiderPayload = zod.infer<typeof createRiderZodSchema>;

export const updateRiderProfileZodSchema = zod
  .object({
    riderId: zod.uuid("Rider ID must be a valid UUID").optional(),
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
    age: zod.int().min(18, "Rider age must be at least 18").optional(),
  })
  .refine(
    (data) =>
      data.name !== undefined ||
      data.image !== undefined ||
      data.contactNumber !== undefined ||
      data.gender !== undefined ||
      data.presentAddress !== undefined ||
      data.permanentAddress !== undefined ||
      data.age !== undefined,
    {
      message:
        "At least one field is required: name, image, contactNumber, gender, presentAddress, permanentAddress, or age",
    },
  );

export const updateRiderHubZodSchema = zod.object({
  hubId: zod.uuid("Hub ID must be a valid UUID"),
});

export const getSingleRiderByEmailZodSchema = zod.object({
  email: zod.email("Invalid email address"),
});

export type UpdateRiderProfilePayload = zod.infer<
  typeof updateRiderProfileZodSchema
>;
export type UpdateRiderHubPayload = zod.infer<typeof updateRiderHubZodSchema>;
export type GetSingleRiderByEmailPayload = zod.infer<
  typeof getSingleRiderByEmailZodSchema
>;
