// components/common/ConfirmDialog.jsx
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "./Button";

export default function ConfirmDialog({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  trigger,
  confirmText = "Confirm",
  onConfirm
}) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        {trigger}
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black/40 fixed inset-0 z-40" />
        <AlertDialog.Content className="z-50 fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md space-y-4">
          <AlertDialog.Title className="text-lg font-semibold text-gray-800">{title}</AlertDialog.Title>
          <AlertDialog.Description className="text-sm text-gray-600">
            {description}
          </AlertDialog.Description>

          <div className="flex justify-end gap-3 pt-4">
            <AlertDialog.Cancel asChild>
              <Button variant="ghost">Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button className="bg-darkRed text-white hover:bg-midRed" onClick={onConfirm}>
                {confirmText}
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
