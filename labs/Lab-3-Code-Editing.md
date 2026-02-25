# Exercise 3 - Code Editing and Generation with GitHub Copilot

#### Duration: 40 minutes

## 🎯 Learning Objectives

By the end of this exercise, you will:
- Use GitHub Copilot's Agent mode for targeted and multi-file code modifications
- Use GitHub Copilot's Plan mode to preview changes before execution
- Understand when to use Agent mode vs. Plan mode vs. Ask mode in the IDE
- Generate new features and components with context-aware AI assistance
- Review and refine AI-generated code effectively
- Learn best practices for iterative AI-assisted development

## 📸 Scenario: Enhancing PixelPerfect Gallery Features

Your manager at PixelPerfect Gallery has requested several new features that will require changes across multiple files. You've been tasked with implementing these enhancements efficiently while maintaining the high quality standards of the codebase.

Your task today is to use GitHub Copilot's Plan and Agent modes to:
- Make targeted, deliberate changes to specific files with Agent mode
- Preview multi-file changes with Plan mode before execution
- Implement multi-file features with Agent mode assistance
- Create new components and integrate them into the application
- Make context-aware changes across the codebase

## 💡 Understanding GitHub Copilot Chat Modes

Before we dive into code generation, let's understand the different ways you can interact with GitHub Copilot in VS Code. GitHub Copilot Chat offers multiple modes, each optimized for different types of tasks:

| Mode | Trigger | Best For | Scope |
|------|---------|----------|-------|
| **Ask Mode** | Copilot Chat, select "Ask" | Understanding code, getting explanations, learning concepts | Read-only, no changes |
| **Plan Mode** | Copilot Chat, select "Plan" | Previewing changes before execution, understanding impact before committing | Shows detailed plan without making changes |
| **Agent Mode** | Copilot Chat, select "Agent" | Targeted changes, exploratory tasks, architectural planning, complex problem-solving | Workspace-wide, autonomous |

> **You learned Ask mode in Lab 2** where you explored the codebase. Now we'll focus on **Plan Mode** and **Agent Mode** for making code changes.

> **Note on Edit Mode**: Edit mode has been deprecated in GitHub Copilot. Its functionality for targeted, file-specific edits is now handled by **Agent mode**, which can perform both focused and exploratory changes.

### 🎯 Understanding IDE Code Generation Modes

**When to use each mode:**

- **Ask Mode**: Use when you need to understand code first, want suggestions before implementation, or are exploring different approaches.

- **Plan Mode**: Use when you want to preview what changes Copilot would make before executing them. Plan mode generates a detailed plan which can include showing: files to be modified, changes to be made, and the reasoning behind decisions, without actually applying any changes. Great for understanding impact and validating approach before committing.

- **Agent Mode**: Use for all code modifications — from targeted, focused changes to complex multi-file features. Agent mode autonomously plans and executes changes across your workspace. You can be as specific or as broad as you like: give it a single file to modify or let it explore your entire codebase.

> **Note**: In this lab, you'll practice with **Plan mode** and **Agent mode** to understand when to use each. **IDE Agent mode** (this lab) works interactively within VS Code, different from **Coding Agent** (Lab 9) which works autonomously on GitHub issues.

## 📝 Step 1: Using Agent Mode for Targeted Code Changes

Agent mode is versatile — it works for both exploratory, multi-file tasks and focused, targeted changes. Let's start by using Agent mode for a focused improvement to existing code.

### Exercise: Quick Refactoring with Agent Mode

Let's use Agent mode for a focused improvement to existing code in the GalleryGrid component.

### Instructions:

1. **Open the file** `pixelperfect-gallery/src/components/gallery/GalleryGrid.tsx`

2. **Select lines 26-43** (the filtering logic section)

3. **Switch to Agent mode** in Copilot Chat

4. **Request a targeted improvement:**
   
   Create a prompt that asks Copilot to refactor the filtering logic to use `useMemo` for better performance and add proper TypeScript types for the filtered results.

   <details>
   <summary>💡 Example Prompt</summary>

   ```
   In the GalleryGrid component at #GalleryGrid.tsx, refactor the filtering logic to use useMemo for better performance. Add proper TypeScript types for the filtered results.
   ```
   </details>

