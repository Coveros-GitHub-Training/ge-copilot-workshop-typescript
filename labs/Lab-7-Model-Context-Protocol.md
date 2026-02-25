# Exercise 7 - Model Context Protocol (MCP)

#### Duration: 15 minutes

## 🎯 Learning Objectives

By the end of this exercise, you will:
- Set up and use the GitHub MCP (Model Context Protocol) server in your IDE
- Leverage MCP to interact with GitHub repositories, issues, and pull requests through natural conversation
- Understand how MCP extends Copilot's capabilities
- Configure MCP servers for your development workflow

## 📸 Scenario: Integrating GitHub Data at PixelPerfect Gallery

Your team at PixelPerfect Gallery needs better integration with GitHub for issue management and PR workflows. You want to access GitHub data directly from your IDE without switching contexts.

Today, you'll learn how to:
- Set up GitHub MCP server for seamless GitHub integration
- Interact with issues and PRs through natural language
- Configure MCP for optimal performance
- Extend Copilot with external data sources

## 🔌 Step 1: Understanding Model Context Protocol (MCP)

> [!IMPORTANT]
> If you are using a Codespace then you will not need to install the MCP server itself. However, you will need to configure it so that you can access all of the tools for these labs. The following process will be what you have to do when working in your IDEs directly.

