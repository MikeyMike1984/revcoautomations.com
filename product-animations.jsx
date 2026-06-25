
// REVCO — Product Flow Animations
// Five animated explainer videos, one per product

// ─── Shared primitives ────────────────────────────────────────────────

const C = {
  navy950: '#0a0f1e', navy900: '#0f1729', navy800: '#152035',
  navy700: '#1a2744', navy600: '#1e3358', navy500: '#24406e',
  blue600: '#1557c0', blue500: '#1d6cd8', blue400: '#2d82f0',
  blue300: '#4e9af5', blue200: '#80bbf9', blue100: '#cce2fd',
  teal500: '#12a09c', teal400: '#18bfbb', teal300: '#40d4d0',
  gray50: '#f4f6f9', gray100: '#e4e8ef', gray200: '#c5ccd8',
  gray300: '#99a3b5', gray400: '#717a8e', gray500: '#515868',
  gray700: '#272b35', gray800: '#1c1f26', white: '#ffffff',
  green: '#2ea866', greenBg: 'rgba(26,122,74,0.15)', greenText: '#40d4a0',
  amber: '#d4880a', amberBg: 'rgba(138,90,0,0.15)', amberText: '#f0b940',
  purple: '#9b45c8', purpleBg: 'rgba(107,47,138,0.18)', purpleText: '#c580f0',
  red: '#e03030', redBg: 'rgba(181,28,28,0.15)',
};

const mono = "'IBM Plex Mono', monospace";
const sans = "'Inter', -apple-system, sans-serif";

function lerp(a, b, t) { return a + (b - a) * t; }
function clamp01(t) { return Math.max(0, Math.min(1, t)); }
function ease(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }
function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
function easeIn(t) { return t * t * t; }

function fadeT(time, start, dur) {
  return clamp01(ease(clamp01((time - start) / dur)));
}
function slideUp(time, start, dur) {
  const t = easeOut(clamp01((time - start) / dur));
  return { opacity: t, transform: `translateY(${lerp(18, 0, t)}px)` };
}

// Dark background card
function DarkCard({ children, style }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.10)',
      borderRadius: 10,
      ...style
    }}>{children}</div>
  );
}

// Light card (white bg)
function LightCard({ children, style }) {
  return (
    <div style={{
      background: C.white,
      border: `1px solid ${C.gray100}`,
      borderRadius: 8,
      boxShadow: '0 1px 4px rgba(10,15,30,0.07)',
      ...style
    }}>{children}</div>
  );
}

function Badge({ children, color, bg }) {
  return (
    <span style={{
      display: 'inline-block',
      background: bg,
      color: color,
      fontSize: 10,
      fontWeight: 700,
      fontFamily: sans,
      padding: '2px 8px',
      borderRadius: 3,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
    }}>{children}</span>
  );
}

function MonoText({ children, color = C.blue300, size = 11 }) {
  return <span style={{ fontFamily: mono, fontSize: size, color, letterSpacing: '0.04em' }}>{children}</span>;
}

// Label eyebrow
function Eyebrow({ children, color = C.blue300 }) {
  return (
    <div style={{
      fontFamily: sans, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
      textTransform: 'uppercase', color, marginBottom: 8,
    }}>{children}</div>
  );
}

// Step connector arrow
function StepArrow({ visible, color = C.blue400 }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: visible ? 1 : 0, transition: 'opacity 0.3s',
      color, fontSize: 18,
    }}>›</div>
  );
}

