import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Labelled field wrapper. */
export function Field({
  label,
  hint,
  required,
  htmlFor,
  className,
  children,
}: {
  label?: ReactNode;
  hint?: ReactNode;
  required?: boolean;
  htmlFor?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("field", className)}>
      {label && (
        <label className="field__label" htmlFor={htmlFor}>
          {label} {required && <span className="req">*</span>}
        </label>
      )}
      {children}
      {hint && <span className="field__hint">{hint}</span>}
    </div>
  );
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn("input", className)} {...props} />;
}
export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn("textarea", className)} {...props} />;
}
export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <select className={cn("select", className)} {...props}>
      {children}
    </select>
  );
}

/** Grid row of fields (1 / 2 / 3 columns). */
export function FormRow({
  cols = 1,
  className,
  children,
}: {
  cols?: 1 | 2 | 3;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("form-row", cols === 2 && "form-row--2", cols === 3 && "form-row--3", className)}>
      {children}
    </div>
  );
}

export function FormNote({ icon, className, children }: { icon?: string; className?: string; children: ReactNode }) {
  return (
    <p className={cn("form-note", className)}>
      {icon && <i className={`fa-solid ${icon}`} aria-hidden />}
      {children}
    </p>
  );
}

/** Inline success confirmation (toggle `show`). */
export function FormOk({ show, className, children }: { show?: boolean; className?: string; children: ReactNode }) {
  return (
    <div className={cn("form-ok", show && "show", className)} role="status" aria-live="polite">
      <i className="fa-solid fa-circle-check" aria-hidden /> {children}
    </div>
  );
}
