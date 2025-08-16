import * as Yup from "yup";
import { Field, Form, Formik, FormikHelpers, ErrorMessage } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../services/postService";
import { Post } from "../../types/post";
import css from "./CreatePostForm.module.css";

interface CreatePostFormProps {
  onClose: () => void;
}

const PostSchema = Yup.object().shape({
  title: Yup.string().required("Title required").min(3).max(50),
  body: Yup.string().required("Content required").min(3).max(500),
});

export default function CreatePostForm({ onClose }: CreatePostFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("Post created successfully!");
      onClose();
    },
  });

const initialValues: Post = { id: 0, title: "", body: "", userId: 1 };

  const handleSubmit = (values: Post, actions: FormikHelpers<Post>) => {
    mutation.mutate(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={PostSchema}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="body">Content</label>
            <Field
              id="body"
              as="textarea"
              name="body"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage name="body" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting || mutation.isPending}
            >
              Create post
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
