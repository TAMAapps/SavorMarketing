# Security Audit Checklist

## 🔍 Immediate Security Audit Steps

Run these commands to check for potentially exposed secrets in your codebase:

### 1. Search for Common API Key Patterns

```bash
# Search for potential API keys
grep -r "api[_-]key" . --exclude-dir=node_modules --exclude-dir=.git
grep -r "apikey" . --exclude-dir=node_modules --exclude-dir=.git
grep -r "secret[_-]key" . --exclude-dir=node_modules --exclude-dir=.git
grep -r "private[_-]key" . --exclude-dir=node_modules --exclude-dir=.git

# Search for specific service keys
grep -r "sk_" . --exclude-dir=node_modules --exclude-dir=.git  # Stripe
grep -r "pk_" . --exclude-dir=node_modules --exclude-dir=.git  # Stripe public
grep -r "AKIA" . --exclude-dir=node_modules --exclude-dir=.git # AWS
grep -r "AIza" . --exclude-dir=node_modules --exclude-dir=.git # Google
grep -r "ya29" . --exclude-dir=node_modules --exclude-dir=.git # Google OAuth
```

### 2. Search for Environment Variables in Code

```bash
# Look for hardcoded environment variables
grep -r "process\.env\." . --exclude-dir=node_modules --exclude-dir=.git
grep -r "import.*env" . --exclude-dir=node_modules --exclude-dir=.git
grep -r "require.*env" . --exclude-dir=node_modules --exclude-dir=.git
```

### 3. Check for Database Connections

```bash
# Search for database connection strings
grep -r "mongodb://" . --exclude-dir=node_modules --exclude-dir=.git
grep -r "postgres://" . --exclude-dir=node_modules --exclude-dir=.git
grep -r "mysql://" . --exclude-dir=node_modules --exclude-dir=.git
grep -r "redis://" . --exclude-dir=node_modules --exclude-dir=.git
```

### 4. Look for Authentication Tokens

```bash
# Search for JWT tokens and auth headers
grep -r "Bearer " . --exclude-dir=node_modules --exclude-dir=.git
grep -r "jwt" . --exclude-dir=node_modules --exclude-dir=.git
grep -r "token" . --exclude-dir=node_modules --exclude-dir=.git
grep -r "authorization" . --exclude-dir=node_modules --exclude-dir=.git
```

### 5. Check Git History for Secrets

```bash
# Check if any secrets were previously committed
git log --all --full-history -- "*.env*"
git log --all --full-history -- "*secret*"
git log --all --full-history -- "*key*"
git log --all --full-history -- "*password*"
```

---

## ⚠️ Common Places Secrets Hide

### Files to Check Manually:
- [ ] `index.html` - Look for inline scripts with API keys
- [ ] `package.json` - Check scripts section for hardcoded values
- [ ] `vercel.json` - Environment variables in config
- [ ] Any `config.js` or `config.ts` files
- [ ] HTML files with embedded JavaScript
- [ ] CSS files (sometimes URLs with tokens)
- [ ] README files with example configurations
- [ ] Test files with sample API keys

### Code Patterns That May Expose Secrets:
```javascript
// ❌ DANGEROUS - Hardcoded API keys
const apiKey = "sk_live_xxxxxxxxxxxxx";
const config = {
  stripe: "pk_live_xxxxxxxxxxxxx",
  firebase: "AIzaxxxxxxxxxxxxx"
};

// ❌ DANGEROUS - Direct environment access in frontend
window.API_KEY = process.env.REACT_APP_SECRET_KEY;

// ❌ DANGEROUS - Exposed in comments
// TODO: Replace with real key: sk_live_xxxxxxxxxxxxx

// ✅ SAFE - Proper environment variable usage
const apiKey = process.env.STRIPE_SECRET_KEY;
```

---

## 🚨 If You Find Exposed Secrets

### Immediate Actions:

1. **Revoke the exposed keys immediately**
   - Go to the service dashboard (Stripe, Firebase, etc.)
   - Revoke/regenerate the compromised keys
   - Update your environment variables with new keys

2. **Remove from code**
   ```bash
   # Replace hardcoded secrets with environment variables
   # Example: Replace "sk_live_xxxxx" with process.env.STRIPE_SECRET_KEY
   ```

3. **Clean Git history** (if secrets were committed)
   ```bash
   # WARNING: This rewrites history - coordinate with team first
   git filter-branch --force --index-filter \
     'git rm --cached --ignore-unmatch path/to/secret/file' \
     --prune-empty --tag-name-filter cat -- --all
   
   # Force push (dangerous - use with caution)
   git push origin --force --all
   ```

4. **Add to ignore files**
   - Update `.gitignore`, `.cursorignore`, `.cursorindexingignore`
   - Commit the ignore file updates

---

## 🛡️ Prevention Checklist

- [ ] All API keys are in environment variables
- [ ] No hardcoded secrets in any files
- [ ] `.env` files are in `.gitignore`
- [ ] Sensitive files are in `.cursorignore`
- [ ] Team knows to never commit secrets
- [ ] Regular security audits scheduled
- [ ] Secret scanning tools enabled (if available)

---

## 🔧 Tools for Ongoing Protection

### Install Secret Scanning Tools:

```bash
# Install gitleaks for secret detection
brew install gitleaks

# Run scan on your repository
gitleaks detect --source . --verbose

# Install truffleHog for deep secret scanning
pip install truffleHog

# Scan repository
truffleHog --regex --entropy=False .
```

### Git Hooks for Prevention:

Create `.git/hooks/pre-commit`:
```bash
#!/bin/bash
# Pre-commit hook to prevent secrets

echo "🔍 Scanning for secrets before commit..."

# Check for common secret patterns
if grep -r "sk_live_\|pk_live_\|AIza\|AKIA" --exclude-dir=.git .; then
    echo "❌ Potential API keys detected! Commit blocked."
    exit 1
fi

# Check for .env files
if git diff --cached --name-only | grep -q "\.env"; then
    echo "❌ .env file detected in commit! Commit blocked."
    exit 1
fi

echo "✅ No secrets detected. Commit allowed."
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

---

## 📋 Regular Security Maintenance

### Weekly:
- [ ] Run secret scanning tools
- [ ] Review recent commits for accidental secrets
- [ ] Check for new sensitive files

### Monthly:
- [ ] Rotate API keys as a best practice
- [ ] Review and update ignore files
- [ ] Audit team access to secrets
- [ ] Update security tools

### Before Each Release:
- [ ] Full security scan
- [ ] Verify no secrets in build artifacts
- [ ] Check environment variable usage
- [ ] Validate ignore files are working

Remember: **Security is an ongoing process, not a one-time setup!** 