5. **Review the changes before accepting:**
   - Agent mode shows you the files it modified and the changes made
   - You can see exactly what code is being added/removed
   - Accept if it looks good, or refine your prompt

6. **Keep and test:**
   - Click "Keep" to accept the changes
   - Save the file
   - Start the application if not running:
     ```bash
     cd pixelperfect-gallery
     npm run dev
     ```
   - Open http://localhost:3000 and verify filtering still works

### 💡 Tips for Targeted Changes with Agent Mode:

- **Be explicit about files**: Reference specific files using `#filename` to focus the scope
- **Be deliberate**: Know what you want changed before prompting
- **Specify scope in your prompt**: Tell Agent mode exactly which section or component to modify
- **Review changes carefully**: Agent mode shows you exactly what will change
- **Control the changes**: Be specific in your prompt to keep modifications focused

## 📋 Step 2: Using Plan Mode to Preview Changes Before Execution

Now that you've made targeted changes with Agent mode, let's explore Plan mode. Plan mode lets you see exactly what Copilot would do before any code is modified, perfect for understanding impact and validating your approach.

**How Plan Mode Works:**
1. You describe what you want to accomplish
2. Copilot analyzes your codebase and creates a detailed plan
3. The plan shows:
   - Which files will be modified or created
   - What specific changes will be made to each file
   - The reasoning behind the changes
   - Dependencies and impacts
4. You review the plan without any code being changed
5. You can then execute the plan, modify your request, or try a different approach

**Benefits:**
- **Risk reduction**: See the impact before changes are made
- **Learning opportunity**: Understand AI's decision-making process
- **Better prompts**: Refine your request based on the preview
- **Confidence**: Proceed with changes knowing what will happen

**When to Use Plan Mode:**
- Before making significant refactoring changes
- When working with unfamiliar code sections
- To validate your approach before implementation
- When you want to understand AI's reasoning
- Before changes that might affect multiple files

### Exercise: Preview a Photo Search Feature with Plan Mode

Let's use Plan mode to preview adding an interactive photo search feature to the gallery. This will show you what files Copilot would create and modify, without actually making any changes yet.

### Instructions:

1. **Open GitHub Copilot Chat:**
   - Click the chat icon in the sidebar (or press `Ctrl+Alt+I` / `Cmd+Ctrl+I`)
   - Ensure you're in **Plan mode** (select "Plan" from the mode selector at the bottom of the chat window)

2. **Provide context by opening related files:**
   - Open `pixelperfect-gallery/src/app/gallery/page.tsx` to show where the search will be integrated
   - Open `pixelperfect-gallery/src/components/gallery/GalleryGrid.tsx` to understand existing patterns
   - Having these files open helps Plan mode understand your project patterns

3. **Request a plan for adding a photo search feature:**
   
   Create a prompt that asks Plan mode to show what changes would be needed to add an interactive search. Your prompt should specify:
   - Adding a search box to the gallery page
   - Creating search logic with autocomplete
   - Displaying search results dynamically
   - Following the existing design system
   
   <details>
   <summary>💡 Example Prompt</summary>

   ```
   Add an interactive photo search feature to the gallery page that allows users to search photos in real-time.
   
   Requirements:
   - Add a search box to the gallery page above the photo grid
   - Filter photos based on title, tags, or photographer name
   - Include autocomplete suggestions as user types
   - Display results dynamically without page refresh
   - Style with Tailwind CSS matching the existing purple gradient theme
   - Add smooth fade-in animations for results
   - Make it mobile-responsive
   - Show "No photos found" when search returns empty
   
   Follow the patterns used in the existing components and styling.
   ```
   </details>

4. **Analyze the plan:**
   - Review what files Plan mode wants to create/modify
   - Check if the proposed changes align with your expectations
   - Look at the React/TypeScript approach it plans to use
   - Verify the styling approach matches existing components
   - Read the reasoning to understand AI's decision-making

5. **Note your observations:**
   - Does the plan look good?
   - Are there any files you didn't expect to be modified?
   - Is the approach what you would have taken?
   - Do you see any potential issues?

### 💡 Plan Mode Best Practices:

