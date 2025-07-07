# Advanced Protection Strategies & Tools

## Overview
This guide contains **advanced protection strategies**, tools, and techniques to create multiple layers of safety when working with AI coding assistants. These complement your global and project-level safety rules.

---

## 🛡️ File Protection Strategies

### .cursorignore Configuration
Create a comprehensive `.cursorignore` file to protect sensitive files:

```gitignore
# Environment and Secrets
.env*
.environment
secrets/
*.key
*.pem
*.p12
*.pfx
credentials/
auth/
ssl/

# Dependencies and Build Artifacts
node_modules/
package-lock.json
yarn.lock
pnpm-lock.yaml
dist/
build/
.next/
.nuxt/
target/
bin/
obj/

# Version Control and System Files
.git/
.svn/
.DS_Store
Thumbs.db

# Configuration Files
docker-compose.yml
docker-compose.*.yml
Dockerfile*
*.config.js
*.config.ts
webpack.config.*
vite.config.*
rollup.config.*

# Database and Cache
*.db
*.sqlite
*.sqlite3
redis.conf
mongodb.conf
.cache/
tmp/
temp/

# IDE and Editor Files
.vscode/settings.json
.idea/
*.swp
*.swo
*~

# Logs and Reports
logs/
*.log
coverage/
.nyc_output/
test-results/
```

### .cursorindexingignore Configuration
Prevent indexing of additional sensitive files:

```gitignore
# Additional Protection Layer
config/
secrets/
.env*
*.key
credentials/
private/
internal/
admin/
security/

# Documentation that might contain sensitive info
docs/deployment/
docs/infrastructure/
docs/security/
DEPLOYMENT.md
INFRASTRUCTURE.md

# Backup and Archive Files
backup/
archives/
*.backup
*.bak
*.old
```

---

## ⚙️ Built-in Cursor Safety Features

### Auto-run Settings Configuration

**Navigate to:** Cursor Settings → Auto-run

#### Deny List (Commands to Block)
```bash
# Destructive File Operations
rm -rf
rmdir
del /s
rd /s

# Git Destructive Commands
git reset --hard
git clean -fd
git push --force
git rebase --onto

# System Commands
sudo
su
chmod 777
chown
systemctl
service

# Package Management Destructive
npm uninstall
yarn remove
pip uninstall
apt remove
brew uninstall

# Docker Destructive
docker system prune
docker volume prune
docker network prune
docker container prune

# Database Destructive
DROP TABLE
DROP DATABASE
TRUNCATE
DELETE FROM

# Process Management
kill -9
killall
pkill
taskkill /f
```

#### Allow List (Safe Commands Only)
```bash
# Safe Development Commands
npm install
npm run
npm test
yarn install
yarn run
pip install
git add
git commit
git status
git log
git diff
git branch

# Safe File Operations
ls
dir
cat
head
tail
grep
find
echo
pwd
cd

# Safe Build Commands
make
cmake
mvn compile
gradle build
dotnet build
```

### File Deletion Protection
Enable these settings in Cursor:
- ✅ **File deletion protection**
- ✅ **External file protection** 
- ✅ **Require confirmation for destructive operations**

---

## 🔧 Recovery and Monitoring Tools

### Safety Check Script
Create `safety-check.sh` in your project root:

```bash
#!/bin/bash
# Cursor AI Safety Check Script
# Run this before starting major AI work sessions

echo "🛡️  Cursor AI Safety Check"
echo "=========================="

# Create backup commit
echo "📦 Creating safety backup..."
git add .
BACKUP_MSG="🤖 Safety backup before AI session - $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$BACKUP_MSG"

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  WARNING: Uncommitted changes detected!"
    echo "📋 Current status:"
    git status --short
    echo ""
fi

# Show recent commits
echo "📝 Recent commits:"
git log --oneline -5
echo ""

# Check for protected files
echo "🔍 Checking for protected files in working directory..."
PROTECTED_FILES=(".env" "package.json" "docker-compose.yml" ".cursorrules")
for file in "${PROTECTED_FILES[@]}"; do
    if [[ -f "$file" ]]; then
        echo "✅ Protected file found: $file"
    fi
done
echo ""

# Verify .cursorignore exists
if [[ -f ".cursorignore" ]]; then
    echo "✅ .cursorignore file exists"
else
    echo "⚠️  WARNING: No .cursorignore file found!"
fi

# Verify .cursorrules exists
if [[ -f ".cursorrules" ]]; then
    echo "✅ .cursorrules file exists"
else
    echo "⚠️  WARNING: No .cursorrules file found!"
fi

echo ""
echo "🚀 Safety check complete. You can now start your AI session safely."
echo "💡 Remember: Review all changes before accepting them!"
```

