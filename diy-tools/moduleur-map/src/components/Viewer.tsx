import { useEffect, useMemo, useRef } from "react";
import boards from "../data/boards.json";
import { SLOTS } from "../data/slots";
import { aggregateForPass } from "../lib/aggregate";
import { useAppStore } from "../store/useAppStore";
import type { BoardsJson } from "../types";

export function Viewer() {
  const pass = useAppStore((s) => s.pass);
  const selectedSlot = useAppStore((s) => s.selectedSlot);
  const selectedKey = useAppStore((s) => s.selectedKey);
  const showSmd = useAppStore((s) => s.showSmd);
  const slot = SLOTS[selectedSlot];
  const src = `/iboms/${slot.slug}-${pass}.html`;
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const refs = useMemo(() => {
    if (!selectedKey) return [];
    const rows = aggregateForPass(boards as BoardsJson, SLOTS, pass);
    const row = rows.find((r) => r.key === selectedKey);
    return row?.perSlot.find((p) => p.slotIndex === selectedSlot)?.refs ?? [];
  }, [pass, selectedSlot, selectedKey]);

  const send = () => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    win.postMessage({ type: "bommap:setRefs", refs }, "*");
    win.postMessage({ type: "bommap:setShowSmd", showSmd }, "*");
  };

  useEffect(() => {
    send();
  }, [refs, showSmd]);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded border border-line bg-panel">
      <div className="flex h-[2.8rem] items-center justify-between border-b border-line-soft px-3 text-xs text-muted">
        <span>
          <span className="text-ink">{slot.label}</span>{" "}
          <span className="text-muted">/ {slot.module} / {pass}</span>
        </span>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="text-accent hover:underline"
        >
          open ↗
        </a>
      </div>
      <iframe
        key={src}
        ref={iframeRef}
        src={src}
        title={`${slot.label} ${pass}`}
        className="flex-1 w-full bg-white"
        onLoad={send}
      />
    </div>
  );
}
