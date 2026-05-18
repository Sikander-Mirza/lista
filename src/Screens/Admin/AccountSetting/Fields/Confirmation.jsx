import { useState } from "react";

export const useConfirmation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [resolver, setResolver] = useState(null);

  const confirm = () =>
    new Promise((resolve) => {
      setIsOpen(true);
      setResolver(() => resolve);
    });

  const handleConfirm = () => {
    setIsOpen(false);
    resolver(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
    resolver(false);
  };

  return {
    isOpen,
    confirm,
    handleConfirm,
    handleCancel,
  };
};