### Automated Backup Script
Create `auto-backup.sh` for continuous protection:

```bash
#!/bin/bash
# Automated backup script for AI coding sessions
# Run this in the background during AI work

BACKUP_DIR="./ai-session-backups"
BACKUP_INTERVAL=300  # 5 minutes

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Function to create timestamped backup
create_backup() {
    TIMESTAMP=$(date '+%Y%m%d_%H%M%S')
    BACKUP_NAME="backup_$TIMESTAMP"
    
    echo "📦 Creating backup: $BACKUP_NAME"
    
    # Create git stash with timestamp
    git stash push -m "Auto-backup: $TIMESTAMP"
    
    # Also create file system backup
    rsync -av --exclude='.git' --exclude='node_modules' \
          --exclude='dist' --exclude='build' \
          . "$BACKUP_DIR/$BACKUP_NAME/"
    
    echo "✅ Backup created successfully"
}

# Continuous backup loop
echo "🔄 Starting automated backup service (every $BACKUP_INTERVAL seconds)"
echo "🛑 Press Ctrl+C to stop"

while true; do
    create_backup
    sleep $BACKUP_INTERVAL
done
```

---

## 📋 Session Management Rules

### Pre-Session Checklist
Before starting any AI coding session:

```markdown
## Pre-Session Safety Checklist

- [ ] Run `./safety-check.sh` to create backup
- [ ] Verify `.cursorrules` file is present and up-to-date
- [ ] Check `.cursorignore` covers all sensitive files
- [ ] Review current git status and commit any important work
- [ ] Set clear, specific goals for the AI session
- [ ] Close any sensitive files in the editor
- [ ] Enable auto-backup script if working on critical changes
- [ ] Verify Cursor safety settings are enabled
```

### During Session Best Practices

**Clear Communication:**
```markdown
## Session Start Template
"I need you to be extremely careful with this codebase. 

RULES FOR THIS SESSION:
- Only make the specific changes I request
- If you need to delete or modify multiple files, ask permission first
- Explain your reasoning before making any changes
- Stop immediately if you encounter unexpected errors
- Never modify [list specific files for this session]

TASK: [Describe specific task clearly]
SCOPE: [Define exactly what should and shouldn't be changed]
EXPECTED OUTCOME: [Describe what success looks like]"
```

**Regular Check-ins:**
- Review changes every 15-20 minutes
- Use `git diff` to see all modifications
- Ask AI to explain any unexpected changes
- Take breaks to assess progress and direction

### Post-Session Review

```bash
#!/bin/bash
# Post-session review script

echo "📊 AI Session Review"
echo "==================="

# Show all changes made
echo "📝 Changes made in this session:"
git diff HEAD~1 --stat
echo ""

# Show modified files
echo "📁 Files modified:"
git diff HEAD~1 --name-only
echo ""

# Check for any deleted files
echo "🗑️  Checking for deleted files:"
git diff HEAD~1 --diff-filter=D --name-only
if [[ $? -eq 0 ]]; then
    echo "⚠️  Files were deleted in this session!"
else
    echo "✅ No files were deleted"
fi
echo ""

# Verify tests still pass (if applicable)
if [[ -f "package.json" ]] && grep -q "test" package.json; then
    echo "🧪 Running tests to verify changes..."
    npm test
fi

echo "✅ Session review complete"
```

---

## 🚨 Emergency Recovery Procedures

### If Claude Goes Rogue

**Immediate Actions:**
1. **Stop the session immediately** - Close Cursor or interrupt the operation
2. **Assess the damage:**
   ```bash
   git status                    # See what changed
   git diff                     # Review modifications
   git log --oneline -10        # Check recent commits
   ```

3. **Recovery options:**
   ```bash
   # Revert uncommitted changes
   git checkout .
   
   # Revert to last good commit
   git reset --hard HEAD~1
   
   # Restore from backup
   git stash pop                # If using stash backups
   
   # Nuclear option - restore from file backup
   rsync -av ./ai-session-backups/backup_YYYYMMDD_HHMMSS/ .
   ```

