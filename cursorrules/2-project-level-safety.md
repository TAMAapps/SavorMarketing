# Project-Level Safety Rules (.cursorrules)

## Overview
These are **project-specific safety rules** that should be added to a `.cursorrules` file in the root of each project. These rules work in combination with your global Cursor settings to provide layered protection.

## How to Apply These Rules
1. Navigate to your project's root directory
2. Create a file named `.cursorrules`
3. Copy and paste the template below
4. Customize the rules for your specific project needs
5. Commit the `.cursorrules` file to version control so your team shares the same safety standards

---

## PROJECT SAFETY RULES TEMPLATE

```markdown
# PROJECT SAFETY RULES

## 🏗️ Core Safety Principles
- Treat this codebase as production-critical
- Every change must be intentional and minimal
- When in doubt, ask before acting
- Preserve existing functionality unless explicitly told to change it

## 🚫 Forbidden Actions
- Deleting entire directories or multiple files
- Modifying package.json without explicit permission  
- Changing build configurations without approval
- Removing error handling or logging code
- Modifying database schemas or migrations
- Changing environment variables or configuration files
- Removing security-related code or validations
- Modifying CI/CD pipeline files without permission

## ✅ Required Behaviors
- Always explain your reasoning before making changes
- Show me the diff before applying large modifications
- Ask for confirmation before installing new dependencies
- Stop work if you encounter unexpected resistance or errors
- Validate that changes don't break existing functionality
- Maintain code style and patterns consistent with the project

## 🎯 Task Management
- Focus only on the specific task requested
- Don't "improve" unrelated code unless asked
- If you see other issues, mention them but don't fix them automatically
- Complete one task fully before suggesting additional work
- Ask for clarification if requirements are ambiguous

## 🔒 File Protection (Project-Specific)
- NEVER modify [list critical files for your project]
- NEVER delete [list protected directories]
- ALWAYS ask before changing [list sensitive files]
- Treat [list important configs] as read-only unless explicitly told otherwise

## 📋 Project Context
- This project uses [your tech stack]
- Key dependencies: [list critical dependencies]
- Build process: [describe build process]
- Testing strategy: [describe testing approach]
- Deployment method: [describe deployment]

## 🚨 Emergency Contacts
- If you encounter critical errors, stop and notify the user immediately
- If you're unsure about a change's impact, ask for guidance
- If tests fail after your changes, revert and explain what happened
```

---

## Customization Guidelines

### For Different Project Types

**Web Applications:**
```markdown
## Web App Specific Rules
- NEVER modify webpack.config.js without permission
- NEVER change routing configurations without approval
- NEVER remove authentication middleware
- ALWAYS test API endpoints after backend changes
```

**Mobile Apps:**
```markdown
## Mobile App Specific Rules
- NEVER modify app store configurations
- NEVER change permissions in manifests without approval
- NEVER remove crash reporting or analytics
- ALWAYS test on multiple device sizes after UI changes
```

**Backend Services:**
```markdown
## Backend Service Specific Rules
- NEVER modify database connection strings
- NEVER change API versioning without approval
- NEVER remove rate limiting or security middleware
- ALWAYS validate API responses after changes
```

**Libraries/Packages:**
```markdown
## Library Specific Rules
- NEVER change public API without explicit permission
- NEVER modify version numbers
- NEVER remove backward compatibility without approval
- ALWAYS update documentation when changing interfaces
```

### Critical Files to Protect

Add these to your project's forbidden files list:
```markdown
## Critical Files (Customize for your project)
- package.json / package-lock.json
- docker-compose.yml / Dockerfile
- .env files and environment configurations
- database migration files
- CI/CD configuration files (.github/workflows/, .gitlab-ci.yml)
- Security configuration files
- SSL certificates and keys
- Build and deployment scripts
```

---

## Implementation Checklist

- [ ] Create `.cursorrules` file in project root
- [ ] Customize rules for your specific project
- [ ] Add project-specific protected files
- [ ] Include team contact information
- [ ] Test rules with a small change
- [ ] Commit `.cursorrules` to version control
- [ ] Share with team members
- [ ] Review and update monthly

---

## Benefits of Project-Level Rules

1. **Team Consistency**: Everyone working on the project follows the same AI safety standards
2. **Project-Specific Protection**: Guards against changes that could break your specific setup
3. **Context Awareness**: AI understands your project's structure and constraints
4. **Reduced Onboarding**: New team members automatically get safety guidelines
5. **Version Controlled**: Safety rules evolve with your project

---

## Warning Signs Your Rules Need Updates

- AI frequently asks for permission (rules might be too restrictive)
- AI makes changes you didn't expect (rules might be too permissive)
- Team members bypass AI safety features (rules might be impractical)
- Project structure changes significantly (rules need updating)

Remember: **Project-level rules should complement, not replace, your global safety settings.** 