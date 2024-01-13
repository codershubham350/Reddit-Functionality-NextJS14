"use client";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";
import { useFormState } from "react-dom";
import * as actions from "@/actions";
import FormButton from "@/components/common/formButton";

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  // after binding slug with out action we ned to define three arguments in the server action
  // i.e. slug, formState and formData e.g. export async function createPost(slug: string, formState: CreatePostFormState, formData: FormData): Promise<CreatePostFormState>
  const [formState, action] = useFormState(
    actions.createPost.bind(null, slug),
    { errors: {} }
  );

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Post</h3>
            <Input
              name="title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
            />
            <Textarea
              name="content"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
              label="Content"
              labelPlacement="outside"
              placeholder="Content"
            />
            {formState.errors._form ? (
              <div className="rounded p-2 bg-red-200 border border-red-400">
                {formState.errors._form?.join(", ")}
              </div>
            ) : null}
            <FormButton>Create Post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
