# Exercise 5 - Prompt Files

#### Duration: 20 minutes

## 🎯 Learning Objectives

By the end of this exercise, you will:
- Create and use prompt files for consistent, reusable AI interactions
- Understand prompt file structure with YAML headers and variables
- Build efficient workflows using standardized prompts
- Share team knowledge through reusable prompt templates

## 📸 Scenario: Standardizing AI Interactions at PixelPerfect Gallery

Your team at PixelPerfect Gallery has noticed that developers often repeat similar complex prompts for common operations. You've decided to create reusable prompt files that capture team knowledge and ensure consistency.

Today, you'll learn how to:
- Create reusable prompts that capture team knowledge
- Use variables to make prompts flexible and adaptable
- Streamline repetitive development tasks
- Standardize how the team interacts with Copilot

## 📝 Step 1: Understanding Prompt Files

Prompt files allow you to create reusable, standardized prompts that maintain consistency across your team and save time on repetitive tasks.

### Step 1.1: Why Prompt Files Matter

**Benefits:**
- **Consistency**: Same prompt structure every time
- **Efficiency**: No need to retype complex prompts
- **Standardization**: Team uses the same approaches
- **Knowledge sharing**: Capture expert prompting techniques

### Step 1.2: Prompt File Structure

Prompt files consist of two main parts:

**Header (YAML):**
```yaml
---
name: The name of the prompt, used after typing / in chat. If not specified, the file name is used.
description: 'What this prompt does'
agent: 'ask', 'agent', or the name of a custom agent
model: The language model used when running the prompt. If not specified, the currently selected model in model picker is used.
tools: ['optional-specific-tools']
---
```

**Body (Markdown):**
```markdown
Your prompt template here with ${input:variableName:placeholder}
```

**Available Variables:**
- `${workspaceFolder}` - Current workspace path
- `${file}` - Current file path
- `${selection}` - Selected text
- `${input:name:placeholder}` - User input with placeholder

**Context References:**
- Specific file paths for precise context. Ensure to use markdown link formatting for optimal results.

## 📋 Step 2: Explore Existing Prompt Files

Let's examine the prompt files already in the repository to understand best practices.

### Step 2.1: Navigate to Prompt Files

1. **Open the `.github/prompts/` folder**

2. **Review the existing prompt files:**
   - `generate-mock-photo-data.prompt.md`
   - `generate-new-ui.prompt.md`
   - `create-copilot-demo.prompt.md`

3. **Notice the consistent structure:**
   - YAML header with metadata
   - Clear description
   - Appropriate agent mode
   - Template body with variables

### Step 2.2: Use an Existing Prompt File

Try using one of the existing prompts to see how they work.

**Generate Mock Data:**

Create a command using the `/generate-mock-photo-data` prompt file to generate mock photo data. You'll need to specify the number of photos to generate.

<details>
<summary>💡 Example Prompt</summary>

```
/generate-mock-photo-data 3
```
</details>

**Generate UI Component:**

Create a command using the `/generate-new-ui` prompt file to generate a photo card component. Describe what the component should display and where to place it.

<details>
<summary>💡 Example Prompt</summary>

```
/generate-new-ui for a photo card component that displays a photo thumbnail with title and photographer name. Place it in the gallery folder.
```
</details>

### Observe:
- How the prompt automatically fills in your input
- The consistent structure of the generated output
- How variables are replaced with your values

## 🛠️ Step 3: Create Your Own Prompt File

Let's create a custom prompt file for a common task in the PixelPerfect Gallery project. You'll create a prompt file that generates a new photo-related React component with TypeScript, following the project's conventions.

### Step 3.1: Create the Prompt File

**Method 1: Using Copilot Chat UI**
1. Open GitHub Copilot Chat
2. Click the cogwheel (⚙️) in the top-right corner
3. Select "Prompt Files"
4. Click "New prompt file..."
5. Choose `.github/prompts/` as the location
6. Name it `generate-photo-component.prompt.md`

**Method 2: Create Manually**

Create a new file at `.github/prompts/generate-photo-component.prompt.md`

### Step 3.2: Define Your Prompt Template

