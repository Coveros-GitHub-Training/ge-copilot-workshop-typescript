# GitHub Copilot Workshop Glossary

**Quick Reference Guide for All Terms, Tools, and Features**

This glossary provides clear definitions and explanations for all GitHub Copilot terms, tools, and features covered in the workshop labs. Use this as a quick reference when you encounter unfamiliar terminology or need clarification on Copilot capabilities.

---

## Table of Contents

- [Core Copilot Features](#core-copilot-features)
- [Chat Modes](#chat-modes)
- [Customization & Configuration](#customization--configuration)
- [Coding Agent & Autonomous Development](#coding-agent--autonomous-development)
- [GitHub Copilot Spaces](#github-copilot-spaces)
- [Model Context Protocol (MCP)](#model-context-protocol-mcp)
- [AI Models & Usage](#ai-models--usage)
- [Development Tools & Features](#development-tools--features)
- [Quality & Review](#quality--review)
- [File Types & Configuration](#file-types--configuration)

---

## Core Copilot Features

### GitHub Copilot
An AI-powered coding assistant that provides code suggestions, explanations, and development assistance directly within your IDE and throughout the GitHub platform.

**Access**: 
- **IDE**: Install GitHub Copilot extension from VS Code Extensions marketplace
- **GitHub.com**: Available throughout the platform (issues, pull requests, code views)

**Key Capabilities**: Code completion, chat assistance, autonomous coding, code review

### GitHub Copilot Chat
An interactive conversational interface that allows you to ask questions, request explanations, and get AI assistance with coding tasks. Available in VS Code, Visual Studio, and on GitHub.com.

**Access**:
- **VS Code**: Click the chat icon in the Activity Bar (left sidebar) or use `Ctrl+Alt+I` (Windows/Linux) / `Cmd+Shift+I` (Mac)
- **GitHub.com**: Click the Copilot icon in the top-right corner of any page

**Key Capabilities**: Ask questions, explain code, generate implementations, refactor code

### Code Completions
Real-time AI-powered suggestions that appear as "ghost text" while you type in your IDE. These suggestions help you write code faster by predicting what you want to write next.

**Access**: 
- **IDE**: Automatically active when typing in code files (requires GitHub Copilot extension)
- **Accept**: Press `Tab` to accept a suggestion
- **Reject**: Press `Esc` or continue typing to dismiss

### Inline Chat
A chat interface that appears directly in your code editor at the cursor position, allowing you to ask questions or request changes without leaving your code.

**Access**: 
- **VS Code**: Press `Ctrl+I` (Windows/Linux) or `Cmd+I` (Mac) while in the editor
- **Alternative**: Right-click in the editor → Select "Copilot" → Choose "Start Inline Chat"

### Slash Commands
Special commands in Copilot Chat that start with `/` and trigger specific AI behaviors or actions.

**Access**: 
- **VS Code**: Type `/` in the Copilot Chat panel or Inline Chat
- **GitHub.com**: Type `/` in the Copilot Chat interface

**Examples**: 
- `/explain` - Explain selected code
- `/fix` - Suggest fixes for problems
- `/tests` - Generate test cases
- `/help` - Show available commands

### Chat Participants
Special prefixes that scope Copilot's responses to specific contexts or enable specialized capabilities.

**Access**: 
- **VS Code**: Type `@` in the Copilot Chat panel to see available participants
- **Usage**: Type `@participantname` followed by your question

**Examples**:
- `@workspace` - Provides context about your entire workspace
- `@terminal` - Help with terminal commands
- `@github` - GitHub-specific operations (via MCP)

---

## Chat Modes

### Ask Mode
A read-only chat mode for understanding code, getting explanations, and exploring options without making any changes to your files.

**Access**: 
- **VS Code**: Click the mode selector dropdown at the top of the Copilot Chat panel → Select "Ask"
- **Default**: This is the default mode in Copilot Chat

**Best For**: Exploring codebases, learning concepts, getting suggestions  
**Output**: Explanations and suggestions only - no code changes

### Edit Mode (Deprecated)
Inline editing mode that was previously available for modifying code directly in your editor based on natural language instructions. Edit mode has been deprecated — its functionality is now handled by **Agent mode**, which can perform both targeted and exploratory code changes.

**Use instead**: Agent mode with targeted prompts for focused edits  
**Example**: "In #RecipeController.java, add pagination to this endpoint"

### Agent Mode (IDE)
A chat mode where Copilot works autonomously within your IDE to explore your workspace, make decisions about what to change, and implement solutions across multiple files.

**Access**: 
- **VS Code**: Click the mode selector dropdown at the top of the Copilot Chat panel → Select "Agent"
- **Requirements**: May require VS Code Insiders or specific extension version

**Best For**: Complex features, exploratory tasks, multi-file implementations  
**Output**: Autonomous changes across workspace files  
**Note**: Different from Coding Agent (which works on GitHub.com)

### Plan Mode
A chat mode that shows you what changes Copilot would make without actually applying them, allowing you to review the approach before execution.

**Access**: 
- **VS Code**: Click the mode selector dropdown at the top of the Copilot Chat panel → Select "Plan"

**Best For**: Understanding impact, validating approach, risk reduction  
**Output**: Detailed plan of proposed changes without modifying files

---

## Customization & Configuration

### Personal Instructions
User-level configuration that defines how Copilot behaves across all repositories you work on. Set on github.com/copilot.

**Access**: 
- **GitHub.com**: Navigate to https://github.com/copilot → Click on your profile icon in the bottom left corner → click "Personal instructions"

**Location**: https://github.com/copilot (Personal instructions section)  
**Scope**: All your repositories  
**Examples**: Coding style preferences, comment standards, preferred frameworks

### Repository Instructions
Project-specific configuration that guides Copilot to follow your repository's patterns, conventions, and requirements.

**Access**: 
- **VS Code**: Open Copilot Chat panel → Click the settings gear icon (⚙️) at the top → Select "Generate Chat Instructions" → This creates `.github/copilot-instructions.md` with instructions built for Copilot to read
- **Alternative**: Manually create or edit `.github/copilot-instructions.md` in your repository

**Location**: `.github/copilot-instructions.md`  
**Scope**: Single repository  
**Examples**: Architecture patterns, component structure, team coding standards

### Chat Instructions
Specific instructions that cover things like language specific syntax standards or design patterns that affect only certain file types. Use `applyTo` pattern logic to target specific file types.

**Access**: 
- **VS Code**: Open Copilot Chat panel → Click the settings gear icon (⚙️) at the top → Select "Chat Instructions" → `New Instructions File` → `.github/instructions` → Enter the name you want for the instructions file → This creates a file in `.github/instructions/` with proper template and YAML frontmatter
- **Alternative**: Manually create files in `.github/instructions/` directory with `.instructions.md` extension

**Location**: `.github/instructions/*.instructions.md`  
**Scope**: Single repository  
**Examples**: C# syntax patterns, UI styling, 3rd party package usage

### Organization Instructions
Company-wide standards set by organization administrators that apply to all repositories in the organization.

**Set By**: Organization administrators  
**Scope**: All organization repositories  
**Examples**: Security policies, compliance requirements, company standards

### Instruction Hierarchy
The priority order when multiple instruction levels exist: Personal (highest) → Repository → Organization (lowest). Higher priority instructions override lower ones when they conflict.

**Order**: Personal > Repository > Organization

### Prompt Files
Reusable, parameterized templates for common AI interactions that can be invoked with a slash command.

**Access**: 
- **Create in VS Code**: Open Copilot Chat panel → Click the settings gear icon (⚙️) at the top → Select "Prompt Files" → `New Prompt File` → `.github/prompts` → Enter the name you want for the prompt file → This creates a file in `.github/prompts/` with proper template and YAML frontmatter
- **Use**: Type `/` in Copilot Chat → Select your custom prompt from the list
- **Alternative**: Manually create files in `.github/prompts/` directory with `.prompt.md` extension

**Location**: `.github/prompts/*.prompt.md`  
**Format**: Markdown with YAML frontmatter  
**Examples**: `/generate-mock-photo-data`, `/generate-new-ui`

~~### Custom Chat Modes~~
### Custom Agents
Autonomous AI assistants with specialized instructions and capabilities that can be used in the IDE, CLI, or with Coding Agent.

**Access**: 
- **Create in VS Code**: Open Copilot Chat panel → Click the settings gear icon (⚙️) at the top → Select "Custom Agents" → `New Custom Agent` → `.github/agents` → Enter the name you want for the custom agent file (**Note**: The name of the file is not the name of the agent in the drop down. That is controlled by the `Name` field in the file) → This creates a file in `.github/agents/` with proper template in YAML format
- **Use in IDE**: In Agent mode, custom agents are available in the agent selector
- **Use with Coding Agent**: Reference agent in issue assignment or through GitHub.com interface
- **Alternative**: Manually create files in `.github/agents/` directory with `.agent.yml` extension

**Location**: `.github/agents/*.agent.yml`  
**Format**: YAML with markdown instructions  
**Usage**: Select from agent dropdown or reference in agent assignments  
**Scope**: IDE, CLI, and Coding Agent  
**Examples**: C# Expert agent, Testing agent, Security agent

---

## Coding Agent & Autonomous Development

### Coding Agent (GitHub Copilot Coding Agent or CCA)
An autonomous AI developer that works on GitHub issues independently, creating pull requests without human intervention during implementation.

**Access**: 
- **GitHub.com**: Open an issue → Click "Assignees" on the right sidebar → Type and select `@copilot`
- **Alternative**: In a PR, type `@copilot` in a comment to ask it to work on the PR

**Location**: GitHub.com (issues and pull requests)  
**Assignment**: Assign GitHub issue to `@copilot`  
**Output**: Pull request with implementation  
**Duration**: Typically 10-15 minutes per task

### Session Logs
Detailed records of Coding Agent's decision-making process, showing what files were analyzed, what approaches were considered, and why specific decisions were made.

**Access**: 
- **In Pull Request**: Scroll to the PR timeline → Find the Copilot activity → Click "View Session" link
- **Direct URL**: https://github.com/copilot/agents (shows all recent sessions)

**Contents**: Context gathering, planning, implementation steps, testing results

### Code Review Agent
An AI agent that automatically reviews pull requests and provides inline comments on code quality, security, performance, and best practices.

**Access**: 
- **GitHub.com**: Open a pull request → Click "Reviewers" on the right sidebar → Type and select `@copilot`

**Assignment**: Assign `@copilot` as a reviewer on any PR  
**Output**: Inline comments and summary of findings  
**Checks**: Security, performance, test coverage, accessibility, style

### Draft Pull Request
A work-in-progress pull request that Coding Agent creates while working on an issue. Once the work is complete CCA will notify you that it is ready for your review. You will need to mark the PR as ready before it can be merged in. The button `Ready For Review` can be found to the right of where the merge button is located. 

**Access**: 
- **GitHub.com**: Navigate to the repository → "Pull requests" tab → Look for draft PRs created by Copilot
- **From Issue**: Click the PR link that appears in the issue timeline when Copilot starts working

~~**Status**: Automatically changes to "Ready for review" when complete~~
**Purpose**: Shows progress and allows early feedback

### Session Steering
The ability to guide Coding Agent mid-session by adding prompts to influence its approach while it's working.

**Access**: 
- **GitHub.com**: Navigate to https://github.com/copilot/agents → Click on the active session → Use the prompt input field at the bottom
- **Alternative**: In the draft PR that Copilot creates, add a comment mentioning `@copilot` with steering instructions

**Purpose**: Correct course without waiting for completion  
**Example**: "Use Tailwind CSS instead of custom CSS files"

### Iteration with @copilot
The process of requesting changes to a pull request by mentioning `@copilot` in comments, allowing the agent to make updates autonomously.

**Access**: 
- **GitHub.com**: Open any pull request → Go to the "Conversation" tab → Add a new comment starting with `@copilot`
- **In Code**: Click "Add a comment" on a specific line → Mention `@copilot` with your request

**Works On**: Any PR (Copilot-created or human-created)  
**Usage**: Comment on PR with `@copilot` followed by requested changes  
**Example**: `@copilot Please add error handling for null values`

---

## GitHub Copilot Spaces

### Copilot Spaces
Dedicated, persistent AI workspaces where you can define specific goals, add custom context, and have focused conversations with Copilot about particular projects or initiatives.

**Access**: 
- **GitHub.com**: Navigate to https://github.com/copilot/spaces → Click "New Space" button
- **Alternative**: Click the Copilot icon (top-right) → Select "Spaces" → Click "Create new space"

**Location**: https://github.com/copilot/spaces  
**Key Features**: Custom instructions, curated source files, collaborative workspace  
**Best For**: Long-running projects, specialized tasks, team collaboration

### Space Instructions
Custom guidance specific to a Copilot Space that defines how the AI should behave for that particular workspace or project.

**Access**: 
- **In Space**: Open your Space → Click the "Settings" or "Configure" button → Find "Instructions" section → Add or edit instructions

**Location**: Within Space configuration  
**Scope**: Single Space  
**Examples**: "Focus on security best practices", "Document for beginners"

### Space Sources
Files, documentation, issues, or text content added to a Space to provide context for AI assistance.

**Access**: 
- **In Space**: Open your Space → Click "Add sources" or the `+` button → Select source type (files, text, issues, etc.) → Browse and add

**Types**: Repository files, text content, issues, external documentation  
**Purpose**: Give Copilot relevant context for focused assistance

---

## Model Context Protocol (MCP)

### Model Context Protocol (MCP)
A standardized protocol that allows AI assistants like Copilot to connect to external services and data sources, expanding their knowledge and capabilities.

**Purpose**: Integrate external systems (GitHub, Slack, databases, etc.)  
**Official Site**: https://github.com/modelcontextprotocol  
**Server List**: https://github.com/modelcontextprotocol/servers

### MCP Server
A service that implements the Model Context Protocol to expose data or functionality to AI assistants.

**Examples**: GitHub MCP Server, Slack MCP, Figma MCP, Azure MCP  
**Location**: Community list at https://github.com/modelcontextprotocol/servers

### MCP Registry
A centralized directory of available MCP servers that can be easily installed into your development environment.

**Access**: 
- **GitHub.com**: Navigate to https://github.com/mcp to browse the registry
- **Community List**: Visit https://github.com/modelcontextprotocol/servers for community-maintained servers

**Location**: https://github.com/mcp (GitHub's registry interface)  
**Community List**: https://github.com/modelcontextprotocol/servers  
**Purpose**: Discover and install MCP servers with one click

### GitHub MCP Server
An MCP server that connects Copilot to GitHub's data, enabling queries about repositories, issues, pull requests, and more through natural conversation.

**Access**: 
- **Installation**: Add to your MCP configuration file (`.vscode/mcp.json`) or install via VS Code MCP extension
- **Usage**: Once configured, ask Copilot questions about Issues/PRs/Spaces/Etc.

**Capabilities**: Query issues, search repositories, analyze PRs, access organization data  
**Installation**: Via MCP Registry or manual configuration

### MCP Configuration
The setup file that defines which MCP servers are available to your IDE and how they should be configured.

**Access**: 
- **Repository Level**: Create or edit `.vscode/mcp.json` in your repository
- **User Level**: VS Code → Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) → "Preferences: Open User Settings (JSON)" → Add MCP configuration

**Location**: `.vscode/mcp.json` (repository) or VS Code settings.json (user)  
**Format**: JSON configuration with server definitions

---

## AI Models & Usage

### AI Models
The underlying machine learning models that power GitHub Copilot's capabilities. Different models have different strengths, speeds, and costs.

**Providers**: OpenAI (GPT), Anthropic (Claude), Google (Gemini)  
**Documentation**: https://docs.github.com/copilot/reference/ai-models/supported-models

### Premium Models
AI models that count against your monthly request allowance. Generally more powerful but limited in usage.

**Examples**: GPT-4, Claude Sonnet, advanced models  
**Cost**: Counts against monthly premium request quota

### 0x Models (Unlimited)
AI models with unlimited usage that don't count against your premium request allowance. Optimized for common tasks.

**Examples**: Base GPT models, standard Claude models  
**Cost**: Unlimited

### Auto Model Selection
A feature that automatically selects the most appropriate AI model for your task while providing a 10% discount on premium requests.

**Benefit**: Cost savings + optimal model selection  
**Best For**: Users who want automation without manual model selection

### Premium Request Usage
Tracking and management of your monthly allowance of premium model requests.

**Access**: 
- **VS Code**: Hover over the Copilot icon to see a popup detailing Premium Request Usage (this defaults to the bottom right corner of the window)
- **GitHub.com**: Navigate to https://github.com/settings/copilot → View "Premium requests" section
- **Alternative**: Profile icon (top-right) → "Settings" → "Copilot" → Scroll to usage metrics

**Monitor At**: GitHub Copilot settings page  
**Reference Guide**: [Premium Request Usage Guide](Premium-Request-Usage.md)

### Model Switching
The ability to select different AI models for different tasks based on their strengths and your needs.

**Access**: 
- **VS Code**: Click the model name/icon at the top of the Copilot Chat panel → Select from available models
- **GitHub.com**: In Copilot Chat interface, click the model dropdown near the input area

**Location**: Model selector dropdown in Copilot Chat  
**Purpose**: Match model capabilities to task requirements

---

## Development Tools & Features

### Debug Panel (Chat Debug View)
A transparency feature that shows exactly what context, prompts, and system instructions Copilot is using for its responses.

**Access**: 
- **VS Code**: Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac) → Type "Copilot Chat Debug" → Select the command "Copilot Chat Debug: Focus on Copilot Chat Debug View"
- **Alternative**: View menu → Open View → Search for "Copilot Chat Debug"

**Shows**: Prompts, system instructions, context files, token usage  
**Purpose**: Understand AI decision-making, improve prompts, debug issues

### RAG (Retrieval Augmented Generation)
A technique where AI retrieves relevant information from your codebase before generating responses, ensuring context-aware and project-consistent outputs.

**How It Works**: AI searches codebase → finds relevant patterns → generates matching code  
**Benefit**: Code that matches your project's style and patterns

### Workspace Context
The set of files, folders, and project information that Copilot can access and analyze in your current development environment.

**Access**: 
- **VS Code**: Type `@workspace` in Copilot Chat to explicitly reference workspace context
- **Automatic**: Workspace context is automatically considered when working in Agent mode

**Triggered By**: `@workspace` participant  
**Scope**: All files in your opened workspace/repository

### File References
A way to explicitly include specific files in your Copilot Chat context to ensure relevant information is considered.

**Access**: 
- **VS Code**: In Copilot Chat, type `#` followed by filename to see suggestions, or use the `+` button to add files
- **Syntax**: Type `#filename.tsx` in your chat message

**Syntax**: `#filename.tsx` or `@filename.tsx`  
**Purpose**: Ensure specific files are considered in AI responses

### Context Files
Files that have been added to a chat conversation to provide relevant information for AI assistance.

**Access**: 
- **VS Code**: Click the `+` button at the top of the Copilot Chat panel → Select files to add
- **Alternative**: Type `#` followed by filename in your message, or drag and drop files into chat

**How to Add**: Click `+` in chat, use `#filename`, or reference with `@`  
**Examples**: Related components, configuration files, documentation

---

## Quality & Review

### Linting
Automated code quality checking that identifies style issues, potential bugs, and code that doesn't follow project standards.

**Command**: `npm run lint`  
**Purpose**: Ensure code quality and consistency

### TypeScript
A programming language that adds static types to JavaScript, providing better tooling, error detection, and code quality.

**Files**: `.ts`, `.tsx`  
**Benefits**: Type safety, better IDE support, fewer runtime errors

### Test Coverage
The percentage of your code that is executed by automated tests, indicating how well-tested your application is.

**Goal**: High coverage for critical features  
**Types**: Unit tests, integration tests, end-to-end tests

### Acceptance Criteria
Specific, measurable conditions that must be met for a feature or task to be considered complete.

**Access**: 
- **GitHub.com**: When creating or editing an issue, add acceptance criteria in the description using markdown checklist format
- **Format**: Use `- [ ]` for each criterion in the issue description

**Example**: "User can filter photos by category"  
**Purpose**: Clear success metrics for Coding Agent

### Code Review
The process of examining code changes to ensure quality, security, and adherence to standards before merging.

**Access**: 
- **GitHub.com**: Open a pull request → "Files changed" tab → Add comments on specific lines or use "Review changes" button
- **With AI**: Assign `@copilot` as a reviewer for automated code review

**Participants**: Humans and/or Code Review Agent  
**Purpose**: Catch issues, improve quality, share knowledge

---

## File Types & Configuration

### `.github/copilot-instructions.md`
The repository-level instructions file that guides Copilot's behavior for a specific project.

**Access**: 
- **VS Code**: Open Copilot Chat panel → Click the settings gear icon (⚙️) → Select "Edit Repository Instructions"
- **Alternative**: Manually create or open `.github/copilot-instructions.md` in the repository root
- **Location**: Must be at the path `.github/copilot-instructions.md` (exact path required)

**Format**: Markdown  
**Contains**: Architecture patterns, coding standards, project context  
**Scope**: Single repository

### `.github/prompts/*.prompt.md`
Directory containing reusable prompt templates that can be invoked as slash commands.

**Access**: 
- **Create in VS Code**: Open Copilot Chat panel → Click the settings gear icon (⚙️) → Select "New Prompt"
- **Use**: Type `/` in Copilot Chat to see and select your custom prompts
- **Alternative**: Manually create the directory `.github/prompts/` and add files with `.prompt.md` extension

**Format**: Markdown with YAML frontmatter  
**Naming**: `filename.prompt.md`  
**Usage**: `/filename` in chat

### `.github/agents/*.agent.yml`
Directory containing custom agent definitions for autonomous task execution.

**Access**: 
- **Create in VS Code**: Open Copilot Chat panel → Click the settings gear icon (⚙️) → Select "New Agent"
- **Use**: Available in agent selector when using Agent mode or when assigning work to Coding Agent
- **Alternative**: Manually create the directory `.github/agents/` and add files with `.agent.yml` extension

**Format**: YAML with markdown instructions  
**Naming**: `filename.agent.yml`  
**Usage**: Select from agent dropdown or reference in assignments

### `.vscode/mcp.json`
Repository-level MCP server configuration file.

**Access**: 
- **Create/Edit**: In your IDE, create or open `.vscode/mcp.json` in the repository root
- **Location**: Must be at the path `.vscode/mcp.json` (exact path required)

**Format**: JSON  
**Contains**: Server definitions and configurations  
**Scope**: Single repository

### `next.config.ts`
Configuration file for Next.js applications, defining build options, routing, and framework behavior.

**Framework**: Next.js  
**Purpose**: Project configuration and build settings

### `package.json`
Node.js project configuration file listing dependencies, scripts, and project metadata.

**Contains**: Dependencies, scripts, project information  
**Purpose**: Define project setup and available commands

---

## Quick Comparison Tables

### Chat Modes Comparison

| Mode | Changes Code? | Scope | Best For |
|------|---------------|-------|----------|
| **Ask** | No | Read-only | Understanding, exploring, learning |
| **Edit** | Yes | Files you specify | Targeted changes, refactoring |
| **Agent** | Yes | Autonomous decision | Complex features, exploration |
| **Plan** | No | Preview only | Understanding impact before changes |

### Agent Types Comparison

| Feature | IDE Agent Mode | Coding Agent | Custom Agents |
|---------|----------------|--------------|---------------|
| **Location** | VS Code | GitHub.com | IDE, CLI, or GitHub |
| **Interaction** | Interactive | Autonomous | Context-dependent |
| **Output** | Direct changes | Pull Request | Varies by context |
| **Best For** | Real-time development | Delegated tasks | Specialized workflows |

### Instruction Hierarchy

| Level | Scope | Set By | Priority |
|-------|-------|--------|----------|
| **Personal** | All your repos | You (on github.com/copilot) | Highest |
| **Repository** | Single repo | Repo file (`.github/copilot-instructions.md`) | Medium |
| **Organization** | All org repos | Org admins | Lowest |

**Last Updated**: Reference for GitHub Copilot Advanced Workshop  
**For Questions**: Use GitHub Copilot Chat with this glossary as context!

*Tip: Press `Ctrl+F` (or `Cmd+F` on Mac) to search for specific terms on this page.*