- **Use before significant changes**: Always preview complex refactoring or multi-file features
- **Validate AI's approach**: Check if the plan matches your mental model
- **Refine your prompt**: If the plan isn't right, adjust your request and try again
- **Compare alternatives**: Try different prompts to see different approaches
- **Learn from the reasoning**: Understand why AI makes certain decisions

## 🤖 Step 3: Using Agent Mode to Execute the Photo Search Plan

Now that you've previewed the photo search changes with Plan mode, let's use Agent mode to actually implement it. You'll see how Plan mode helps you understand what will happen, while Agent mode executes the changes.

### Exercise: Execute the Photo Search with Agent Mode

We'll use the same requirements from Step 2, but this time Agent mode will actually create and modify files.

### Instructions:

1. **Switch to Agent mode:**
   - In the same Copilot Chat window, change from "Plan" to "Agent" mode

2. **Provide the same context:**
   - Ensure `pixelperfect-gallery/src/app/gallery/page.tsx` is open
   - Ensure `pixelperfect-gallery/src/components/gallery/GalleryGrid.tsx` is open
   - Agent mode will use these for context just like Plan mode did

3. **Have Agent mode implement the plan:**
   - Since Plan mode gave us all the steps to implement, we just need to tell Copilot to implement it!
   - Tell Copilot: `Implement the plan`

5. **Watch Agent mode work:**
   - Agent mode will modify the gallery page to add the search feature
   - It will add search logic and state management
   - It will add styling
   - Changes appear in your editor in real-time
   - You can see the progress in the chat window

6. **Compare to the Plan mode preview:**
   - Are the actual changes similar to what Plan mode predicted?
   - Did Agent mode modify the expected files?
   - Are the code changes what you expected from the plan?
   - Note any differences between the plan and the execution

7. **Review the generated code:**
   - Check the updated gallery page file
   - Review the search functionality
   - Verify the styling matches existing components
   - Ensure the search integrates properly

8. **Test your changes:**
   - `Keep` all of the changes and save all modified files
   - If the application isn't running, start it:
     ```bash
     cd pixelperfect-gallery
     npm run dev
     ```
   - Open http://localhost:3000/gallery in your browser
   - Try typing in the search box
   - Verify that search results appear dynamically
   - Test the autocomplete functionality
   - Check mobile responsiveness by resizing the browser

### 💡 Pro Tips for Agent Mode:

- **Be specific about file locations**: Specify exact paths where changes should be made
- **Reference existing patterns**: Point Agent mode to similar components to follow
- **Review before accepting**: Always check Agent mode's output before accepting it
- **Iterate if needed**: You can refine your prompt and try again if the plan isn't quite right. You don't have to opt to `Keep` anything to iterate. Simply type a follow-up prompt to Copilot and it will continue working.

### 🔍 Comparing Targeted vs. Exploratory Agent Mode Prompts:

**Example Scenario**: Adding input validation

**Targeted approach (specific files):**
```
Add input validation to:
- pixelperfect-gallery/src/components/upload/UploadZone.tsx (in the file upload handler)
- pixelperfect-gallery/src/lib/mock-photo-data.ts (validate photo data structure)

Use TypeScript type guards and proper error handling.
```
*Result: Focused changes to the 2 files you specified*

**Exploratory approach (let Agent decide):**
```
Analyze the application and add appropriate input validation wherever needed. 
Use your judgment to determine which components need validation, 
and how to handle invalid inputs gracefully with proper error messages.
```
*Result: AI autonomously explores, plans, and implements validation across multiple files*

### ⚙️ Key Insight:

**Targeted prompt**: You tell Copilot what to change and where (specific files and sections)  
**Exploratory prompt**: Copilot explores, decides what to change, and where to make those changes

Both approaches use Agent mode — the difference is in how specific your prompt is.

## 🎯 Step 4: Using Agent Mode for Multi-File Feature Implementation

Now let's use Agent mode for a more complex task that involves creating a new feature across multiple files. This demonstrates Agent mode's real power.

### Scenario:

The application needs a "Featured Photo" section on the homepage that highlights a special photo. This requires:
- Creating a featured photo selection component
- Adding state management
- Integrating it into the homepage UI
- Ensuring consistent styling

