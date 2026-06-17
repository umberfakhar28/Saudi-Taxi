const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get all tsx, ts, and css files in src/
const result = execSync('dir /s /b src\\*.tsx src\\*.ts src\\*.css 2>nul', { shell: 'cmd', encoding: 'utf8' });
const files = result.trim().split('\n').map(f => f.trim()).filter(Boolean);

const replacements = [
  // Exact brand names (longer matches first)
  { from: /\bSaudi Taxi Service\b/g, to: 'Gulf Trip Service' },
  { from: /\bSaudi Taxi\b(?! Service)/g, to: 'Gulf Trip Service' },
  { from: /\bMakkah Taxi Service\b/g, to: 'Gulf Trip Service' },
  
  // Emails
  { from: /info@makkahtaxiservice\.com/g, to: 'info@gulftripservice.com' },
  { from: /booking@makkahtaxiservice\.com/g, to: 'booking@gulftripservice.com' },
  { from: /support@sauditaxi\.com/g, to: 'support@gulftripservice.com' },
  { from: /info@saudiataxi\.com/g, to: 'info@gulftripservice.com' },
  { from: /info@sauditaxi\.com/g, to: 'info@gulftripservice.com' },
  
  // Domains
  { from: /saudiataxi\.com/g, to: 'gulftripservice.com' },
  { from: /sauditaxi\.com/g, to: 'gulftripservice.com' },
  { from: /makkahtaxiservice\.com/g, to: 'gulftripservice.com' },
  
  // Admin logo badge
  { from: /\bST\b(?=\s*["']\s*\))/g, to: 'GT' },
];

let updatedCount = 0;

for (const file of files) {
  if (!file) continue;
  if (file.includes('node_modules') || file.includes('.next')) continue;
  
  let content = fs.readFileSync(file, 'utf8');
  const orig = content;
  
  for (const r of replacements) {
    content = content.replace(r.from, r.to);
  }
  
  if (content !== orig) {
    fs.writeFileSync(file, content, 'utf8');
    updatedCount++;
    console.log('Updated: ' + file);
  }
}

console.log('\nFiles modified: ' + updatedCount);
