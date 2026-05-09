import { SLOTS } from "../data/slots";
import { useAppStore } from "../store/useAppStore";
import type { Slot } from "../types";

const TOOLS = [
  { name: "Oscilloscope", note: "use AC coupling" },
  { name: "Precision screwdrivers for trimmers", note: "flathead and Philips" },
  {
    name: "Multimeter",
    note: "a calibrated one is ideal but generally the more precise, the better",
  },
  { name: "~5 patch cables" },
  { name: "Tuner" },
  { name: "Amp + speakers or audio interface", note: "for audio monitoring" },
];

type Section = { id: string; title: string; items: string[] };

const SECTIONS: Section[] = [
  {
    id: "brain",
    title: "1. Brain",
    items: [
      "Output 1 hardware gain",
      "Output 2 hardware gain",
      "Output 1 software calibration",
      "Output 2 software calibration",
      "Prepare Brain for calibrating other modules",
    ],
  },
  {
    id: "vco-1",
    title: "2. VCO 1",
    items: ["Saw wave balance", "Triangle wave shape", "1V/oct tuning"],
  },
  {
    id: "vco-2",
    title: "3. VCO 2",
    items: ["Saw wave shape", "Triangle wave shape", "1V/oct tuning"],
  },
  {
    id: "mixer",
    title: "4. Mixer & sidechain compressor",
    items: [
      "Mixer balance (0V reference)",
      "Mixer base level",
      "Side chain compressor attack",
      "Side chain compressor release",
    ],
  },
  {
    id: "vcf",
    title: "5. Filter",
    items: ["Max resonance", "Balance / recovery"],
  },
  {
    id: "vca-1",
    title: "6. Envelope / VCA 1",
    items: [
      "VCA balance (0V reference)",
      "VCA base gain",
      "Envelope gain",
    ],
  },
  {
    id: "vca-2",
    title: "7. Envelope / VCA 2",
    items: [
      "VCA balance (0V reference)",
      "VCA base gain",
      "Envelope gain",
    ],
  },
  {
    id: "utils",
    title: "8. Bitcrusher / LFO / Output",
    items: ["Line level"],
  },
];

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const itemKey = (sectionId: string, item: string) =>
  `${sectionId}/${slugify(item)}`;

export function CalibrationCenter() {
  const selectedSlot = useAppStore((s) => s.selectedSlot);
  const slot = SLOTS[selectedSlot];

  let body: React.ReactNode;
  switch (slot.slug) {
    case "brain":
      body = <BrainCalibration />;
      break;
    default:
      body = <PlaceholderBoard slot={slot} />;
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded border border-line bg-panel">
      <div className="flex h-[2.8rem] shrink-0 items-center border-b border-line-soft px-4 text-xs text-muted">
        <span className="text-ink">{slot.label}</span>
        <span className="ml-2">/ calibration</span>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-5">{body}</div>
    </div>
  );
}

function PlaceholderBoard({ slot }: { slot: Slot }) {
  return (
    <div className="flex h-full items-center justify-center text-sm text-muted">
      <p>
        Calibration steps for{" "}
        <span className="text-ink">{slot.label}</span> coming soon.
      </p>
    </div>
  );
}

// ----- Per-board calibration content ------------------------------------

function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="mb-3 text-xl text-ink">{children}</h1>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-sm leading-relaxed text-ink">{children}</p>
  );
}

function A({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-accent hover:underline"
    >
      {children}
    </a>
  );
}

function OL({ children }: { children: React.ReactNode }) {
  return (
    <ol
      className="mb-3 list-decimal space-y-1 text-sm leading-relaxed text-ink marker:text-muted"
      style={{ marginLeft: "3.7rem" }}
    >
      {children}
    </ol>
  );
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mb-3 ml-5 list-disc space-y-1 text-sm leading-relaxed text-ink marker:text-muted">
      {children}
    </ul>
  );
}

function StepCheckbox({ sectionId, label }: { sectionId: string; label: string }) {
  const k = itemKey(sectionId, label);
  const checked = useAppStore((s) => !!s.calibrationDone[k]);
  const toggle = useAppStore((s) => s.toggleCalibrationItem);
  return (
    <label className="my-1.5 flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 hover:bg-surface">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => toggle(k)}
        className="h-4 w-4 shrink-0 accent-done"
      />
      <span
        className={
          "text-sm font-semibold " +
          (checked ? "line-through text-muted" : "text-ink")
        }
      >
        {label}
      </span>
    </label>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 rounded border-l-2 border-line px-3 py-2 text-sm italic leading-relaxed text-muted">
      {children}
    </p>
  );
}

