# Exercise 2 - Exploring the Codebase with GitHub Copilot

#### Duration: 25 minutes

## 🎯 Learning Objectives

By the end of this exercise, you will:
- Use GitHub Copilot Chat in "Ask" mode to understand unfamiliar codebases
- Learn how to efficiently navigate and analyze project structure with AI assistance
- Understand how to identify build processes, frameworks, and dependencies
- Develop strategies for onboarding to new projects using GitHub Copilot

## 📸 Scenario: Your First Day at PixelPerfect Gallery

Welcome to your first day as a developer at PixelPerfect Gallery! Your manager has just given you access to the photo gallery repository, but like any new team member, you need to understand:
- What does this application actually do?
- How is the code organized and structured?
- What technologies and frameworks are being used?
- How do I build, run, and enhance the application?

As a modern developer, you'll leverage GitHub Copilot Chat to accelerate your onboarding process and get productive quickly.

## 🤖 Introduction to GitHub Copilot Chat

GitHub Copilot Chat is an AI-powered conversational interface that helps you understand code, generate implementations, and solve development challenges. In this lab, we'll focus on using Copilot Chat in **Ask mode** to explore and understand an unfamiliar codebase.

**Ask mode** is ideal for exploring code because it allows you to:
- Query specific files or code patterns without making changes
- Get high-level explanations of project structure and purpose
- Understand dependencies, build processes, and development workflows
- Ask follow-up questions to deepen your understanding

> **Note**: In later labs, you'll learn about other Copilot modes (Edit, Agent, and Plan) for making code changes. For now, we'll focus on understanding the codebase through conversation.

## 🔍 Step 1: Discovering Available Copilot Features

Let's start by understanding what GitHub Copilot can do for you.

For the purposes of this lab use `Auto` as the model when submitting the prompts. We will learn more about the `Auto` model as well as all the other models in a later lab.

### Instructions:
1. Switch to "Ask" mode within GitHub Copilot Chat if you are not already in that mode.
2. Type the following command in the Copilot chat:

```markdown
/help
```

### 💡 What to Expect from GitHub Copilot

You'll see a list of available commands and features, including:
- **Slash commands** like `/explain`, `/fix`, `/tests`, etc.
- **Chat participants** that provide specialized assistance
- **Code actions** available through the editor

Take a moment to familiarize yourself with these options - you'll use many of them throughout these labs!

## 📚 Step 2: Understanding the Project

Let's discover what this application does and how it's built.

### Instructions:
Ask GitHub Copilot to help you understand the application purpose and structure. Try these sample prompts:

```
What is the main purpose of this application and what are its key features?
```

```
How is this project structured? Can you explain the main folders and their purposes?
```

```
What technologies and frameworks does this project use?
```

**💡 Pro Tip:** GitHub Copilot analyzes your workspace structure, configuration files, and code patterns to provide insights. The more specific your questions, the more targeted the responses.

## 🏗️ Step 3: Diving Deeper into the Codebase

Now let's explore key files and configuration details.

### Instructions:
Ask GitHub Copilot to help you identify important files and understand configuration:

```
What are the most important files I should understand as a new developer?
```

```
Are there any configuration files I should be aware of? What do they control?
```

```
Explain the pixelperfect-gallery/package.json dependencies and what they're used for.
```

**💡 Pro Tip:** Don't hesitate to ask follow-up questions about unfamiliar technologies! GitHub Copilot is your onboarding buddy, so ask it to explain frameworks, libraries, or architectural decisions.

## 🔨 Step 4: Exploring Components and Code

Let's explore specific components to see how they work.

### Instructions:

1. **Explore a UI component:**
   - Open the file `pixelperfect-gallery/src/components/gallery/GalleryGrid.tsx`
   - Select lines 30-43 (or any interesting section)
   - Ask GitHub Copilot to explain the selected code

2. **Use the workspace participant:**

Try these sample prompts:

```
@workspace /explain
```

```
How does the GalleryGrid component handle photo filtering?
```

```
Explain how the UploadZone component implements drag-and-drop functionality.
```

```
What are the UI layout components and how are they used?
```

### 💡 Pro Tips for Code Exploration:
- Highlight specific code sections before asking for explanations
- Use `@workspace` to get context-aware answers
- Ask about design patterns or architectural decisions
- Compare different component implementations

## 🏆 Exercise Wrap-up

Congratulations! You've successfully used GitHub Copilot Chat in Ask mode to:
- ✅ Discover available Copilot features and commands
- ✅ Understand the purpose and functionality of the photo gallery codebase
- ✅ Analyze project structure, technologies, and dependencies
- ✅ Explore code components and architectural patterns

### Reflection Questions:
1. How did GitHub Copilot Chat change your approach to exploring this codebase compared to manual exploration?
2. What types of questions were most effective for getting useful information?
3. What would you explore next to deepen your understanding of this project?

### Key Takeaways:
- GitHub Copilot Chat dramatically accelerates codebase onboarding
- Start with high-level questions, then drill down into specifics
- Use `/help` to discover available features and slash commands
- Use `@workspace` for context-aware code explanations
- Ask mode is perfect for understanding code without making changes

## Coming up next...

In the next lab, you'll learn how to use GitHub Copilot to edit and generate code:
- Use Copilot Agent mode for targeted and multi-file code modifications
- Use Plan mode to preview changes before execution
- Leverage Agent mode for multi-file changes
- Implement complex functionality across components, data, and pages
- Iterate on AI-generated code to refine and enhance features
