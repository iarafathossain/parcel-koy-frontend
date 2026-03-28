import * as zod from "zod";

export const updateAdminZodSchema = zod.object({
  name: zod
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be at most 100 characters long"),
  email: zod.email("Invalid email address"),
  contactNumber: zod
    .string()
    .min(11, "Contact number must be at least 11 characters long")
    .max(11, "Contact number must be at most 11 characters long")
    .regex(/^[0-9]+$/, "Contact number must contain only digits"),
  presentAddress: zod
    .string()
    .min(1, "Present address is required")
    .max(200, "Present address must be at most 200 characters long"),
  permanentAddress: zod
    .string()
    .min(1, "Permanent address is required")
    .max(200, "Permanent address must be at most 200 characters long"),
});

export type IUpdateAdminPayload = zod.infer<typeof updateAdminZodSchema>;