function BrainCalibration() {
  return (
    <article className="mx-auto max-w-2xl">
      <H1>Brain</H1>
      <P>
        We start with the Brain module because we'll use it to calibrate some
        of the other modules. You'll need the following firmwares so download
        them from the{" "}
        <A href="https://www.shmoergh.com/brain-firmwares/">
          Brain firmware library
        </A>
        :
      </P>
      <UL>
        <li>Brain Diagnostics</li>
        <li>CV Tuner</li>
        <li>Le Controlleur</li>
      </UL>

      <hr className="my-5 border-t border-line-soft" />
      <StepCheckbox sectionId="brain" label="Output 1 hardware gain" />
      <StepCheckbox sectionId="brain" label="Output 2 hardware gain" />
      <OL>
        <li>
          Load up the <strong>Brain Diagnostics</strong> firmware on the Brain
          module.
        </li>
        <li>
          Follow the{" "}
          <A href="https://github.com/shmoergh/brain-diagnostics/blob/main/README.md">
            instructions
          </A>{" "}
          of <strong>Test 14</strong> to set the hardware-trimmer gain.
        </li>
      </OL>

      <hr className="my-5 border-t border-line-soft" />
      <StepCheckbox sectionId="brain" label="Output 1 software calibration" />
      <StepCheckbox sectionId="brain" label="Output 2 software calibration" />
      <OL>
        <li>
          Load up the <strong>Brain CV tuner</strong> firmware.
        </li>
        <li>
          Follow the{" "}
          <A href="https://www.shmoergh.com/guides/cv-tuner/#how-to-calibrate">
            instructions
          </A>{" "}
          to fine-tune the CV output of the Brain module so it tracks
          perfectly for 1V/oct.
        </li>
      </OL>

      <Note>
        Make sure to calibrate both Audio/CV outputs of the Brain module. You
        don't need to calibrate the Pulse OUT.
      </Note>

      <hr className="my-5 border-t border-line-soft" />
      <StepCheckbox
        sectionId="brain"
        label="Prepare Brain for calibrating other modules"
      />
      <OL>
        <li>
          Load up <strong>Le Controlleur</strong> firmware (
          <A href="https://www.shmoergh.com/guides/le-controlleur/#overview">
            user guide
          </A>
          ).
        </li>
        <li>
          Connect a MIDI keyboard to MIDI IN using a TRS-A MIDI adaptor.
        </li>
        <li>
          Make sure
          <ol className="ml-5 mt-1 list-[lower-alpha] space-y-1">
            <li>you're in MIDI to CV converter mode,</li>
            <li>
              your MIDI channel is set to the same as on your MIDI controller,
            </li>
            <li>
              the <strong>Pitch CV Output</strong> channel is set to the
              output you'll use later on in the calibration process.
            </li>
          </ol>
        </li>
      </OL>
    </article>
  );
}

export function CalibrationSidebar() {
  const done = useAppStore((s) => s.calibrationDone);
  const toggle = useAppStore((s) => s.toggleCalibrationItem);
  const setSelectedSlot = useAppStore((s) => s.setSelectedSlot);

  // Section ids match slot slugs (brain, vco-1, vca-1, …) so we can flip the
  // centre view to that board's content with a quick lookup.
  const focusBoard = (sectionId: string) => {
    const slot = SLOTS.find((s) => s.slug === sectionId);
    if (slot) setSelectedSlot(slot.index);
  };

  const totalItems = SECTIONS.reduce((n, s) => n + s.items.length, 0);
  const doneCount = SECTIONS.reduce(
    (n, s) => n + s.items.filter((i) => done[itemKey(s.id, i)]).length,
    0
  );

  return (
    <div className="flex h-full flex-col overflow-hidden rounded border border-line bg-panel">
      <div className="flex h-[2.8rem] shrink-0 items-center justify-between gap-2 border-b border-line-soft px-3 text-xs text-muted">
        <span className="text-ink">Calibration</span>
        <span>
          {doneCount}/{totalItems}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-3 text-sm">
        <Section title="Tools">
          <ul className="space-y-1.5 text-sm leading-relaxed">
            {TOOLS.map((t) => (
              <li key={t.name} className="text-ink">
                <span>{t.name}</span>
                {t.note && (
                  <span className="text-muted"> — {t.note}</span>
                )}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Overview">
          <div className="space-y-4">
            {SECTIONS.map((s) => (
              <div key={s.id}>
                <div className="mb-1 text-xs uppercase tracking-wider text-muted">
                  {s.title}
                </div>
                <ul className="space-y-1">
                  {s.items.map((item) => {
                    const k = itemKey(s.id, item);
                    const checked = !!done[k];
                    return (
                      <li key={k}>
                        <label className="flex cursor-pointer select-none items-start gap-2 rounded px-1 py-0.5 hover:bg-surface">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => {
                              toggle(k);
                              focusBoard(s.id);
                            }}
                            className="mt-0.5 h-4 w-4 shrink-0 accent-done"
                          />
                          <span
                            className={
                              checked ? "line-through text-muted" : "text-ink"
                            }
                          >
                            {item}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-5">
      <h3 className="mb-2 text-[10px] uppercase tracking-wider text-muted">
        {title}
      </h3>
      {children}
    </section>
  );
}
