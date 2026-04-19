"use client";

import { editProfile } from "@/actions/profile.actions";
import Input from "@/app/_components/Input";
import { Label } from "@/components/ui/label"; // If using shadcn/ui, otherwise use <label>
import { EditProfileSchema } from "@/lib/validations/auth.schema";
import { FormState, BaseFormState } from "@/types/auth";
import { useActionState } from "react";

interface EditModalProps {
  initialData?: {
    displayName?: string;
    bio?: string | null;
  };
  onClose: () => void;
}

export const EditModal = ({ initialData, onClose }: EditModalProps) => {
  const handleSubmit = async (prevState: FormState, formData: FormData) => {
    const raw = {
      displayName: formData.get("displayName"),
      bio: formData.get("bio"),
    };

    const result = EditProfileSchema.safeParse(raw);

    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors as BaseFormState["errors"],
      };
    }

    const res = await editProfile(prevState, formData);
    if (!res || !res.errors) {
      onClose();
    }
    return res;
  };

  const [state, formAction, isPending] = useActionState(handleSubmit, null);
  return (
    <form action={formAction} className="space-y-6 py-2">
      {/* Name Field */}
      <div className="grid w-full items-center gap-2">
        <Label
          htmlFor="displayName"
          className="text-xs font-semibold uppercase tracking-widest text-muted-foreground ml-1"
        >
          Name
        </Label>
        <Input
          name="displayName"
          type="text"
          id="displayName"
          autoFocus
          defaultValue={initialData?.displayName}
          placeholder="Your display name"
          className="bg-border/50 border-border/50 h-11 outline-none p-6"
        />
        {state?.errors?.displayName && (
          <p className="text-red-500 dark:text-red-400 text-xs">
            {state?.errors?.displayName?.[0]}
          </p>
        )}
      </div>

      {/* Bio Field */}
      <div className="grid w-full items-center gap-2">
        <div className="flex justify-between items-center px-1">
          <Label
            htmlFor="bio"
            className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
          >
            Bio
          </Label>
        </div>
        <Input
          name="bio"
          type="text"
          id="bio"
          defaultValue={initialData?.bio || ""}
          placeholder="Write a short bio..."
          className="bg-border/50 border-border/50 h-11 outline-none p-6"
        />
        {state?.errors?.bio && (
          <p className="text-red-500 dark:text-red-400 text-xs">
            {state?.errors?.bio?.[0]}
          </p>
        )}
      </div>

      <div className="w-full flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="bg-foreground text-background p-4.5 py-2.5 opacity-75 hover:opacity-100 rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
};
