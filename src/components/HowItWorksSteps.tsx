import { MessageIcon, CheckCircleIcon, UserIcon, CreditCardIcon } from './Icons';

const steps = [
  {
    icon: <MessageIcon size={26} />,
    title: 'Send Route & Flight Details',
    desc: 'Use the booking widget or message us directly on WhatsApp with your airport, destination, date, and flight number.',
  },
  {
    icon: <CheckCircleIcon size={26} />,
    title: 'Receive Confirmation',
    desc: 'We confirm your booking with your driver’s name, vehicle, and contact details ahead of your trip.',
  },
  {
    icon: <UserIcon size={26} />,
    title: 'Driver Meets You at Arrivals',
    desc: 'Your driver waits at the arrivals exit with a name board — easy to find, no confusion.',
  },
  {
    icon: <CreditCardIcon size={26} />,
    title: 'Pay After the Ride',
    desc: 'Pay your driver directly after your trip — cash or card. No advance payment required to confirm your booking.',
  },
];

export default function HowItWorksSteps() {
  return (
    <section className="section-lg">
      <div className="container">
        <div className="section-header centered">
          <span className="section-eyebrow">How It Works</span>
          <h2 className="section-title">Booking Your Transfer Is Simple</h2>
        </div>
        <div className="grid-4">
          {steps.map((step, i) => (
            <div key={i} style={{ textAlign: 'center', position: 'relative' }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'var(--accent-subtle)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--space-4)',
                  fontWeight: 800,
                  position: 'relative',
                }}
              >
                {step.icon}
                <span
                  style={{
                    position: 'absolute',
                    top: -6,
                    insetInlineEnd: -6,
                    background: 'var(--accent)',
                    color: 'var(--accent-on-light)',
                    borderRadius: '50%',
                    width: 22,
                    height: 22,
                    fontSize: 'var(--text-xs)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {i + 1}
                </span>
              </div>
              <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--text-main)', marginBottom: 'var(--space-2)' }}>{step.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
