import css from "./Modal.module.css";

export default function Modal() {
  <div className={css.backdrop} role="dialog" aria-modal="true">
    <div className={css.modal}>{children}</div>
  </div>;
}