<details>
  <summary>💡 Example Prompt</summary>

  ```markdown
  ---
  description: 'Generate a new photo-related React component with TypeScript'
  agent: 'agent'
  ---
  
  Create a new React component for the PixelPerfect Gallery photo application.
  
  Component name: ${input:componentName:PhotoCard}
  Component purpose: ${input:purpose:Display a photo with metadata}
  Location: src/components/gallery/${input:componentName}.tsx
  
  Requirements:
  - Use TypeScript with proper interface definitions
  - Use Tailwind CSS for styling with dark mode support
  - Follow Next.js 15 best practices
  - Make it responsive (mobile-first)
  - Include proper accessibility attributes
  - Export as default
  - Follow the existing component patterns in src/components/ui/
  
  The component should be reusable and maintainable.
  ```

</details>

### Step 3.3: Test Your Prompt File

1. In Copilot Chat, type `/` to see available prompt files
2. Type `/generate-photo-component`
3. Provide values for the input variables
   - Example: `/generate-photo-component componentName=PhotoThumbnail`
4. Press Enter
5. Review the generated code

### ✅ Success Criteria
- [ ] Your prompt file appears in the `/` command list
- [ ] Variables are correctly replaced with your input
- [ ] Generated code follows project conventions
- [ ] Component is created in the correct location

## 💡 Step 4: Advanced Prompt File Techniques

### Step 4.1: Using Multiple Variables

Create prompts with multiple input variables for flexibility:

```markdown
---
description: 'Create a feature with tests'
agent: 'edit'
---

Create a new ${input:featureType:component} called ${input:name:MyFeature}.

Add the following functionality:
${input:functionality:Describe the functionality here}

Also create unit tests using the project's testing framework.
```

### Step 4.2: Using Workspace Variables

Reference current file and workspace context:

```markdown
---
description: 'Refactor current file'
agent: 'agent'
---

Refactor the file at ${file} to improve:
- Code readability
- Performance
- Type safety

Current working directory: ${workspaceFolder}
```

### Step 4.3: Using File Context

Reference specific files for context:

```markdown
---
description: 'Create similar component'
agent: 'agent'
---

Create a component similar to the Button component at [src/components/ui/Button.tsx](${workspaceFolder}/src/components/ui/Button.tsx) but for ${input:purpose:cards}.

Follow the same patterns and conventions.
```

## 🎯 Step 5: Best Practices for Prompt Files

### Naming Conventions
- Use descriptive names: `generate-photo-component` not `gen-comp`
- Use kebab-case: `create-api-endpoint` not `CreateAPIEndpoint`
- Group related prompts: `test-generate-unit`, `test-generate-integration`

### Structure Guidelines
1. **Clear Description**: Make it obvious what the prompt does
2. **Right Agent Mode**: 
   - Use `ask` for questions
   - Use `agent` for code generation/modification or autonomous multi-file tasks
   - Use `CustomAgentName` for specialized workflows
3. **Meaningful Defaults**: Provide helpful placeholder values
4. **Precise Instructions**: Be specific about requirements
5. **Context References**: Include relevant files with `@` notation

### Collaboration Tips
- Document your prompts with clear descriptions
- Share prompt files through version control
- Review and refine based on team feedback
- Create prompt files for frequently repeated tasks
- Maintain consistency across related prompts

### Community Examples
For examples of effective prompt file practices and they types of things you could use them for, visit the Awesome [GitHub Copilot Repository](https://github.com/github/awesome-copilot). This repository is curated and owned by GitHub and has tons of helpful examples from the community on all aspects of GitHub Copilot.
- [Awesome Copilot Prompts](https://github.com/github/awesome-copilot/tree/main/prompts)

## 🏆 Exercise Wrap-up

Excellent work! You've mastered prompt files:
- ✅ Understood the benefits of prompt files for team productivity
- ✅ Explored existing prompt files in the repository
- ✅ Created your own custom prompt file
- ✅ Learned to use variables and context references
- ✅ Applied best practices for prompt file creation

### Reflection Questions:
1. **What repetitive tasks in your workflow could benefit from prompt files?**
2. **How could prompt files help standardize your team's approach to common tasks?**
3. **What variables would make your prompts more flexible?**
4. **How will you share and maintain prompt files with your team?**

### Key Takeaways:
- Prompt files capture team knowledge and ensure consistency
- Variables make prompts flexible and reusable
- Clear descriptions and proper agent modes improve usability
- Version control enables team collaboration on prompts
- Prompt files multiply productivity across your entire team

## Coming up next...

In the next lab, you'll learn about Custom Agents:
- Create custom agents for specialized development workflows
- Build agents with expert knowledge for specific technologies
- Use agents for autonomous task execution
- Share agents across your organization for consistent practices