### Instructions:

1. **Prepare the context:**
   - Open `pixelperfect-gallery/src/app/page.tsx` (the home page where feature will be added)
   - Open `pixelperfect-gallery/src/components/gallery/GalleryGrid.tsx` (for component pattern reference)
   - Open `pixelperfect-gallery/src/lib/mock-photo-data.ts` (to see data patterns)

2. **Prompt Agent mode with the complete requirement:**

   Create a comprehensive prompt that covers the core requirements for adding a Featured Photo feature. Your prompt should specify:
   - Creating a featured photo component
   - Adding selection logic to pick a photo
   - Adding UI section to the homepage with styling and interactivity
   
   **Hint**: Using markdown format to create lists of requirements is a very effective method when working with AI
   
   <details>
   <summary>💡 Example Prompt</summary>

   ```
   Create a "Featured Photo of the Day" feature for the PixelPerfect Gallery application.
   
   Tasks:
   1. Create a new component FeaturedPhoto.tsx in src/components/gallery/
   2. Add logic that selects a photo based on the current date (use a deterministic algorithm so the same photo shows all day)
   3. Display the featured photo with all its details
   4. Add proper TypeScript types
   5. Add a "Featured Photo" section to page.tsx after the hero section
   6. Display the photo in a highlighted card with:
      - Photo title as a heading
      - Photographer name
      - Tags as badges
      - View count and likes
      - Download count
      - A "View Full Size" button
   7. Style with the existing purple gradient theme and Tailwind CSS
   8. Add smooth fade-in animation when the photo loads using Framer Motion
   9. Make it mobile-responsive
   
   Follow patterns from existing components and styling.
   ```
   </details>

4. **Monitor the implementation:**
   - Watch as Agent mode creates the new component
   - See it add the selection logic
   - Observe it integrate everything into the home page with full styling
   - Check that it follows existing patterns

5. **Review and test:**
   - Check each modified/created file
   - Verify the component follows React best practices
   - Verify TypeScript types are properly defined
   - Test the homepage at http://localhost:3000
   - Confirm the Featured Photo section appears with the highlighted styling
   - Test that the photo displayed is deterministic (same all day)
   - Check responsiveness by resizing the browser
   - Verify the fade-in animation works

### 🔍 Understanding Agent Mode's Workflow:

When you accept the plan, Agent mode:
1. **Analyzes** your entire workspace and relevant files
2. **Plans** the sequence of changes needed
3. **Creates** new components with appropriate content
4. **Modifies** existing files to integrate the new feature
5. **Validates** that changes follow project patterns
6. **Applies** all changes atomically

## 🔄 Step 5: Iterating and Refining with Agent Mode

One of Agent mode's strengths is the ability to iterate on existing code. Let's practice this by enhancing an existing component or the one you created in Step 4.

### Scenario:

You want to add animations and improve the user experience for one of the sections on the homepage. This demonstrates iterative refinement with Agent mode.

### Instructions:

1. **Choose a section to enhance:**
   - Open `pixelperfect-gallery/src/app/page.tsx`
   - Ensure the file is included as context (hint: `#page.tsx`)
   - You'll want to use the same chat session you used in Step 4

2. **Continue the conversation in Agent mode:**
   
   Agent mode remembers your previous conversation, so you can build on it. Create a prompt to enhance the Featured Photo section you created in Step 4:

   **If enhancing Featured Photo from Step 4:**
   - Your prompt should request improved animations
   - A button to cycle through different photos
   - Loading state UI
   - Better mobile layout
   
      <details>
      <summary>💡 Example Prompt</summary>
   
      ```
      Enhance the Featured Photo section we just created:
      
      Improvements:
      1. Add smooth scale and fade-in animations when the photo loads
      2. Add a "Show Next Photo" button that cycles to a different photo
      3. Add hover effects on the photo card (subtle shadow and lift)
      4. Add a loading spinner while the photo is being loaded
      5. Improve the mobile layout to make text more readable on small screens
      6. Add a subtle background pattern or gradient to make the section stand out more
      
      Keep the purple gradient theme consistent with the rest of the page.
      ```
      </details>
   
   **If enhancing the search feature instead:**
   - Your prompt should request better search UX
   - Keyboard navigation support
   - Search history
   - Empty state improvements
   
      <details>
      <summary>💡 Example Prompt</summary>
   
      ```
      Enhance the photo search feature:
      
      Improvements:
      1. Add keyboard navigation support (arrow keys to navigate results, Enter to select)
      2. Add a "Recent Searches" feature using localStorage (show last 5 searches)
      3. Add smooth slide-down animations when results appear
      4. Improve the empty state with a friendly message and search tips
      5. Add a search history dropdown that appears when clicking the search box
      6. Add a clear button (X) inside the search box to quickly clear the search
      
      Make sure animations are smooth and the UX feels polished.
      ```
      </details>

