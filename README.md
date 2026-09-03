# Ariadne — Frontend

Interfaccia React per Ariadne. Consuma l'[API backend](https://github.com/lizc2004/Ariadne) separata, scritta in Spring Boot.

**Live:** [ariadnestudy.netlify.app](https://ariadnestudy.netlify.app) — il backend è su Render free tier e si "risveglia" dopo inattività: la prima richiesta può richiedere fino a 50 secondi.

---

## Stack tecnologico

- React 19 + Vite
- React Router (con nested routes e layout condiviso)
- CSS puro con variabili custom per il tema — nessun framework CSS

---

## Struttura

```
src/
├── api/          # client fetch, un file per dominio
├── components/   # componenti riusabili (Layout, Logo, SubjectTag, Slancio...)
├── context/      # AuthContext, ThemeContext
├── pages/        # una vista per rotta
└── utils/        # logica pura riusabile
```

---

## Funzionalità

- Login / registrazione
- Task, flashcard con studio SM-2, timer Pomodoro
- Condivisione dei progressi con altri utenti (su consenso)
- Tema chiaro/scuro con toggle manuale
- Colori automatici per materia
- Slancio di studio (giorni consecutivi, senza notifiche negative se si salta un giorno)

---

## Roadmap

- Generazione di mappe concettuali via AI
