import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import css from "./EditPostForm.module.css";
import { Post } from "../../types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost } from "../../services/postService";
import { useEffect } from "react";

interface EditPostFormProps {
  initialValues: Post;
  onClose: () => void;
}

const PostShema = Yup.object().shape({
  title: Yup.string().required("title required").min(3).max(200),
  body: Yup.string().required("body required").min(3).max(220),
});

export default function EditPostForm({ initialValues, onClose }: EditPostFormProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleSubmit = (values: Post, actions: FormikHelpers<Post>) => {
    mutation.mutate(values);
    onClose();
    actions.resetForm();
  };


    useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={PostShema}
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
              Edit post
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
