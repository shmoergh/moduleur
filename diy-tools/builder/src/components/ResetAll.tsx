import * as AlertDialog from "@radix-ui/react-alert-dialog";
import presets from "../data/presets.json";

type Preset = { storagePrefix: string; smdIndices: number[] };
type PresetsJson = Record<string, Record<string, Preset>>;

// Rewrite localStorage so every board's "Placed" column reflects the current
// SMD list: SMDs ticked, everything else cleared. Both passes are touched so
// the result is independent of which pass the user is viewing right now.
function applyReset() {
  const data = presets as PresetsJson;
  for (const slug of Object.keys(data)) {
    for (const pass of Object.keys(data[slug])) {
      const { storagePrefix, smdIndices } = data[slug][pass];
      try {
        localStorage.setItem(
          storagePrefix + "checkbox_Placed",
          smdIndices.join(",")
        );
      } catch (e) {
        // ignore
      }
    }
  }
}

export function ResetAll() {
  const onConfirm = () => {
    applyReset();
    // Reload every iframe so the "Placed" state in the UI matches storage.
    document
      .querySelectorAll("iframe")
      .forEach((f) => {
        // Re-assigning src forces a clean reload; using location.reload is
        // blocked across same-origin iframes when offscreen in some browsers.
        const s = f.getAttribute("src");
        if (s) f.setAttribute("src", s);
      });
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="rounded border border-line bg-panel px-3 py-1 text-sm text-ink hover:bg-line-soft">
          Reset all
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-40 bg-black/30" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded border border-line bg-panel p-5 shadow-xl outline-none">
          <AlertDialog.Title className="text-base text-ink">
            Reset all Placed state?
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-sm text-muted leading-relaxed">
            This will reset the <strong className="text-ink">Placed</strong>{" "}
            checkboxes on every board, on both Core and UI passes:
            <br />
            <br />
            • SMD components → checked
            <br />
            • Everything else → unchecked
            <br />
            <br />
            Your current progress will be lost.
          </AlertDialog.Description>
          <div className="mt-5 flex justify-end gap-2">
            <AlertDialog.Cancel asChild>
              <button className="rounded border border-line bg-panel px-3 py-1 text-sm text-ink hover:bg-line-soft">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={onConfirm}
                className="rounded border border-accent bg-accent px-3 py-1 text-sm text-white hover:opacity-90"
              >
                Reset all
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