4. **Review agent modes changes:**
   - Agent mode will show what files it modifies as it works
   - Verify that it updates the appropriate files
   - You should see new functionality added
   - Accept the changes

5. **Test the improvements:**
   - Refresh the browser at http://localhost:3000
   - Test the new interactive features
   - Verify animations work smoothly
   - Resize the browser to check mobile responsiveness
   - Try all the new functionality you requested

6. **Request additional refinements if needed:**
   
   You can continue the conversation:
   ```
   Make the animation timing slower and more elegant
   ```
   
   Or:
   ```
   Add icons to the buttons using Lucide React
   ```

   OR:
   Have Copilot refine the changes to what you think will look best. There are no wrong answers!

### 💡 Benefits of Iterating with Agent Mode:

- **Context preservation**: Agent mode remembers what it just built
- **Incremental improvements**: Make changes step-by-step rather than all at once
- **Learning opportunity**: See how to progressively enhance features
- **Safe experimentation**: Easy to ask for changes and see results immediately

### 🔍 Providing Effective Feedback to Agent Mode:

When iterating, be specific about what you want changed:

**Good iteration prompts:**
- ✅ "Make the animation duration 0.5 seconds instead of the current timing"
- ✅ "Change the card shadow from subtle to more prominent on hover"
- ✅ "Add error handling for when the photo data is missing"

**Less effective prompts:**
- ❌ "Make it better"
- ❌ "Fix the animations"
- ❌ "Improve performance"

### 🎯 Practice Exercise:

Try one more iteration on your own:
1. Ask Agent mode to add a photo favorites system (heart icon) on each photo card
2. Request that clicking a photo opens a modal with full details
3. Add a "Share Photo" button that copies a link to the clipboard

### ⚠️ When to Stop Iterating:

Watch for signs that you should start a fresh conversation:
- The conversation history becomes very long
- Agent mode starts making unrelated changes
- You're changing direction significantly from the original task

**Tip**: Start a new Agent mode conversation for unrelated features

## 🎓 Step 6: Best Practices for IDE AI-Assisted Development

Let's review what makes for effective AI-assisted development in the IDE:

### ✅ Do's for Agent Mode:

1. **Let AI Explore and Decide**: Give high-level goals and let Agent mode determine the approach
   - ❌ "Modify these 3 specific files to add error handling"
   - ✅ "Add comprehensive error handling to the application where appropriate"

2. **Provide Context, Not Instructions**: Open relevant files to guide discovery
   - Open similar components for style patterns
   - Reference existing patterns: "Follow patterns in @GalleryGrid.tsx"
   - Let Agent mode decide which files to modify

3. **Use for Complex Problems**: Leverage Agent mode's autonomous capabilities
   - Architectural decisions and planning
   - Exploratory refactoring
   - Problems where the solution isn't immediately clear

4. **Review Plans Before Accepting**: Always check what Agent mode intends to do
   - Verify all files to be modified are correct
   - Ensure no unintended changes
   - Confirm the approach makes sense

5. **Iterate Conversationally**: Build on previous context
   - "Now add animations to the feature we just created"
   - "Enhance the Featured Photo section with hover effects"

### ✅ Do's for Targeted Changes with Agent Mode:

1. **Be Explicit About Files**: Reference specific files using `#filename` to focus the scope
   - ✅ "Refactor the search styling in #page.tsx"
   - ✅ "Add error handling to #UploadZone.tsx, #GalleryGrid.tsx, and #mock-photo-data.ts"