### Damage Assessment Checklist

```markdown
## After a Rogue AI Incident

- [ ] Check if any critical files were deleted
- [ ] Verify configuration files are intact
- [ ] Test that the application still builds/runs
- [ ] Check if any sensitive data was exposed
- [ ] Review git history for unwanted commits
- [ ] Verify dependencies weren't modified unexpectedly
- [ ] Check if any security settings were changed
- [ ] Test critical functionality still works
```

---

## 🔍 Red Flags and Warning Signs

### Stop Immediately If AI:
- ❌ Suggests deleting multiple files at once
- ❌ Wants to "clean up" or "refactor" unrequested code  
- ❌ Starts modifying configuration files without being asked
- ❌ Suggests removing error handling or logging
- ❌ Begins making changes outside the specified scope
- ❌ Proposes installing suspicious or unfamiliar packages
- ❌ Suggests bypassing security measures
- ❌ Wants to commit and push changes automatically
- ❌ Starts modifying package.json or lock files unexpectedly
- ❌ Suggests changing environment variables or secrets

### Warning Phrases to Watch For:
- "Let me clean this up..."
- "I'll also fix these other issues..."
- "Let me refactor this while we're here..."
- "I'll remove this unused code..."
- "Let me update the dependencies..."
- "I'll simplify this by removing..."

---

## 🛠️ Advanced Protection Tools

### File Monitoring Script
Monitor file changes in real-time:

```bash
#!/bin/bash
# File change monitor for AI sessions
# Requires: fswatch (install with: brew install fswatch)

PROTECTED_FILES=("package.json" ".env" "docker-compose.yml" ".cursorrules")
LOG_FILE="./file-changes.log"

echo "👁️  Starting file change monitor..."
echo "🔍 Monitoring: ${PROTECTED_FILES[*]}"

fswatch -o . | while read f; do
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    
    for file in "${PROTECTED_FILES[@]}"; do
        if [[ -f "$file" ]]; then
            # Check if file was modified
            if [[ "$file" -nt "$LOG_FILE" ]] 2>/dev/null; then
                echo "⚠️  [$TIMESTAMP] PROTECTED FILE MODIFIED: $file" | tee -a "$LOG_FILE"
                
                # Optional: Show diff
                if command -v git &> /dev/null; then
                    echo "📝 Changes:" | tee -a "$LOG_FILE"
                    git diff "$file" | tee -a "$LOG_FILE"
                fi
            fi
        fi
    done
done
```

### Package Security Checker
Verify AI-suggested packages:

```bash
#!/bin/bash
# Package security checker for AI suggestions

check_package() {
    local package=$1
    echo "🔍 Checking package: $package"
    
    # Check npm audit
    npm audit --package="$package" 2>/dev/null
    
    # Check package info
    npm info "$package" --json | jq -r '.description, .maintainers[0].email, .repository.url'
    
    # Check for typosquatting
    echo "⚠️  Verify this is the correct package name!"
    echo "📊 Download stats:"
    npm info "$package" --json | jq -r '.downloads'
}

# Usage: ./check-package.sh package-name
check_package "$1"
```

---

## 📚 Additional Resources

### Recommended Reading
- [Cursor Security Best Practices](https://cursor.sh/docs/security)
- [AI Coding Safety Guidelines](https://docs.github.com/en/copilot/using-github-copilot/responsible-use-of-github-copilot-features)
- [Prompt Injection Prevention](https://owasp.org/www-project-top-10-for-large-language-model-applications/)

### Community Resources
- [Cursor Safety Rules Repository](https://github.com/cursor-community/safety-rules)
- [AI Coding Safety Checklist](https://github.com/ai-safety/coding-checklist)

### Tools Integration
- **VS Code Extensions:** Git Lens, File Watcher, Auto Backup
- **Git Hooks:** Pre-commit hooks for safety checks
- **CI/CD Integration:** Automated safety verification in pipelines

---

## 🎯 Summary

Remember these key principles:

1. **Layer your defenses** - Use global rules + project rules + file protection
2. **Monitor actively** - Don't let AI work unsupervised for long periods
3. **Backup religiously** - Always have a way back to a known good state
4. **Test your safety** - Regularly verify your protection measures work
5. **Stay vigilant** - Watch for warning signs and trust your instincts

**The goal isn't to prevent AI from helping - it's to ensure AI helps safely.** 