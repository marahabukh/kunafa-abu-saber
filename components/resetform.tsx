"use client";

import { useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

function ResetWatcher({
  formRef,
}: {
  formRef: React.RefObject<HTMLFormElement>;
}) {
  const { pending } = useFormStatus();
  const wasPending = useRef(false);

  useEffect(() => {
    // لما ينتقل من "عم يرسل" (true) إلى "خلص" (false) => فضّي الفورم
    if (wasPending.current && !pending) {
      formRef.current?.reset();
    }
    wasPending.current = pending;
  }, [pending, formRef]);

  return null;
}

export default function ResettableForm({
  action,
  className,
  children,
}: {
  action: (formData: FormData) => void;
  className?: string;
  children: React.ReactNode;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={action} className={className}>
      {children}
      <ResetWatcher formRef={formRef} />
    </form>
  );
}