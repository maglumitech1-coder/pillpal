# PillPal 💊

Medication reminders that warn you when two medicines may not mix. Built for EurekaDev (Coding Track, Biology/Medical).

> **Not medical advice.** PillPal is a student project with a small sample dataset. "No interaction found" does **not** mean a combination is safe. Always ask a pharmacist or doctor, and never change a dose because of this app.

## The problem
People who take several medicines (often older adults) can miss doses or combine drugs that interact. PillPal helps them keep a schedule and flags known risky pairs in plain language.

## Features
- Add medicines by generic or brand name (e.g. "Advil" maps to ibuprofen)
- Interaction checker across every pair, ranked major / moderate / minor, with a short explanation
- Daily schedule with Taken / Skip logging and overdue markers
- Browser notifications at dose times (while the app is open)
- Printable summary to show a pharmacist
- Works offline and installs to a phone home screen (PWA)
- Mobile-first, light and dark mode, no account, no server: data stays in your browser

## Run it
No build step. Either open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

Run the dataset checks and mini evaluation:

```bash
node tests/test.js
```

## Project structure
```
index.html              app markup
css/style.css           styles (responsive, dark mode)
js/data.js              drug names + interaction dataset
js/app.js               app logic (matching, checking, reminders, storage)
data/interactions.json  same dataset as JSON
tests/test.js           integrity checks + known-pair evaluation
sw.js, manifest.json    offline support and installability
```

## Data and limitations
- The dataset has 30 drugs and 36 interactions, compiled from widely documented interactions for demonstration. **It has not been clinically validated.** Before relying on it, verify entries against primary sources such as openFDA drug labels and DDInter.
- NLM's RxNav interaction API was discontinued in January 2024, so this app does not depend on it.
- Medicines not in the dataset are listed as "not checked".
- Interactions depend on dose, age, and health conditions, which PillPal does not model.

## Roadmap
Live drug-name lookup via RxNorm, label text from openFDA, caregiver sharing, multilingual support.

## Privacy
Everything is stored in your browser's localStorage. Nothing is sent anywhere. Use sample data when demoing.

## License
MIT
