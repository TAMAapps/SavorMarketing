# Global Safety Settings for Cursor

## Overview
These are the **essential safety rules** that should be added to your global Cursor settings. These rules apply to ALL projects and serve as your first line of defense against AI going rogue.

## How to Apply These Rules
1. Open Cursor
2. Go to **Cursor → Settings → Rules for AI**
3. Copy and paste the rules below into the global rules field
4. Save the settings

---

## GLOBAL SAFETY RULES - NEVER OVERRIDE THESE

### 🛡️ File Protection Rules
- **NEVER delete entire files without explicit user confirmation**
- **NEVER remove more than 10% of code in a single operation without approval**
- **NEVER modify files outside the current project directory**
- **ALWAYS create backups before major changes**
- **NEVER execute destructive commands like `rm -rf` or `git reset --hard`**

### 🔄 Change Management Rules  
- **Make minimal, focused changes only**
- **When fixing errors, analyze the root cause before making changes**
- **If a change affects more than 3 files, ask for confirmation first**
- **NEVER cascade changes without explicit permission**
- **Stop and ask if you encounter unexpected errors during modifications**

### 📝 Commit and Version Control Rules
- **NEVER commit changes without user review**
- **NEVER push to remote repositories automatically**
- **ALWAYS explain what changes you're making before applying them**
- **Create meaningful commit messages that describe the actual changes**

### 🚨 Emergency Protocols
- **If you detect you're making too many changes, STOP and ask for guidance**
- **If errors cascade, STOP and explain what went wrong**
- **NEVER try to "fix" problems by deleting large amounts of code**
- **When in doubt, ask the user before proceeding**

### 🎯 Task Focus Rules
- **Only work on the specific task requested**
- **Don't "improve" unrelated code unless explicitly asked**
- **Complete one task fully before suggesting additional work**
- **If you see other issues, mention them but don't fix them automatically**

### 💬 Communication Rules
- **Always explain your reasoning before making changes**
- **Show the user diffs for large modifications**
- **Ask for confirmation before installing new dependencies**
- **Provide clear status updates during long operations**

---

## Why These Rules Matter

These global rules serve as a safety net that:
- **Prevents accidental data loss** from overzealous AI behavior
- **Maintains code integrity** by requiring approval for major changes
- **Protects version control** from unwanted commits or pushes
- **Ensures transparency** in all AI operations
- **Provides emergency protocols** when things go wrong

## Testing Your Rules

After applying these rules, test them by:
1. Asking Claude to make a small change and verify it explains first
2. Requesting a large modification and ensuring it asks for confirmation
3. Trying to get it to delete files and confirming it refuses
4. Checking that it won't commit changes automatically

---

## Important Notes

- These rules should be **non-negotiable** across all projects
- They work in combination with project-specific rules
- Review and update them quarterly as Cursor evolves
- Share these rules with your team for consistency

Remember: **It's better to be asked too many questions than to lose hours of work to rogue AI behavior.** 