// Animated checkmark that draws itself
function CheckMark({ visible, size = 16, color = C.greenText }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none"
      style={{ flexShrink: 0, opacity: visible ? 1 : 0, transition: 'opacity 0.25s' }}>
      <circle cx="8" cy="8" r="7" stroke={color} strokeWidth="1.5" fill="rgba(26,122,74,0.15)" />
      <path d="M5 8.5l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Progress bar
function ProgressBar({ pct, color = C.blue500, bg = 'rgba(255,255,255,0.08)' }) {
  return (
    <div style={{ height: 4, borderRadius: 2, background: bg, overflow: 'hidden' }}>
      <div style={{
        height: '100%', borderRadius: 2, background: color,
        width: `${pct}%`, transition: 'width 0.1s linear',
      }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATION 1: LexiDraft — Discovery Production
// Story: Chaotic uploads → AI classifies → Attorney reviews → Clean production packet
// ═══════════════════════════════════════════════════════════════════════════════

function LexiDraftAnimation() {
  const { useTime, Sprite, Stage, interpolate, Easing } = window;
  const t = useTime();
  const DURATION = 22;

  // Scene 1: 0–5s — Chaotic uploads arriving
  // Scene 2: 5–11s — AI classification in progress
  // Scene 3: 11–16s — Attorney privilege review
  // Scene 4: 16–22s — Final production packet

  const docs = [
    { name: 'Bank_Statement_Jan.pdf',        cat: 'Financial Records',     conf: 97, bates: 'SMITH_0001', status: 'produced' },
    { name: 'Tax_Return_2024.pdf',           cat: 'Financial Records',     conf: 94, bates: 'SMITH_0002', status: 'produced' },
    { name: 'Email_Thread_Mar2025.pdf',      cat: 'Communications',        conf: 81, bates: 'SMITH_0003', status: 'review' },
    { name: 'Paycheck_Stub_Q1.pdf',          cat: 'Employment Records',    conf: 96, bates: 'SMITH_0004', status: 'produced' },
    { name: 'Attorney_Notes_Privileged.pdf', cat: 'Privileged — Withheld', conf: 99, bates: '—',          status: 'privilege' },
    { name: 'Property_Appraisal_2025.pdf',   cat: 'Real Property',         conf: 91, bates: 'SMITH_0005', status: 'produced' },
  ];

  const statusColor = { produced: C.greenText, review: C.amberText, privilege: C.purpleText };
  const statusBg    = { produced: C.greenBg, review: C.amberBg, privilege: C.purpleBg };
  const statusLabel = { produced: 'Produced', review: 'Review', privilege: 'Privilege' };

  // Upload animation
  const uploadFiles = ['chaos_emails.zip', 'scans_mixed.pdf', 'photos_20imgs.zip', 'bank_stmts.pdf', 'misc_docs.docx'];

  return (
    <Stage width={900} height={540} duration={DURATION} background={C.navy900}>
      {/* ── SCENE 1: Upload chaos (0–5s) ── */}
      <Sprite start={0} end={5.5}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
          <div style={{ ...slideUp(t, 0.2, 0.6), textAlign: 'center', marginBottom: 32 }}>
            <Eyebrow>Step 1 — Client Upload</Eyebrow>
            <div style={{ fontFamily: sans, fontSize: 28, fontWeight: 700, color: C.white, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Documents arrive in any order,<br />any format.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 560 }}>
            {uploadFiles.map((f, i) => (
              <div key={f} style={{
                ...slideUp(t, 0.4 + i * 0.25, 0.5),
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 6, padding: '8px 14px',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.gray300} strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <span style={{ fontFamily: mono, fontSize: 11, color: C.gray300 }}>{f}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, ...slideUp(t, 1.8, 0.5) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: C.gray400, fontSize: 13, fontFamily: sans }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
              </svg>
              <span>47 documents — 14 file types — uploaded via secure link</span>
            </div>
          </div>
        </div>
      </Sprite>

      {/* ── SCENE 2: AI Classification (5–11s) ── */}
      <Sprite start={5} end={11.5}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', gap: 0 }}>
          {/* Left panel — incoming docs */}
          <div style={{ width: 260, padding: '32px 20px', borderRight: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ ...slideUp(t, 5.1, 0.5) }}>
              <Eyebrow>Documents</Eyebrow>
            </div>
            {docs.map((d, i) => {
              const rowT = fadeT(t, 5.3 + i * 0.35, 0.45);
              return (
                <div key={d.name} style={{
                  opacity: rowT,
                  transform: `translateX(${lerp(-12, 0, easeOut(rowT))}px)`,
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 6, padding: '7px 10px',
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.gray400} strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  <span style={{ fontFamily: mono, fontSize: 9.5, color: C.gray300, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</span>
                </div>
              );
            })}
          </div>
          {/* Right panel — classification results */}
          <div style={{ flex: 1, padding: '32px 24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ ...slideUp(t, 5.2, 0.5), marginBottom: 16 }}>
              <Eyebrow>Step 2 — AI Classification</Eyebrow>
              <div style={{ fontFamily: sans, fontSize: 20, fontWeight: 700, color: C.white, lineHeight: 1.25, letterSpacing: '-0.01em' }}>
                Each document mapped to your RFP categories.
              </div>
            </div>
            {/* Classification rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {docs.map((d, i) => {
                const rowT = fadeT(t, 5.8 + i * 0.4, 0.4);
                const confColor = d.conf >= 90 ? C.greenText : C.amberText;
                return (
                  <div key={d.name} style={{
                    opacity: rowT,
                    transform: `translateY(${lerp(10, 0, easeOut(rowT))}px)`,
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 6, padding: '8px 12px',
                  }}>
                    <span style={{ fontFamily: mono, fontSize: 9, color: C.gray500, width: 130, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flexShrink: 0 }}>{d.name}</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.blue400} strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                    <span style={{ fontFamily: sans, fontSize: 11, color: C.gray200, flex: 1 }}>{d.cat}</span>
                    <span style={{ fontFamily: mono, fontSize: 10, color: confColor, width: 30, textAlign: 'right', flexShrink: 0 }}>{d.conf}%</span>
                    <Badge color={statusColor[d.status]} bg={statusBg[d.status]}>{statusLabel[d.status]}</Badge>
                  </div>
                );
              })}
            </div>
            {/* Processing indicator */}
            <div style={{ marginTop: 'auto', ...slideUp(t, 7.5, 0.5) }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontFamily: sans, fontSize: 11, color: C.gray400 }}>
                <span>Classification progress</span>
                <MonoText>{Math.min(100, Math.round((t - 5.5) / 5 * 100))}%</MonoText>
              </div>
              <ProgressBar pct={Math.min(100, Math.round((t - 5.5) / 5 * 100))} />
            </div>
          </div>
        </div>
      </Sprite>

      {/* ── SCENE 3: Privilege Review (11–16s) ── */}
      <Sprite start={11} end={16.5}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: '32px 40px' }}>
          <div style={{ ...slideUp(t, 11.1, 0.5), marginBottom: 20 }}>
            <Eyebrow color={C.purpleText}>Step 3 — Attorney Privilege Review</Eyebrow>
            <div style={{ fontFamily: sans, fontSize: 20, fontWeight: 700, color: C.white, letterSpacing: '-0.01em' }}>
              Attorney sign-off required before production.
            </div>
          </div>
          {/* Privilege queue */}
          <div style={{ display: 'flex', gap: 16, flex: 1 }}>
            {/* Left: flagged items */}
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: sans, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.gray500, marginBottom: 10 }}>Privilege Queue</div>
              {[
                { name: 'Attorney_Notes_Privileged.pdf', flag: 'Attorney-client comm.', decision: 'withheld' },
                { name: 'Email_Thread_Mar2025.pdf', flag: 'Possible work product', decision: 'review' },
              ].map((item, i) => {
                const show = fadeT(t, 11.4 + i * 0.5, 0.4);
                const decided = t > 13.5 + i * 0.7;
                return (
                  <div key={item.name} style={{
                    opacity: show,
                    border: `1px solid ${decided ? (item.decision === 'withheld' ? 'rgba(107,47,138,0.4)' : 'rgba(26,122,74,0.4)') : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: 8, padding: '14px 16px', marginBottom: 8,
                    background: decided ? (item.decision === 'withheld' ? 'rgba(107,47,138,0.08)' : 'rgba(26,122,74,0.06)') : 'rgba(255,255,255,0.03)',
                    transition: 'all 0.4s',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={decided && item.decision === 'withheld' ? C.purpleText : C.amberText} strokeWidth="1.5" style={{ flexShrink: 0, marginTop: 1 }}>
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                      <div>
                        <div style={{ fontFamily: mono, fontSize: 10, color: C.gray300, marginBottom: 3 }}>{item.name}</div>
                        <div style={{ fontFamily: sans, fontSize: 11, color: C.gray400 }}>Flag: {item.flag}</div>
                      </div>
                      {decided && (
                        <Badge
                          color={item.decision === 'withheld' ? C.purpleText : C.greenText}
                          bg={item.decision === 'withheld' ? C.purpleBg : C.greenBg}
                        >{item.decision === 'withheld' ? 'Withheld' : 'Produced'}</Badge>
                      )}
                    </div>
                    {!decided && (
                      <div style={{ display: 'flex', gap: 8 }}>
                        <div style={{ flex: 1, padding: '6px', textAlign: 'center', borderRadius: 4, border: '1px solid rgba(107,47,138,0.4)', background: 'rgba(107,47,138,0.1)', fontFamily: sans, fontSize: 10, fontWeight: 600, color: C.purpleText, cursor: 'pointer' }}>Withhold</div>
                        <div style={{ flex: 1, padding: '6px', textAlign: 'center', borderRadius: 4, border: '1px solid rgba(26,122,74,0.4)', background: 'rgba(26,122,74,0.1)', fontFamily: sans, fontSize: 10, fontWeight: 600, color: C.greenText, cursor: 'pointer' }}>Produce</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {/* Right: attorney approval gate */}
            <div style={{ width: 220 }}>
              <div style={{ fontFamily: sans, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.gray500, marginBottom: 10 }}>Production Gate</div>
              <DarkCard style={{ padding: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: '44 documents', sub: 'Approved for production', done: true },
                    { label: '1 document', sub: 'Withheld — privilege', done: t > 13.5 },
                    { label: '1 document', sub: 'Produced after review', done: t > 14.2 },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <CheckMark visible={item.done} size={14} color={i === 1 ? C.purpleText : C.greenText} />
                      <div>
                        <div style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: C.white }}>{item.label}</div>
                        <div style={{ fontFamily: sans, fontSize: 10, color: C.gray400 }}>{item.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontFamily: mono, fontSize: 9, color: C.gray500, marginBottom: 4 }}>BATES RANGE</div>
                  <MonoText color={C.blue300} size={12}>SMITH_0001–SMITH_0045</MonoText>
                </div>
              </DarkCard>
            </div>
          </div>
        </div>
      </Sprite>

      {/* ── SCENE 4: Final Package (16–22s) ── */}
      <Sprite start={16} end={DURATION}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 40px' }}>
          <div style={{ ...slideUp(t, 16.2, 0.6), textAlign: 'center', marginBottom: 28 }}>
            <Eyebrow color={C.greenText}>Step 4 — Production Package</Eyebrow>
            <div style={{ fontFamily: sans, fontSize: 26, fontWeight: 700, color: C.white, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Court-ready. Bates-stamped. Reviewed.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 14, width: '100%', maxWidth: 720 }}>
            {[
              { icon: '📄', label: 'Bates-Stamped Documents', detail: 'SMITH_0001–SMITH_0045', color: C.blue300, delay: 16.4 },
              { icon: '📋', label: 'Production Index', detail: '45 entries, organized by RFP', color: C.teal400, delay: 16.7 },
              { icon: '🛡', label: 'Privilege Log', detail: '1 entry — attorney withheld', color: C.purpleText, delay: 17.0 },
              { icon: '📝', label: 'Draft Response to RFP', detail: 'Ready for attorney edits', color: C.amberText, delay: 17.3 },
            ].map((item, i) => {
              const cardT = fadeT(t, item.delay, 0.5);
              return (
                <div key={item.label} style={{
                  flex: 1,
                  opacity: cardT,
                  transform: `translateY(${lerp(16, 0, easeOut(cardT))}px)`,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10, padding: '18px 14px',
                  display: 'flex', flexDirection: 'column', gap: 8,
                }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="1.5">
                      {i === 0 && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>}
                      {i === 1 && <><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/><path d="M9 12h6M9 16h4"/></>}
                      {i === 2 && <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>}
                      {i === 3 && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></>}
                    </svg>
                  </div>
                  <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: C.white }}>{item.label}</div>
                  <div style={{ fontFamily: mono, fontSize: 10, color: item.color }}>{item.detail}</div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 24, ...slideUp(t, 17.8, 0.5) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '12px 24px', background: 'rgba(26,122,74,0.1)', border: '1px solid rgba(26,122,74,0.25)', borderRadius: 8 }}>
              <CheckMark visible={true} size={18} color={C.greenText} />
              <div style={{ fontFamily: sans, fontSize: 13, color: C.white, fontWeight: 600 }}>Production complete — attorney-approved</div>
              <MonoText color={C.gray500} size={10}>SMITH_0001–SMITH_0045</MonoText>
            </div>
          </div>
        </div>
      </Sprite>

      {/* Scene labels */}
      <div style={{ position: 'absolute', bottom: 16, left: 24, fontFamily: mono, fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {t < 5 ? 'Scene 1 — Client Upload' : t < 11 ? 'Scene 2 — AI Classification' : t < 16 ? 'Scene 3 — Privilege Review' : 'Scene 4 — Production Package'}
      </div>
    </Stage>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATION 2: AI Revenue Recovery
// Story: Aging invoice → automated follow-up sequence → payment link → collected
// ═══════════════════════════════════════════════════════════════════════════════

function RevenueRecoveryAnimation() {
  const { useTime, Sprite, Stage } = window;
  const t = useTime();
  const DURATION = 20;

  const invoices = [
    { client: 'Martinez, D.', matter: 'Martinez Dissolution', amount: '$4,250', age: '67 days', status: 'overdue' },
    { client: 'Chen, R.',     matter: 'Chen Custody Mod.',   amount: '$1,875', age: '45 days', status: 'overdue' },
    { client: 'Patel, S.',    matter: 'Patel Property Div.', amount: '$6,100', age: '31 days', status: 'overdue' },
  ];

  const messages = [
    { day: 'Day 1',  type: 'email', subject: 'Invoice Reminder — Martinez Dissolution', preview: 'A balance of $4,250 remains outstanding on your account. A payment link is included below for your convenience.', time: '9:02 AM' },
    { day: 'Day 7',  type: 'text',  subject: 'SMS Follow-up sent', preview: 'Hi David, this is a reminder from [Firm]. Your invoice of $4,250 is past due. Pay securely: [link]', time: '10:15 AM' },
    { day: 'Day 14', type: 'email', subject: 'Second Notice — Action Required', preview: 'Your account balance remains unpaid. Please contact the office or use the secure payment link to resolve the balance.', time: '9:00 AM' },
  ];

  return (
    <Stage width={900} height={540} duration={DURATION} background={C.navy900}>

      {/* ── SCENE 1: AR Dashboard showing overdue (0–6s) ── */}
      <Sprite start={0} end={6.5}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: '32px 36px' }}>
          <div style={{ ...slideUp(t, 0.2, 0.5), marginBottom: 20 }}>
            <Eyebrow color={C.blue300}>AI Revenue Recovery</Eyebrow>
            <div style={{ fontFamily: sans, fontSize: 22, fontWeight: 700, color: C.white, letterSpacing: '-0.01em' }}>
              Outstanding receivables — 3 matters
            </div>
          </div>
          {/* Stat row */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            {[
              { label: 'Total Outstanding', val: '$12,225', color: C.amberText },
              { label: 'Avg. Days Overdue', val: '47 days', color: C.red },
              { label: 'Matters Affected', val: '3', color: C.white },
            ].map((s, i) => (
              <div key={s.label} style={{
                ...slideUp(t, 0.4 + i * 0.2, 0.4),
                flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '14px 16px',
              }}>
                <div style={{ fontFamily: sans, fontSize: 10, color: C.gray400, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontFamily: sans, fontSize: 22, fontWeight: 700, color: s.color }}>{s.val}</div>
              </div>
            ))}
          </div>
          {/* Invoice table */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 90px 80px 90px', gap: '0 12px', padding: '0 12px 8px', marginBottom: 4 }}>
              {['Client', 'Matter', 'Amount', 'Age', 'Status'].map(h => (
                <div key={h} style={{ fontFamily: sans, fontSize: 10, fontWeight: 600, color: C.gray500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</div>
              ))}
            </div>
            {invoices.map((inv, i) => (
              <div key={inv.client} style={{
                ...slideUp(t, 0.8 + i * 0.3, 0.4),
                display: 'grid', gridTemplateColumns: '1fr 1fr 90px 80px 90px', gap: '0 12px',
                padding: '12px', borderRadius: 6, marginBottom: 4,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                alignItems: 'center',
              }}>
                <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: C.white }}>{inv.client}</div>
                <div style={{ fontFamily: sans, fontSize: 12, color: C.gray300 }}>{inv.matter}</div>
                <div style={{ fontFamily: mono, fontSize: 12, color: C.white }}>{inv.amount}</div>
                <div style={{ fontFamily: mono, fontSize: 11, color: C.red }}>{inv.age}</div>
                <Badge color={C.amberText} bg={C.amberBg}>Overdue</Badge>
              </div>
            ))}
          </div>
        </div>
      </Sprite>

      {/* ── SCENE 2: Automated outreach sequence (6–13s) ── */}
      <Sprite start={6} end={13.5}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', gap: 0 }}>
          {/* Left: sequence timeline */}
          <div style={{ width: 240, padding: '32px 20px', borderRight: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ ...slideUp(t, 6.1, 0.4), marginBottom: 16 }}>
              <Eyebrow color={C.blue300}>Automated Sequence</Eyebrow>
              <div style={{ fontFamily: sans, fontSize: 13, color: C.gray300, lineHeight: 1.5 }}>Martinez, D. — $4,250<br/>Triggered on 30-day mark</div>
            </div>
            {messages.map((msg, i) => {
              const show = fadeT(t, 6.5 + i * 1.2, 0.4);
              const active = t > 6.5 + i * 1.2 && t < 6.5 + (i + 1) * 1.2;
              return (
                <div key={msg.day} style={{ opacity: show, marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: active ? C.blue400 : C.gray600, flexShrink: 0, transition: 'background 0.3s' }} />
                    <span style={{ fontFamily: mono, fontSize: 10, color: active ? C.blue300 : C.gray500 }}>{msg.day}</span>
                    <span style={{ fontFamily: sans, fontSize: 10, color: C.gray500 }}>{msg.type === 'email' ? 'Email' : 'SMS'}</span>
                  </div>
                  {i < 2 && <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.08)', marginLeft: 3, marginBottom: 4 }} />}
                </div>
              );
            })}
            <div style={{ ...slideUp(t, 10, 0.4), marginTop: 8 }}>
              <div style={{ fontFamily: sans, fontSize: 11, color: C.gray500, lineHeight: 1.5 }}>All messages reviewed and approved by attorney before sending.</div>
            </div>
          </div>
          {/* Right: message preview */}
          <div style={{ flex: 1, padding: '32px 28px' }}>
            <div style={{ ...slideUp(t, 6.2, 0.4), marginBottom: 16 }}>
              <Eyebrow>Step 2 — Compliant Follow-up</Eyebrow>
              <div style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: C.white, letterSpacing: '-0.01em' }}>Each message includes a secure payment link.</div>
            </div>
            {messages.map((msg, i) => {
              const show = fadeT(t, 6.8 + i * 1.2, 0.5);
              return (
                <div key={msg.day} style={{
                  opacity: show,
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8,
                  padding: '14px 16px', marginBottom: 10,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: C.white }}>{msg.subject}</div>
                    <span style={{ fontFamily: mono, fontSize: 9, color: C.gray500 }}>{msg.time}</span>
                  </div>
                  <div style={{ fontFamily: sans, fontSize: 11, color: C.gray400, lineHeight: 1.55 }}>{msg.preview}</div>
                  <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', background: 'rgba(29,108,216,0.15)', border: '1px solid rgba(29,108,216,0.25)', borderRadius: 4 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.blue300} strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <span style={{ fontFamily: mono, fontSize: 9, color: C.blue300 }}>Secure payment link</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Sprite>

      {/* ── SCENE 3: Payment received (13–20s) ── */}
      <Sprite start={13} end={DURATION}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 48px' }}>
          <div style={{ ...slideUp(t, 13.2, 0.5), textAlign: 'center', marginBottom: 28 }}>
            <Eyebrow color={C.greenText}>Result — Payment Collected</Eyebrow>
            <div style={{ fontFamily: sans, fontSize: 24, fontWeight: 700, color: C.white, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              $4,250 collected. No collection calls.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, width: '100%', maxWidth: 640 }}>
            {[
              { label: 'Payment received', val: '$4,250.00', detail: 'Martinez, D.', color: C.greenText, delay: 13.5 },
              { label: 'Days to collect', val: '9 days', detail: 'vs. 47-day avg', color: C.blue300, delay: 13.8 },
              { label: 'Staff time spent', val: '0 calls', detail: 'Fully automated', color: C.teal400, delay: 14.1 },
            ].map((item, i) => {
              const cardT = fadeT(t, item.delay, 0.5);
              return (
                <div key={item.label} style={{
                  flex: 1, opacity: cardT, transform: `translateY(${lerp(14, 0, easeOut(cardT))}px)`,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '20px 18px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontFamily: sans, fontSize: 10, color: C.gray400, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>{item.label}</div>
                  <div style={{ fontFamily: sans, fontSize: 26, fontWeight: 700, color: item.color, letterSpacing: '-0.02em', marginBottom: 4 }}>{item.val}</div>
                  <div style={{ fontFamily: sans, fontSize: 11, color: C.gray500 }}>{item.detail}</div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 20, ...slideUp(t, 15, 0.5), width: '100%', maxWidth: 640 }}>
            <div style={{ background: 'rgba(26,122,74,0.08)', border: '1px solid rgba(26,122,74,0.2)', borderRadius: 8, padding: '14px 20px', display: 'flex', gap: 16 }}>
              <CheckMark visible size={18} color={C.greenText} />
              <div>
                <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: C.white }}>Remaining 2 matters — sequences active</div>
                <div style={{ fontFamily: sans, fontSize: 11, color: C.gray400, marginTop: 2 }}>Chen, R. and Patel, S. follow-up messages scheduled. No staff action required.</div>
              </div>
            </div>
          </div>
        </div>
      </Sprite>

      <div style={{ position: 'absolute', bottom: 16, left: 24, fontFamily: mono, fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {t < 6 ? 'AR Dashboard — Overdue Matters' : t < 13 ? 'Automated Follow-up Sequence' : 'Payment Collected'}
      </div>
    </Stage>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATION 3: AI Intake System
// Story: Prospect calls at 10pm → bot captures → structured lead in attorney inbox
// ═══════════════════════════════════════════════════════════════════════════════

function IntakeSystemAnimation() {
  const { useTime, Sprite, Stage } = window;
  const t = useTime();
  const DURATION = 20;

  const conversation = [
    { from: 'bot', text: 'Thank you for reaching out. I can help get your information to the right attorney. Are you seeking representation for yourself?', time: '10:07 PM' },
    { from: 'user', text: 'Yes, it\'s about a divorce. We have two kids.', time: '10:08 PM' },
    { from: 'bot', text: 'Understood. To help us prepare for your consultation, could you share your spouse\'s approximate income and whether you have a prenuptial agreement?', time: '10:08 PM' },
    { from: 'user', text: 'He makes around $120k. No prenup.', time: '10:09 PM' },
    { from: 'bot', text: 'Got it. The next available consultation is Thursday at 2 PM or Friday at 10 AM. Which works better for you?', time: '10:09 PM' },
  ];

  return (
    <Stage width={900} height={540} duration={DURATION} background={C.navy900}>

      {/* ── SCENE 1: After-hours call (0–5s) ── */}
      <Sprite start={0} end={5.5}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ ...slideUp(t, 0.2, 0.5), textAlign: 'center', marginBottom: 24 }}>
            <Eyebrow>AI Intake System</Eyebrow>
            <div style={{ fontFamily: sans, fontSize: 26, fontWeight: 700, color: C.white, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              10:07 PM — Prospect contacts the firm.
            </div>
            <div style={{ fontFamily: sans, fontSize: 14, color: C.gray400, marginTop: 8 }}>The office is closed. No staff is available.</div>
          </div>
          <div style={{ ...slideUp(t, 0.8, 0.5), display: 'flex', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(181,28,28,0.15)', border: '2px solid rgba(181,28,28,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.82 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.61 5.61l.9-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/><line x1="23" y1="1" x2="1" y2="23"/></svg>
              </div>
              <span style={{ fontFamily: sans, fontSize: 11, color: C.red }}>Call — Missed</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', color: C.gray600, fontSize: 20 }}>→</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(29,108,216,0.15)', border: '2px solid rgba(29,108,216,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.blue400} strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <span style={{ fontFamily: sans, fontSize: 11, color: C.blue300 }}>Web Chat — Active</span>
            </div>
          </div>
        </div>
      </Sprite>

      {/* ── SCENE 2: Conversation (5–14s) ── */}
      <Sprite start={5} end={14.5}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', gap: 0 }}>
          <div style={{ flex: 1, padding: '28px 28px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ ...slideUp(t, 5.1, 0.4), marginBottom: 16 }}>
              <Eyebrow>Step 2 — Structured Intake Conversation</Eyebrow>
              <div style={{ fontFamily: sans, fontSize: 16, fontWeight: 700, color: C.white, letterSpacing: '-0.01em' }}>
                Every question asked. Every answer captured.
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'hidden' }}>
              {conversation.map((msg, i) => {
                const show = fadeT(t, 5.5 + i * 1.5, 0.4);
                const isBot = msg.from === 'bot';
                return (
                  <div key={i} style={{
                    opacity: show, display: 'flex', flexDirection: 'column',
                    alignItems: isBot ? 'flex-start' : 'flex-end',
                    transform: `translateY(${lerp(8, 0, easeOut(show))}px)`,
                  }}>
                    <div style={{
                      maxWidth: '80%', padding: '10px 14px', borderRadius: isBot ? '4px 12px 12px 12px' : '12px 4px 12px 12px',
                      background: isBot ? 'rgba(29,108,216,0.15)' : 'rgba(255,255,255,0.06)',
                      border: `1px solid ${isBot ? 'rgba(29,108,216,0.25)' : 'rgba(255,255,255,0.1)'}`,
                    }}>
                      <div style={{ fontFamily: sans, fontSize: 12, color: isBot ? C.blue200 : C.white, lineHeight: 1.55 }}>{msg.text}</div>
                    </div>
                    <div style={{ fontFamily: mono, fontSize: 9, color: C.gray500, marginTop: 3, paddingLeft: 4 }}>{isBot ? 'REVCO Intake' : 'Prospect'} · {msg.time}</div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Right: captured data */}
          <div style={{ width: 230, padding: '28px 20px', borderLeft: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontFamily: sans, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.gray500, marginBottom: 12 }}>Captured Data</div>
            {[
              { label: 'Matter Type', val: 'Divorce', delay: 7.2 },
              { label: 'Children', val: '2 minor children', delay: 8.7 },
              { label: 'Spouse Income', val: '~$120,000/yr', delay: 10.2 },
              { label: 'Prenup', val: 'None', delay: 10.8 },
              { label: 'Consultation', val: 'Thursday 2 PM', delay: 13.0 },
            ].map((field, i) => {
              const show = fadeT(t, field.delay, 0.4);
              return (
                <div key={field.label} style={{ opacity: show, marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontFamily: sans, fontSize: 10, color: C.gray500, marginBottom: 3 }}>{field.label}</div>
                  <div style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: C.white }}>{field.val}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Sprite>

      {/* ── SCENE 3: Structured lead in attorney inbox (14–20s) ── */}
      <Sprite start={14} end={DURATION}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: '32px 40px' }}>
          <div style={{ ...slideUp(t, 14.1, 0.5), marginBottom: 20 }}>
            <Eyebrow color={C.greenText}>Result — Attorney Inbox, 8:00 AM</Eyebrow>
            <div style={{ fontFamily: sans, fontSize: 20, fontWeight: 700, color: C.white, letterSpacing: '-0.01em' }}>
              Structured intake ready for consultation.
            </div>
          </div>
          <div style={{ ...slideUp(t, 14.4, 0.5) }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '20px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div>
                  <div style={{ fontFamily: sans, fontSize: 15, fontWeight: 700, color: C.white, marginBottom: 4 }}>New Intake — Consultation Thursday 2 PM</div>
                  <div style={{ fontFamily: sans, fontSize: 12, color: C.gray400 }}>Captured: Last night 10:07–10:12 PM · Web chat</div>
                </div>
                <Badge color={C.greenText} bg={C.greenBg}>Consultation Booked</Badge>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                {[
                  { label: 'Matter Type', val: 'Divorce — contested' },
                  { label: 'Minor Children', val: '2' },
                  { label: 'Approx. Assets', val: 'Home, retirement accts' },
                  { label: 'Spouse Income', val: '~$120,000 / yr' },
                  { label: 'Prenup', val: 'None' },
                  { label: 'Urgency', val: 'Not immediate' },
                ].map((f, i) => {
                  const show = fadeT(t, 14.8 + i * 0.2, 0.35);
                  return (
                    <div key={f.label} style={{ opacity: show }}>
                      <div style={{ fontFamily: sans, fontSize: 10, color: C.gray500, marginBottom: 3 }}>{f.label}</div>
                      <div style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: C.white }}>{f.val}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 14, ...slideUp(t, 16.2, 0.4) }}>
            <div style={{ fontFamily: sans, fontSize: 12, color: C.gray500, lineHeight: 1.6 }}>
              Transcript, contact details, and consultation confirmation delivered to attorney — before the office opened.
            </div>
          </div>
        </div>
      </Sprite>

      <div style={{ position: 'absolute', bottom: 16, left: 24, fontFamily: mono, fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {t < 5 ? 'After-hours contact' : t < 14 ? 'Structured intake conversation' : 'Structured lead delivered'}
      </div>
    </Stage>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATION 4: AI Client Status Assistant
// Story: Client texts "what's happening?" → system checks attorney-approved response library → structured update sent
// ═══════════════════════════════════════════════════════════════════════════════

function ClientStatusAnimation() {
  const { useTime, Sprite, Stage } = window;
  const t = useTime();
  const DURATION = 18;

  return (
    <Stage width={900} height={540} duration={DURATION} background={C.navy900}>

      {/* ── SCENE 1: Client message arrives (0–5s) ── */}
      <Sprite start={0} end={5.5}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 520 }}>
            <div style={{ ...slideUp(t, 0.2, 0.5), textAlign: 'center', marginBottom: 24 }}>
              <Eyebrow>AI Client Status Assistant</Eyebrow>
              <div style={{ fontFamily: sans, fontSize: 22, fontWeight: 700, color: C.white, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                Client sends a routine status question.
              </div>
            </div>
            {/* SMS thread */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, padding: 20 }}>
              <div style={{ fontFamily: sans, fontSize: 11, color: C.gray500, textAlign: 'center', marginBottom: 14 }}>Today, 2:34 PM</div>
              <div style={{ ...slideUp(t, 0.8, 0.4), display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
                <div style={{ maxWidth: '70%', background: 'rgba(29,108,216,0.2)', border: '1px solid rgba(29,108,216,0.3)', borderRadius: '12px 12px 4px 12px', padding: '10px 14px' }}>
                  <div style={{ fontFamily: sans, fontSize: 13, color: C.white }}>Hi, I haven't heard anything in 3 weeks. Is there any update on my case? When is my next hearing?</div>
                </div>
              </div>
              <div style={{ fontFamily: mono, fontSize: 9, color: C.gray500, textAlign: 'right', marginBottom: 6 }}>Client: Martinez, D. · 2:34 PM</div>
              <div style={{ ...slideUp(t, 2.2, 0.4) }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.blue400, animation: 'none' }} />
                  <div style={{ fontFamily: sans, fontSize: 11, color: C.gray400 }}>Routing to AI Client Status Assistant...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Sprite>

      {/* ── SCENE 2: System checks approved library + composes response (5–12s) ── */}
      <Sprite start={5} end={12.5}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', gap: 0 }}>
          <div style={{ flex: 1, padding: '28px 28px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ ...slideUp(t, 5.1, 0.4), marginBottom: 16 }}>
              <Eyebrow>Step 2 — Checking Matter Record</Eyebrow>
              <div style={{ fontFamily: sans, fontSize: 17, fontWeight: 700, color: C.white, letterSpacing: '-0.01em' }}>
                System queries the case record against attorney-approved response guardrails.
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { check: 'Client identity verified', val: 'Martinez, D. — Matter #2024-1182', done: t > 5.6 },
                { check: 'Hearing date on record', val: 'Next hearing: June 12, 2026 @ 9:00 AM', done: t > 6.4 },
                { check: 'Last communication', val: 'Attorney note filed April 28, 2026', done: t > 7.2 },
                { check: 'Response template', val: 'Status Update — No sensitive content', done: t > 8.0 },
                { check: 'Attorney guardrail check', val: 'No restricted topics detected', done: t > 8.8 },
              ].map((item, i) => (
                <div key={item.check} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 6, padding: '10px 12px',
                  opacity: t > 5.4 + i * 0.6 ? 1 : 0.3, transition: 'opacity 0.4s',
                }}>
                  <CheckMark visible={item.done} size={14} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: sans, fontSize: 11, fontWeight: 600, color: C.white }}>{item.check}</div>
                    <div style={{ fontFamily: mono, fontSize: 10, color: item.done ? C.blue300 : C.gray500, marginTop: 2 }}>{item.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ width: 220, padding: '28px 16px', borderLeft: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontFamily: sans, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.gray500, marginBottom: 12 }}>Guardrail Status</div>
            {[
              { label: 'Legal advice', status: 'blocked', color: C.purpleText, bg: C.purpleBg },
              { label: 'Settlement terms', status: 'blocked', color: C.purpleText, bg: C.purpleBg },
              { label: 'Strategy discussion', status: 'blocked', color: C.purpleText, bg: C.purpleBg },
              { label: 'Hearing dates', status: 'allowed', color: C.greenText, bg: C.greenBg },
              { label: 'Office contact info', status: 'allowed', color: C.greenText, bg: C.greenBg },
            ].map((g, i) => (
              <div key={g.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, opacity: t > 7 + i * 0.3 ? 1 : 0.2, transition: 'opacity 0.4s' }}>
                <span style={{ fontFamily: sans, fontSize: 11, color: C.gray300 }}>{g.label}</span>
                <Badge color={g.color} bg={g.bg}>{g.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      </Sprite>

      {/* ── SCENE 3: Response sent (12–18s) ── */}
      <Sprite start={12} end={DURATION}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: '28px 40px' }}>
          <div style={{ ...slideUp(t, 12.1, 0.5), marginBottom: 16 }}>
            <Eyebrow color={C.greenText}>Result — Response Sent</Eyebrow>
            <div style={{ fontFamily: sans, fontSize: 20, fontWeight: 700, color: C.white, letterSpacing: '-0.01em' }}>Client received an accurate, guardrail-compliant update.</div>
          </div>
          <div style={{ ...slideUp(t, 12.4, 0.4), flex: 1, display: 'flex', gap: 16 }}>
            {/* SMS preview */}
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 10, padding: 20 }}>
              <div style={{ fontFamily: sans, fontSize: 11, color: C.gray500, textAlign: 'center', marginBottom: 14 }}>Today, 2:35 PM</div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                <div style={{ maxWidth: '75%', background: 'rgba(29,108,216,0.15)', border: '1px solid rgba(29,108,216,0.25)', borderRadius: '12px 12px 4px 12px', padding: '10px 14px' }}>
                  <div style={{ fontFamily: sans, fontSize: 12, color: C.gray300 }}>Hi, I haven't heard anything in 3 weeks. Is there any update on my case?</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ maxWidth: '80%', background: 'rgba(26,122,74,0.1)', border: '1px solid rgba(26,122,74,0.2)', borderRadius: '12px 12px 12px 4px', padding: '10px 14px' }}>
                  <div style={{ fontFamily: sans, fontSize: 12, color: C.white, lineHeight: 1.6 }}>
                    Hi David — your next hearing is scheduled for <strong>June 12, 2026 at 9:00 AM</strong>. Your attorney filed a status note on April 28. For anything beyond scheduling, please call the office at (512) 555-0110.
                  </div>
                </div>
              </div>
              <div style={{ fontFamily: mono, fontSize: 9, color: C.gray500, marginTop: 6 }}>REVCO Client Status Assistant · 2:35 PM</div>
            </div>
            {/* Right: what didn't happen */}
            <div style={{ width: 220 }}>
              <div style={{ fontFamily: sans, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.gray500, marginBottom: 12 }}>What wasn't required</div>
              {[
                'Attorney interrupted',
                'Staff callback scheduled',
                'Paralegal pulled file',
                'Voicemail left for client',
              ].map((item, i) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, opacity: t > 13 + i * 0.3 ? 1 : 0, transition: 'opacity 0.4s' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.gray600} strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                  <span style={{ fontFamily: sans, fontSize: 11, color: C.gray500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Sprite>

      <div style={{ position: 'absolute', bottom: 16, left: 24, fontFamily: mono, fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {t < 5 ? 'Client message arrives' : t < 12 ? 'System checks approved guardrails' : 'Compliant response sent'}
      </div>
    </Stage>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATION 5: Case Intelligence Assistant
// Story: Raw case file → AI structures timeline + summary → attorney-ready brief
// ═══════════════════════════════════════════════════════════════════════════════

function CaseIntelligenceAnimation() {
  const { useTime, Sprite, Stage } = window;
  const t = useTime();
  const DURATION = 20;

  const events = [
    { date: 'Jan 14, 2023', label: 'Marriage', type: 'milestone' },
    { date: 'Mar 2, 2024',  label: 'Separation — parties stopped residing together', type: 'event' },
    { date: 'Jul 19, 2024', label: 'Divorce petition filed — Travis County District Court', type: 'filing' },
    { date: 'Oct 8, 2024',  label: 'Temporary orders hearing — custody arrangement set', type: 'hearing' },
    { date: 'Feb 3, 2025',  label: 'Discovery served — Respondent\'s RFP No. 1', type: 'discovery' },
    { date: 'Jun 12, 2026', label: 'Next scheduled hearing', type: 'upcoming' },
  ];

  const typeColor = { milestone: C.teal400, event: C.blue300, filing: C.amberText, hearing: C.purpleText, discovery: C.blue400, upcoming: C.greenText };
  const typeBg = { milestone: 'rgba(18,160,156,0.15)', event: 'rgba(77,154,245,0.12)', filing: C.amberBg, hearing: C.purpleBg, discovery: 'rgba(29,108,216,0.15)', upcoming: C.greenBg };

  return (
    <Stage width={900} height={540} duration={DURATION} background={C.navy900}>

      {/* ── SCENE 1: Raw case file (0–5s) ── */}
      <Sprite start={0} end={5.5}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 60px' }}>
          <div style={{ ...slideUp(t, 0.2, 0.5), textAlign: 'center', marginBottom: 24 }}>
            <Eyebrow>Case Intelligence Assistant</Eyebrow>
            <div style={{ fontFamily: sans, fontSize: 24, fontWeight: 700, color: C.white, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              A 3-year matter. Hundreds of documents. No structured summary.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 600 }}>
            {['Petition_July2024.pdf', 'TempOrders_Oct2024.pdf', 'RFP_Feb2025.pdf', 'Financial_Disclosures.pdf', 'Email_Correspondence_x47.pdf', 'Property_Appraisal.pdf', 'Custody_Eval_Report.pdf', 'Depo_Transcript.pdf'].map((f, i) => (
              <div key={f} style={{
                ...slideUp(t, 0.4 + i * 0.15, 0.4),
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 5, padding: '6px 10px',
              }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.gray400} strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <span style={{ fontFamily: mono, fontSize: 9.5, color: C.gray400 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </Sprite>

      {/* ── SCENE 2: AI structures timeline (5–13s) ── */}
      <Sprite start={5} end={13.5}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: '28px 36px' }}>
          <div style={{ ...slideUp(t, 5.1, 0.4), marginBottom: 18 }}>
            <Eyebrow>Step 2 — Building Matter Timeline</Eyebrow>
            <div style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: C.white, letterSpacing: '-0.01em' }}>
              Events extracted and ordered chronologically.
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {events.map((ev, i) => {
              const show = fadeT(t, 5.5 + i * 0.9, 0.45);
              return (
                <div key={ev.date} style={{
                  opacity: show, transform: `translateX(${lerp(-16, 0, easeOut(show))}px)`,
                  display: 'flex', alignItems: 'center', gap: 14,
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 6, padding: '10px 14px',
                }}>
                  <MonoText color={C.gray400} size={10}>{ev.date}</MonoText>
                  <div style={{ flex: 1, fontFamily: sans, fontSize: 12, color: C.white }}>{ev.label}</div>
                  <Badge color={typeColor[ev.type]} bg={typeBg[ev.type]}>{ev.type}</Badge>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 12, ...slideUp(t, 10.5, 0.4) }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <ProgressBar pct={Math.min(100, Math.round((t - 5.5) / 7 * 100))} />
            </div>
            <div style={{ fontFamily: mono, fontSize: 10, color: C.gray500, marginTop: 4 }}>Extracting from {Math.min(8, Math.floor((t - 5) / 1))} of 8 documents...</div>
          </div>
        </div>
      </Sprite>

      {/* ── SCENE 3: Attorney-ready brief (13–20s) ── */}
      <Sprite start={13} end={DURATION}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', gap: 0 }}>
          <div style={{ flex: 1, padding: '28px 28px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ ...slideUp(t, 13.1, 0.5), marginBottom: 16 }}>
              <Eyebrow color={C.greenText}>Result — Matter Intelligence Brief</Eyebrow>
              <div style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: C.white, letterSpacing: '-0.01em' }}>Attorney review — prepared, not produced.</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 10, padding: '18px 20px', ...slideUp(t, 13.4, 0.4) }}>
              <div style={{ fontFamily: sans, fontSize: 12, fontWeight: 700, color: C.white, marginBottom: 10 }}>Martinez Dissolution — Matter Summary</div>
              {[
                { label: 'Filing date', val: 'July 19, 2024 — Travis County' },
                { label: 'Separation date', val: 'March 2, 2024' },
                { label: 'Minor children', val: '2 — temporary custody order in place' },
                { label: 'Discovery status', val: 'RFP No. 1 served Feb 2025. Production pending.' },
                { label: 'Next hearing', val: 'June 12, 2026 — status conference' },
                { label: 'Open items', val: '3 — financial disclosure gaps identified' },
              ].map((f, i) => {
                const show = fadeT(t, 13.7 + i * 0.3, 0.35);
                return (
                  <div key={f.label} style={{ opacity: show, display: 'flex', gap: 14, marginBottom: 9, paddingBottom: 9, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontFamily: sans, fontSize: 10, color: C.gray500, width: 110, flexShrink: 0 }}>{f.label}</div>
                    <div style={{ fontFamily: sans, fontSize: 12, color: C.white, flex: 1 }}>{f.val}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ width: 220, padding: '28px 16px', borderLeft: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontFamily: sans, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.gray500, marginBottom: 12 }}>Attorney Controls</div>
            {[
              'Export to PDF',
              'Add to case file',
              'Flag discrepancy',
              'Request update',
            ].map((action, i) => (
              <div key={action} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '9px 12px', borderRadius: 6, marginBottom: 6,
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                opacity: t > 15 + i * 0.4 ? 1 : 0, transition: 'opacity 0.4s',
                cursor: 'pointer',
              }}>
                <span style={{ fontFamily: sans, fontSize: 11, color: C.white }}>{action}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.gray500} strokeWidth="1.5"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            ))}
            <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 6, background: 'rgba(181,28,28,0.08)', border: '1px solid rgba(181,28,28,0.2)', opacity: t > 16.5 ? 1 : 0, transition: 'opacity 0.4s' }}>
              <div style={{ fontFamily: sans, fontSize: 10, fontWeight: 600, color: C.red, marginBottom: 4 }}>Open items flagged</div>
              <div style={{ fontFamily: sans, fontSize: 11, color: C.gray400 }}>3 financial disclosure gaps need resolution before next hearing.</div>
            </div>
          </div>
        </div>
      </Sprite>

      <div style={{ position: 'absolute', bottom: 16, left: 24, fontFamily: mono, fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {t < 5 ? 'Raw matter documents' : t < 13 ? 'AI builds matter timeline' : 'Attorney-ready brief'}
      </div>
    </Stage>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Export all animations to window
// ═══════════════════════════════════════════════════════════════════════════════
Object.assign(window, {
  LexiDraftAnimation,
  RevenueRecoveryAnimation,
  IntakeSystemAnimation,
  ClientStatusAnimation,
  CaseIntelligenceAnimation,
});
