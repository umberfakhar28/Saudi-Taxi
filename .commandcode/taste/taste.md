# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

# css
- Use CSS Modules (.module.css) for component-level styling. Confidence: 0.80
- Use CSS Custom Properties (design tokens in :root via globals.css) for theming and color consistency. Confidence: 0.85
- Do NOT use Tailwind CSS — use pure CSS Modules + CSS custom properties. Confidence: 0.90
- Define a clear 60-30-10 color ratio system (60% background, 30% brand, 10% accent/CTA) with intent-revealing variable names. Confidence: 0.70
- Hardcoded hex colors in CSS modules should be replaced with CSS custom property references. Confidence: 0.70
- Use `--primary` for brand color, `--accent` for CTAs/conversion, and a structural color (like `--navy`) for nav/header/footer dark backgrounds. Confidence: 0.65

