# Training Repo — Quick Start Guide

## Step 1: Open Your Terminal

- **Windows:** Open **PowerShell** or **Command Prompt**
- Go to the folder where you want to keep the project:
  ```
  cd Desktop
  ```
  (or any folder you prefer)

---

## Step 2: Clone the Repo

Copy-paste this command and press Enter:

```
git clone https://github.com/Shivaganesh-dev/Training-.git
```

Wait for it to download. Then go inside the folder:

```
cd Training-
```

---

## Step 3: Create YOUR Branch

Run the command with **your name** (lowercase, no spaces):

**Abhinaya:**
```
git checkout -b abhinaya
```

**Sanjay:**
```
git checkout -b sanjay
```

**Harshitha:**
```
git checkout -b harshitha
```

**Manaswini:**
```
git checkout -b manaswini
```

**Soumya:**
```
git checkout -b soumya
```

**Srinitha:**
```
git checkout -b srinitha
```

---

## Step 4: Verify You're on Your Branch

```
git branch
```

You should see:
```
  main
* your-name
```

The `*` means you're on your branch. If you see `* main` instead, go back to Step 3.

---

## Step 5: Open in VS Code

```
code .
```

This opens the project in VS Code. Now start coding from the bootcamp guide (`24HR-JS-TS-BOOTCAMP.md`).

---

## Step 6: After Every Exercise — Save & Push

```
git add .
git commit -m "day1: hour 1-2 patient registry"
git push origin your-name
```

**First time pushing?** If it asks you to set upstream, run:
```
git push --set-upstream origin your-name
```

After that, just `git push` works.

---

## Daily Routine

```
Morning:   git pull origin main          (get any updates)
           git checkout your-name        (make sure you're on your branch)

Code:      ... do the exercises ...

Save:      git add .
           git commit -m "dayX: hour X-X description"
           git push
```

---

## Rules

1. **Never push to `main`** — only push to your own branch
2. **Push after every exercise** — not at end of day
3. **Write clear commit messages** — "day1: hour 3-4 doctor schedule" not "done"
4. **Don't copy each other's code** — everyone builds their own

---

## Troubleshooting

**"I'm on the wrong branch"**
```
git checkout your-name
```

**"git push says rejected"**
```
git pull origin your-name
git push
```

**"I want to see what I changed"**
```
git status
```

**"I messed up and want to start fresh"**
Ask the manager. Don't delete anything yourself.