[Model Context Protocol](https://github.com/modelcontextprotocol) acts as a mediator between your code base and external services. By combining GitHub Copilot with various external systems, you can expand the knowledge GitHub Copilot has access to:

- **Data stores**: Files and databases
- **Communication tools**: [Slack](https://docs.slack.dev/ai/mcp-server/)
- **Design platforms**: [Figma](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)
- **Project management**: [Jira](https://github.com/atlassian/atlassian-mcp-server) or [Azure DevOps](https://devblogs.microsoft.com/devops/azure-devops-mcp-server-public-preview/)
- **Cloud providers**: [Azure](https://learn.microsoft.com/azure/developer/azure-mcp-server/get-started)
- And many, many more!

### Why MCP Matters:
- **Unified Interface**: Access external data without leaving your IDE
- **Natural Language**: Query systems through conversation with Copilot
- **Extensibility**: Connect any service that provides an MCP server
- **Context Enhancement**: Give Copilot access to real-time data from your tools

## 📥 Step 2: Installing the GitHub MCP Server

When looking to utilize MCP Servers, there are two primary ways of connecting your GitHub Copilot Client: through the MCP Registry and through manual configuration.

However, when the GitHub MCP Server has an additional method of installation that is built directly into the VS Code settings. For this lab we will be utilizing either the built in method or the MCP Registry method to connect to the GitHub MCP Server, but you can use the manual configuration method for any MCP server that you want to connect to that is not available in the registry.

### Method 1: Enabling in VS Code settings [Experimental]

1. Open VS Code settings: `Cmd+,` (Mac) or `Ctrl+,` (Windows/Linux)
2. Search for "GitHub MCP Server"
3. Click the checkbox to enable the GitHub MCP Server (GitHub Mcp Server: Enabled)

This will enable built-in support for the GitHub MCP Server in your IDE, but you will still need to configure it to access the tools as shown in Step 3.

### Method 2: Using the MCP Registry

The [GitHub MCP Registry](https://github.com/mcp) provides a list of all currently available MCP Servers that can be easily and automatically installed.

1. Open the **Extensions** panel (`Ctrl+Shift+X` / `Cmd+Shift+X`)
2. Click the **filter icon** in the search bar and select **MCP Server**
3. Search for `github` and select the **GitHub MCP Server**
4. Click **Install**

If prompted to link your GitHub account, follow the authentication flow to connect your account.

### ✅ Success Criteria
- [ ] GitHub MCP Server is installed
- [ ] GitHub account is linked to the IDE
- [ ] MCP Server appears in the Extensions tab

## ⚙️ Step 3: Configuring the MCP Tools List

To enable access to additional tools available on the GitHub MCP server, you need to configure the MCP settings. There are 2 ways to handle this configuration, through the IDE or through a configuration file.

### Step 3.1: Configuring Copilot Spaces Tools

For this lab we will be configuring the MCP server to allow access to the Copilot Spaces tools. You can find a list of all of the available GitHub tools and their descriptions at in the [documentation](https://github.com/github/github-mcp-server?tab=readme-ov-file#default-toolset).

> [!IMPORTANT]
> The `copilot_spaces` toolset is **not included** by default. You must explicitly enable it with one of the methods below.

### Method 1: Configuring through the IDE

1. Open **VS Code Settings** (`Ctrl+,` / `Cmd+,`)
2. Search for `GitHub MCP toolsets`
3. Locate the **GitHub > Copilot > Chat > GitHub MCP Server: Toolsets** setting
4. Add `copilot_spaces` to the list of enabled toolsets

### Method 2: Configuring through the mcp.json file

1. Open the `Extensions` tab
2. Click on the `MCP Servers - Installed` section at the bottom
3. Click the settings icon on the GitHub MCP
4. Click `Show Configuration (JSON)`
5. Once you have the `mcp.json` file opened, update the `github` server configuration with the following:

```json
{
  "servers": {
    // Using OAuth (version 1.101 or greater)
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/",
      "headers": {
        "X-MCP-Toolsets": "copilot_spaces"
      }
    }
  }
}
```

Notice the additional headers compared to what was there before. This allows us to specify additional tool sets to make available. In this case we take all tools, but in practice you would want to be more specific.

> [!IMPORTANT]
> When prompting Copilot, you can only have 128 tools active at a given time. Anything beyond that will cause a degradation in performance.

### Step 3.2: Verify MCP Configuration

Verify the Copilot Spaces tools are now available:

1. Open the **Copilot Chat** panel and select **Agent** mode
2. Click the **tools icon** (wrench) in the chat input box
3. Expand the list of tools for **GitHub**
4. Confirm that `get_copilot_space` and `list_copilot_spaces` are listed and enabled

### Understanding Tool Sets:

Instead of `copilot_spaces`, you can specify specific tool sets:
- `"X-MCP-Toolsets": "issues,pull_requests"` - Only issue and PR tools
- `"X-MCP-Toolsets": "repositories,code_search"` - Only repository and search tools
- `"X-MCP-Toolsets": "all"` - All available tools

## 🚀 Step 4: Using GitHub MCP Effectively

The most effective way to use GitHub MCP is through natural conversation with Copilot, letting it automatically utilize the GitHub tools when needed.

Instead of directly referencing a tool from the MCP, simply ask Copilot questions about your GitHub repositories in natural language. Copilot will automatically use the GitHub MCP tools when appropriate.

### Step 4.1: Enable Issues in Your Repository

> **Note:** Before testing out the MCP, ensure that you have Issues enabled in your repository
>   - Go to `Settings` > `General`
>   - Scroll to the `Features` section
>   - Check the `Issues` box (enable it)
>   - Return to the repository (refresh if needed) before proceeding

### Step 4.2: Try Natural Language Queries

**Finding Issues:**

Create a query asking about open issues with specific criteria (like a particular label) in your repository.

<details>
<summary>💡 Example Prompt</summary>

```
What open issues are labeled "bug" in this repository?
```
or
```
Show me all enhancement requests that haven't been assigned yet
```
</details>

**Working with Pull Requests:**

Create a query asking about the status of a pull request or finding PRs that need attention.

<details>
<summary>💡 Example Prompt</summary>

```
What's the current status of pull request #42?
```
or
```
Are there any PRs that need review?
```
</details>

**Analyzing Code Across Repositories:**

Create a query to find code examples or patterns across repositories in your organization.

<details>
<summary>💡 Example Prompt</summary>

```
Find examples of authentication middleware in my organization's repos
```
or
```
How do other repos in my org handle error logging?
```
</details>

### Step 4.3: Observe MCP in Action

When you ask these questions, observe:
- How Copilot automatically selects the right GitHub tools
- The structured data returned from GitHub
- How the response integrates GitHub data with code context
- No need to explicitly reference a tool by name

## 💡 Step 5: MCP Best Practices

### Effective Prompting:
1. **Be Natural**: Ask questions in plain language
2. **Be Specific**: Include filters like labels, assignees, or status
3. **Trust Automation**: Let Copilot choose the right tools
4. **Iterate**: Refine your question if the first response isn't what you need

### Configuration Tips:
1. **Selective Tools**: Only enable tool sets you need for better performance
2. **Monitor Limits**: Stay under 128 tools for optimal performance
3. **Organization-wide**: Consider organization-level MCP configurations
4. **Security**: Review MCP server permissions and access

### Common Use Cases:
- **Issue Management**: Query, filter, and triage issues
- **PR Reviews**: Check PR status, get review feedback
- **Code Search**: Find patterns across repositories
- **Repository Info**: Get metadata, stats, and information
- **Team Collaboration**: Find work by team members

## 🌐 Step 6: Exploring Other MCP Servers

The MCP ecosystem extends far beyond GitHub. Consider adding these MCP servers based on your team's needs:

### Communication:
- **Slack MCP**: Access Slack channels, messages, and threads
- Query: "What did the team discuss about the API refactor?"

### Project Management:
- **Jira MCP**: Interact with Jira issues and projects
- Query: "Show me all high-priority tickets assigned to me"
- **Azure DevOps MCP**: Work with Azure DevOps work items
- Query: "What's the status of our current sprint?"

### Design:
- **Figma MCP**: Access Figma designs and components
- Query: "Show me the latest button component specs from Figma"

### Cloud:
- **Azure MCP**: Interact with Azure resources
- Query: "What's the current status of our production environment?"

### Development:
- **Database MCP**: Query databases directly
- **File System MCP**: Enhanced file operations
- **Git MCP**: Advanced Git operations

Visit https://github.com/modelcontextprotocol/servers for a complete list of available MCP servers.

## 📝 Step 7: Create an Issue for a Future Feature

Now that you've configured MCP and can interact with GitHub directly through Copilot, let's practice creating a well-structured GitHub issue that you'll use in a later lab.

### Step 7.1: Create a Photo Favorites System Issue

Instruct Copilot to open a GitHub issue for you to implement a photo favorites feature.

1. Use Plan mode to have Copilot come up with an implementation plan for the feature.
2. Then you can use Copilot and the GitHub MCP to open the issue.

**Tip: If you need guidance on how to instruct Copilot to open an issue or what to have Copilot put in the issue, an example prompt along with the issue template is provided below.**

### Using Copilot with MCP

Ask Copilot to create the issue for you using natural language.

<details>
<summary>💡 Example Prompt</summary>

```
Create a new GitHub issue in this repository with the following details:

Title: Add photo favorites system with heart icon

Description:
[Copy the full issue description from the template below]
```

</details>

<details>
<summary>💡 Issue Template</summary>

**Title:**
```
Add photo favorites system with heart icon
```

**Description:**
```markdown
## User Story
As a user, I want to favorite photos so I can quickly access my preferred images in the gallery.

## Requirements

### Data Structure Changes
- [ ] Add `isFavorite` field to Photo interface (boolean, default false)
- [ ] Add `favoriteCount` field to Photo interface (number, default 0)
- [ ] Update mock data in `src/lib/mock-photo-data.ts` to include these fields
- [ ] Ensure all existing photos default to `isFavorite: false` and `favoriteCount: 0`

### Component Changes
- [ ] Create `FavoriteButton.tsx` component:
  - Accept `photoId`, `isFavorite`, and `onToggle` props
  - Display heart icon (filled when favorited, outline when not)
  - Show favorite count next to icon
  - Handle click event to toggle favorite status
  - Add smooth animation on toggle (scale/color transition)
  - Use Lucide React icons (`Heart` and `HeartOff`)
- [ ] Update `PhotoCard.tsx` component:
  - Add FavoriteButton in top-right corner of photo card
  - Position absolutely over photo with proper z-index
  - Add semi-transparent background for visibility
  - Connect to favorite toggle functionality
- [ ] Update `GalleryGrid.tsx` component:
  - Add state management for favorites using useState
  - Implement `handleFavoriteToggle` function:
    - Updates photo's `isFavorite` status
    - Increments/decrements `favoriteCount`
    - Updates local state (note: not persisted in this mock app)
  - Pass toggle handler to PhotoCard components
- [ ] Add filter option to view only favorites:
  - Add "Show Favorites Only" toggle button above gallery grid
  - Filter displayed photos based on `isFavorite` status
  - Display count of favorited photos

### Styling
- [ ] Heart icon colors:
  - Unfavorited: gray outline (`text-gray-400 dark:text-gray-500`)
  - Favorited: red filled (`text-red-500 dark:text-red-400`)
  - Hover effect with color transition
- [ ] Button styling:
  - Semi-transparent background: `bg-white/80 dark:bg-slate-800/80`
  - Rounded corners and subtle shadow
  - Backdrop blur for modern look
- [ ] Animation on favorite toggle:
  - Use Framer Motion for scale animation (1 → 1.2 → 1)
  - Smooth color transition (0.2s duration)
- [ ] Ensure mobile-responsive design
- [ ] Match existing PixelPerfect Gallery theme and dark mode support

### Testing Considerations
- [ ] Verify favorite toggle updates UI immediately
- [ ] Verify favorite count increments/decrements correctly
- [ ] Test filter shows only favorited photos
- [ ] Test dark mode styling for all components
- [ ] Verify animations work smoothly
- [ ] Test mobile responsiveness
- [ ] Ensure icons are accessible with proper aria-labels

## Acceptance Criteria
- [ ] Photo interface includes favorite-related fields
- [ ] FavoriteButton component renders correctly with heart icon
- [ ] Clicking heart icon toggles favorite status with animation
- [ ] Favorite count displays and updates correctly
- [ ] Filter option shows only favorited photos
- [ ] Styling matches PixelPerfect Gallery design system
- [ ] Dark mode works correctly for all new components
- [ ] Mobile-responsive design works on all screen sizes
- [ ] All TypeScript types are properly defined
- [ ] Code follows Next.js 15 and React best practices

## Technical Notes
- Use TypeScript for all new components with proper type definitions
- Follow the existing component barrel pattern (export from `src/components/ui/index.ts`)
- Mark components with `'use client'` only if they use state or interactivity
- Use Framer Motion for animations (already installed)
- Use Lucide React for icons (already installed)
- Follow existing Tailwind CSS patterns from `globals.css`
- This is a mock app - favorites won't persist on refresh (local state only)

## Examples

**Example 1: First favorite**
- Current: isFavorite = false, favoriteCount = 0
- User clicks heart
- Result: isFavorite = true, favoriteCount = 1

**Example 2: Unfavorite**
- Current: isFavorite = true, favoriteCount = 5
- User clicks heart
- Result: isFavorite = false, favoriteCount = 4

**Example 3: Filtering favorites**
- Gallery has 9 photos, 3 are favorited
- User clicks "Show Favorites Only"
- Result: Only 3 favorited photos display in grid
```

</details>

> [!NOTE]
> Only use the manual method if you run in to issues utilizing the GitHub MCP

#### FALLBACK ONLY: Manual Creation on GitHub.com

In the event that you are unable to create the issue through Copilot and MCP, follow these steps to create the issue manually:

1. Navigate to your repository on GitHub.com
2. Click the **Issues** tab
3. Click **"New issue"**
4. Use the template above

### Step 7.2: Verify the Issue

1. **Check the issue was created**: Navigate to the Issues tab and confirm your issue appears
2. **Review the content**: Make sure all sections are complete and clear
3. **Note the issue number**: You'll reference this issue in Lab 9

> [!NOTE]
> **Do not assign this issue to @copilot yet!** You'll do that in Lab 9 when you learn about the Coding Agent. For now, just create the issue and leave it unassigned.

### ✅ Success Criteria
- [ ] Issue created in your repository with the title "Add photo favorites system with heart icon"
- [ ] Issue description includes all sections: User Story, Requirements, Acceptance Criteria, Technical Notes, and Examples
- [ ] Issue is left unassigned (you'll assign it to @copilot in Lab 9)
- [ ] You understand how this issue will be used with Coding Agent in the next lab

## 🏆 Exercise Wrap-up

Excellent work! You've mastered Model Context Protocol integration:
- ✅ Installed and configured GitHub MCP server
- ✅ Used MCP to interact with GitHub repositories, issues, and PRs through natural conversation
- ✅ Learned to configure MCP tools for optimal performance
- ✅ Understood how MCP extends Copilot's capabilities
- ✅ Explored the broader MCP ecosystem

### Reflection Questions:
1. **How can GitHub MCP integration improve your development process?**
2. **What other MCP servers might benefit your team (Jira, Slack, database)?**
3. **What workflows could be streamlined with MCP integrations?**
4. **How would you balance tool availability with performance?**
5. **What security considerations should you keep in mind with MCP?**

### Key Takeaways:
- MCP extends Copilot's capabilities by connecting to external services
- Natural conversation with MCP is more effective than explicit commands
- Selective tool configuration maintains optimal performance
- The MCP ecosystem provides integrations for many popular tools
- MCP creates a unified interface for accessing diverse data sources
- Combining MCP with other Copilot features creates powerful workflows

## Coming up next...

In the next lab, you'll explore GitHub Copilot Spaces:
- Create dedicated AI workspaces for focused development
- Configure custom instructions and curated context for each Space
- Use Spaces from your IDE via MCP integration
- Apply Spaces to real-world collaboration scenarios