2. **Be Deliberate and Specific**: Know what you want changed
   - ✅ "Add hover effects and transitions to the photo cards"
   - ❌ "Improve this page" (too vague for targeted work)

3. **Control the Scope via Prompt Specificity**: Write focused prompts to keep changes contained
   - Mention specific files, methods, or sections
   - Define the exact changes needed
   - Maintain control over the modification scope through clear instructions

4. **Review Changes**: Agent mode shows exactly what files were modified
   - Check additions and deletions carefully
   - Ensure functionality is preserved

### ❌ Universal Don'ts:

1. **Don't skip review**: Always understand generated code before using it
2. **Don't ignore errors**: If the application doesn't start, investigate and fix
3. **Don't forget testing**: Test all AI-generated code in the browser
4. **Don't lose context**: If conversations get long, start fresh
5. **Don't over-rely**: AI is a powerful assistant, **not a replacement for thinking**

### 🎯 Mode Selection Quick Guide:

| Scenario | Use This Mode | Why |
|----------|--------------|-----|
| Explore codebase and decide what to change | **Agent** | Autonomous discovery and planning |
| Complex problem where solution isn't clear | **Agent** | AI determines best approach |
| Architectural planning and implementation | **Agent** | Workspace-wide context and decisions |
| Refactor specific files you identify | **Agent** (targeted prompt) | Focused changes with explicit file references |
| Fix bug in known locations | **Agent** (targeted prompt) | Deliberate modifications with specific instructions |
| Add feature to specific components | **Agent** (targeted prompt) | You control scope through prompt specificity |
| Preview changes before executing | **Plan** | See impact without modifying code |
| Validate approach before committing | **Plan** | Review plan and reasoning first |
| Understand code or get suggestions | **Ask** | Read-only exploration |

## 🏆 Exercise Wrap-up

Excellent work! You've mastered GitHub Copilot's IDE modes for code generation:
- ✅ Used Agent mode for targeted, surgical code improvements to the UI
- ✅ Used Plan mode to preview changes before execution
- ✅ Understood the value of validating AI's approach before committing
- ✅ Used Agent mode to create multi-file features with full frontend integration
- ✅ Implemented complex functionality across components and pages
- ✅ Iterated on AI-generated code to refine and enhance UI features
- ✅ Learned when to use each mode for maximum effectiveness

### Reflection Questions:
1. **How does Plan mode change your confidence when making large changes?**
2. **When would you use Plan mode before Agent mode?**
3. **How does Agent mode's multi-file capability change your development workflow?**
4. **How do you control the scope of Agent mode changes through prompt specificity?**
5. **What surprised you about Agent mode's understanding of your codebase?**
6. **How might you use iterative prompting to build complex features?**
7. **What strategies will you use to provide better context to Copilot?**

### Key Takeaways:
- **Agent mode is your primary tool** for all code modifications — from targeted single-file changes to complex multi-file features
- **Plan mode is essential** for previewing changes and validating approaches before execution
- Use **Plan mode before Agent mode** for complex changes to build confidence
- **Control Agent mode's scope through prompt specificity** — reference specific files and sections for targeted work
- Context is critical: open related files and reference existing patterns
- Iterative development with AI works just like with human developers
- Always review, test, and understand what AI generates
- Clear requirements and specific prompts yield better results
- **Balance frontend work** for complete feature implementation

### 🎯 Real-World Applications:

**Plan Mode Use Cases:**
- Previewing refactoring before execution
- Validating approach for complex features
- Understanding impact of multi-file changes
- Learning AI's reasoning and decision-making

**Agent Mode Use Cases:**
- Building new features from scratch
- Adding components with full integration
- Implementing requirements that touch multiple layers (Components, Pages, Data)
- Refactoring that affects architecture
- Quick bug fixes in specific files (use targeted prompts)
- UI styling improvements in specific sections
- Adding error handling to existing code
- Refining React components or TypeScript utilities

## Coming up next...

In the next lab, you'll explore engineering best practices with GitHub Copilot:
- Understand how Copilot makes decisions and inspect its reasoning process
- Configure personal instructions and custom settings for your workflow
- Learn to manage model usage and costs effectively
- Master the hierarchy of custom instructions for optimal AI assistance
