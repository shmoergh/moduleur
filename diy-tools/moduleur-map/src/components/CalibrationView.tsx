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
    items: ["Saw wave balance", "Triangle wave shape", "1V/oct tuning"],
  },
  {
    id: "mixer",
    title: "4. Mixer & sidechain compressor",
    items: [
      "Mixer base gain",
      "Mixer balance",
      "Sidechain attack and release times",
    ],
  },
  {
    id: "vcf",
    title: "5. Filter",
    items: ["Max resonance", "Filter balance and recovery"],
  },
  {
    id: "vca-1",
    title: "6. Envelope / VCA 1",
    items: [
      "VCA balance",
      "VCA base gain",
      "Envelope gain",
    ],
  },
  {
    id: "vca-2",
    title: "7. Envelope / VCA 2",
    items: [
      "VCA balance",
      "VCA base gain",
      "Envelope gain",
    ],
  },
  {
    id: "utils",
    title: "8. Bitcrusher / LFO / Output",
    items: ["Output level"],
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
    case "vco-1":
      body = <VcoCalibration sectionId="vco-1" title="VCO 1" />;
      break;
    case "vco-2":
      body = <VcoCalibration sectionId="vco-2" title="VCO 2" />;
      break;
    case "mixer":
      body = <MixerCalibration />;
      break;
    case "vcf":
      body = <VcfCalibration />;
      break;
    case "vca-1":
      body = <VcaCalibration sectionId="vca-1" title="Envelope / VCA 1" />;
      break;
    case "vca-2":
      body = <VcaCalibration sectionId="vca-2" title="Envelope / VCA 2" />;
      break;
    case "utils":
      body = <UtilsCalibration />;
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

function VcoCalibration({
  sectionId,
  title,
}: {
  sectionId: string;
  title: string;
}) {
  return (
    <article className="mx-auto max-w-2xl">
      <H1>{title}</H1>

      <h2 className="mb-2 text-base text-ink">Calibration setup</h2>
      <UL>
        <li>Connect scope to VCO output</li>
      </UL>

      <hr className="my-5 border-t border-line-soft" />
      <StepCheckbox sectionId={sectionId} label="Saw wave balance" />
      <OL>
        <li>Switch VCO output to sawtooth.</li>
        <li>
          Use trimmer <code className="rounded bg-surface px-1">SAW BIAS</code>{" "}
          to move the saw wave on the Y axis (amplitude) until it oscillates
          around 0V.
        </li>
      </OL>

      <hr className="my-5 border-t border-line-soft" />
      <StepCheckbox sectionId={sectionId} label="Triangle wave shape" />
      <OL>
        <li>Switch VCO output to triangle.</li>
        <li>
          Use the <code className="rounded bg-surface px-1">TRI BIAS</code>{" "}
          trimmer to move the triangle to oscillate around 0V.
        </li>
        <li>
          Use the <code className="rounded bg-surface px-1">SAW BIAS</code>{" "}
          trimmer to fine tune the shape of the triangle (the triangle is
          built up of the saw output and an inverse of that, that's why
          changing the saw balance defines the shape of the triangle wave).
        </li>
      </OL>

      <hr className="my-5 border-t border-line-soft" />
      <StepCheckbox sectionId={sectionId} label="1V/oct tuning" />
      <OL>
        <li>Connect the VCO OUT to a tuner.</li>
        <li>
          Turn the OCTAVE (main tune) knob all the way down and the FINE
          knob in the middle.
        </li>
        <li>
          Connect a 1V/oct CV to the VCO PITCH input.
          <p className="mt-1">
            If you have calibrated the Brain module, use{" "}
            <A href="https://github.com/shmoergh/le-controlleur">
              Le Controlleur
            </A>{" "}
            firmware in MIDI mode and a MIDI keyboard, and connect OUT 1 to
            the VCO PITCH input. (Make sure you set the Pitch CV Output
            channel to OUT 1.)
          </p>
          <p className="mt-1">
            Alternatively you can use a keyboard with 1V/oct CV output like
            an Arturia Keystep, Beatstep Pro, Korg SQ1 or similar.
          </p>
        </li>
        <li>
          Turn <code className="rounded bg-surface px-1">HI-FREQ</code> pot
          all the way down: play a very high pitch note on the keyboard and
          turn the knob until the pitch stops going down.
        </li>
        <li>
          Play C1 on keyboard. Use the{" "}
          <code className="rounded bg-surface px-1">BIAS</code> trimmer to
          set the frequency to C1 (32.703 Hz).
        </li>
        <li>
          Play C4 and use the{" "}
          <code className="rounded bg-surface px-1">BIAS</code> trimmer to
          set the frequency to C4 (261.63 Hz).
        </li>
        <li>
          Play C1 and use the{" "}
          <code className="rounded bg-surface px-1">WIDTH</code> trimmer to
          tune it to 32.703 Hz.
        </li>
        <li>Loop steps 3 + 4.</li>
        <li>
          When C1 and C4 are in tune, play C7 and use the{" "}
          <code className="rounded bg-surface px-1">HI-FREQ</code> trimmer to
          make up the pitch for higher frequencies.
        </li>
        <li>
          Go back to step 3 &amp; 4 to adjust tuning for lower frequencies,
          then go to step 6 again, until you get to a reasonable end result.
        </li>
      </OL>
    </article>
  );
}

function MixerCalibration() {
  return (
    <article className="mx-auto max-w-2xl">
      <H1>Mixer & sidechain compressor</H1>

      <h2 className="mb-2 text-base text-ink">Calibration setup</h2>
      <UL>
        <li>Connect VCO 1 out to IN 1</li>
        <li>Connect VCO 2 out to IN 2</li>
        <li>Connect VCO 1 sub to IN 3</li>
        <li>
          Connect an external sound source (ideally a drum machine) to IN 4
        </li>
        <li>Connect Mixer out to an oscilloscope</li>
      </UL>

      <hr className="my-5 border-t border-line-soft" />
      <StepCheckbox sectionId="mixer" label="Mixer base gain" />
      <P>
        The mixer goes through a VCA which is used for the side chain
        compressor. This step sets the base gain for the VCA so that there's
        no bleed.
      </P>
      <OL>
        <li>Turn IN 1, IN 2, IN 3 all the way up.</li>
        <li>Turn output level all the way up.</li>
        <li>
          Use the <code className="rounded bg-surface px-1">BIAS</code>{" "}
          trimmer to set the output so that the maximum amplitude is not
          more than 10 Vpp (+/- 5 V) — from experience, this is pretty good
          for side chain compression.
        </li>
      </OL>

      <hr className="my-5 border-t border-line-soft" />
      <StepCheckbox sectionId="mixer" label="Mixer balance" />
      <OL>
        <li>Turn all input levels all the way down.</li>
        <li>
          Turn output level all the way up → the output is a fix DC voltage
          (no input waves should appear on the output).
        </li>
        <li>
          Use the <code className="rounded bg-surface px-1">COMP</code>{" "}
          trimmer to set the output (a DC signal) to 0 V — this makes sure
          the mixer output will oscillate around 0 V.
        </li>
      </OL>

      <hr className="my-5 border-t border-line-soft" />
      <StepCheckbox
        sectionId="mixer"
        label="Sidechain attack and release times"
      />
      <OL>
        <li>Turn IN 4 GAIN all the way down.</li>
        <li>Turn IN 4 THRESHOLD all the way up.</li>
        <li>
          Turn Mixer OUT all the way down —{" "}
          <strong>IMPORTANT:</strong> the output of the Mixer is now at
          10 Vpp. Connecting it to a speaker system that expects line level
          may damage it so be careful with the output level knob.
        </li>
        <li>Connect Mixer output to a speaker or audio interface.</li>
        <li>
          VERY SLOWLY turn up the OUT LEVEL of the Mixer to a point where
          the input is not overdriven on your speaker/interface.
        </li>
        <li>
          Press play on your external sound source (drum machine) — a good
          old 4-on-the-floor with a punchy kick will do it.
        </li>
        <li>
          Turn IN 4 all the way up → you should hear the drum machine on
          the mixer output.
        </li>
        <li>You can turn up the GAIN to add more gain to IN 4.</li>
        <li>
          Turn the THRESHOLD pot down (setting the side chain compressor
          threshold level).
        </li>
        <li>
          Use trimmer <code className="rounded bg-surface px-1">ATTACK</code>{" "}
          to set the attack time of the side chain compressor.
        </li>
        <li>
          Use trimmer{" "}
          <code className="rounded bg-surface px-1">RELEASE</code> to set
          the release time of the side chain compressor.
        </li>
        <li>
          If you want more compression you can turn the overall Mixer base
          gain down a little, which will give more space for compression
          (but less overall mixer output).
        </li>
      </OL>
    </article>
  );
}

function VcfCalibration() {
  return (
    <article className="mx-auto max-w-2xl">
      <H1>Filter</H1>

      <h2 className="mb-2 text-base text-ink">Calibration setup</h2>
      <OL>
        <li>Connect a saw output to LP IN of the filter.</li>
        <li>Connect the filter output to an oscilloscope.</li>
      </OL>

      <hr className="my-5 border-t border-line-soft" />
      <StepCheckbox sectionId="vcf" label="Max resonance" />
      <P>
        The resonance of the diode filter in the Moduleur is quite sensitive
        in the higher ranges. It can easily choke, so we added a trimmer to
        keep it usable.
      </P>
      <OL>
        <li>Turn RESO to minimum.</li>
        <li>
          Turn CUTOFF to a position where you can see the low pass take
          effect (smoothens the spikes of the sawtooth wave).
        </li>
        <li>
          Turn RESO to maximum — it's likely that it's going to go to
          self-oscillation, that's fine.
        </li>
        <li>
          Use the <code className="rounded bg-surface px-1">MAX RESO</code>{" "}
          trimmer to set the maximum resonance to your liking. Turn it to a
          point so it does not choke (when it does, there's a supersonic
          wave on the output with maximum amplitude). It's better to listen
          to the output on a speaker / audio interface to calibrate to how
          it sounds, instead of how it looks on the oscilloscope.
        </li>
      </OL>

      <hr className="my-5 border-t border-line-soft" />
      <StepCheckbox sectionId="vcf" label="Filter balance and recovery" />
      <OL>
        <li>
          Turn the cutoff pot up and down fast and look at the oscilloscope.
          Watch for how much time it takes the waveform to settle to
          oscillate around 0 V (recovery time).
        </li>
        <li>
          Use the <code className="rounded bg-surface px-1">BALANCE</code>{" "}
          trimmer to set the recovery time to the minimum — ideally you
          shouldn't see the whole wave move up and down in amplitude, just a
          steady sawtooth.
        </li>
      </OL>
    </article>
  );
}

function VcaCalibration({
  sectionId,
  title,
}: {
  sectionId: string;
  title: string;
}) {
  return (
    <article className="mx-auto max-w-2xl">
      <H1>{title}</H1>

      <h2 className="mb-2 text-base text-ink">Calibration setup</h2>
      <UL>
        <li>Connect your MIDI keyboard to the Brain.</li>
        <li>Use Brain's Le Controlleur firmware in MIDI to CV mode.</li>
        <li>
          Connect the Brain / PULSE OUT output to the Envelope's GATE input.
        </li>
        <li>
          Connect one of the VCO's triangle wave from one of your
          oscillators to VCA IN.
        </li>
        <li>Connect an oscilloscope to VCA OUT.</li>
      </UL>

      <hr className="my-5 border-t border-line-soft" />
      <StepCheckbox sectionId={sectionId} label="VCA balance" />
      <OL>
        <li>
          Use the <code className="rounded bg-surface px-1">VCA COMP</code>{" "}
          trimmer to set the VCA OUT to 0 V (check it on scope).
        </li>
      </OL>

      <hr className="my-5 border-t border-line-soft" />
      <StepCheckbox sectionId={sectionId} label="VCA base gain" />
      <OL>
        <li>
          Use the <code className="rounded bg-surface px-1">VCA BIAS</code>{" "}
          trimmer to set the VCA gain so that on the VCA OUTPUT you just
          don't see the input signal appear. This sets the 0 V baseline for
          the VCA.
        </li>
      </OL>

      <hr className="my-5 border-t border-line-soft" />
      <StepCheckbox sectionId={sectionId} label="Envelope gain" />
      <OL>
        <li>Connect Envelope ENVELOPE output to VCA CONTROL input.</li>
        <li>
          Hold a note on the MIDI keyboard so a gate triggers the Envelope.
        </li>
        <li>Set ATTACK, DECAY and RELEASE to minimum.</li>
        <li>Set SUSTAIN to maximum.</li>
        <li>
          Hold a note on the MIDI keyboard. You should see the VCO triangle
          appear on the scope.
        </li>
        <li>
          Use the <code className="rounded bg-surface px-1">ENV GAIN</code>{" "}
          trimmer to set the VCA OUT to 10 Vpp (+/- 5 V) — same level as the
          VCO triangle signal. This makes sure that the Envelope is
          calibrated so that at max level the signal passes through with
          uniform level.
        </li>
      </OL>
    </article>
  );
}

function UtilsCalibration() {
  return (
    <article className="mx-auto max-w-2xl">
      <H1>Bitcrusher / LFO / Output</H1>

      <h2 className="mb-2 text-base text-ink">Calibration setup</h2>
      <UL>
        <li>
          Connect the VCO's triangle output to MAIN IN of the output module.
        </li>
        <li>Connect scope to the HEADPHONES of the output module.</li>
      </UL>

      <hr className="my-5 border-t border-line-soft" />
      <StepCheckbox sectionId="utils" label="Output level" />
      <OL>
        <li>
          Use the{" "}
          <code className="rounded bg-surface px-1">LINE LEVEL</code>{" "}
          trimmer to set the output to about ~3 Vpp (about{" "}
          <A href="https://en.wikipedia.org/wiki/Line_level">line level</A>).
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
