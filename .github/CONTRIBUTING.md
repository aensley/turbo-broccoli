# Contributing

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

The following is a set of guidelines for contributing to this project.

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How To Contribute

### Suggestions

This section guides you through submitting a suggestion. Following these guidelines helps maintainers and the community understand your suggestion :pencil: and find related suggestions :mag_right:.

Before submitting a suggestion, please **Perform a [cursory search](https://github.com/aensley/turbo-broccoli/issues?utf8=✓&q=is%3Aissue)** to see if it has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.

When you are creating a suggestion, please [include as many details as possible](#how-do-i-submit-a-good-enhancement-suggestion) and fill in the template.

#### How To Submit A (Good) Enhancement Suggestion

Suggestions are tracked as [GitHub issues](https://guides.github.com/features/issues/). [Create an issue](https://github.com/aensley/turbo-broccoli/issues/new?template=suggestion.md&labels=suggestion&projects=aensley/turbo-broccoli/1) and provide the following information by filling in the template:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide specific examples**. Include copy/pasteable snippets which you use in those examples, as [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Include screenshots and animated GIFs** which help you demonstrate the steps or what the suggestion is related to. You can use Snagit to record both.
* **Explain why this enhancement would be useful** to users.

### Pull Requests

The process described here has several goals:

* Maintain quality
* Fix problems that are important to users
* Enable a sustainable system for maintainers to review contributions

Please follow these steps to have your contribution considered by the project's maintainers:

1. Identify the issue resolved by this pull request using `Fixes #issue_number`.
1. Include a summary of the change.
1. Reference any other related issues. e.g. `Related to #issue_number and #issue_number`.
1. After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing <details><summary>What if the status checks are failing?</summary>If a status check is failing, and you believe that the failure is unrelated to your change, please leave a comment on the pull request explaining why you believe the failure is unrelated. A maintainer will re-run the status check for you. If we conclude that the failure was a false positive, then we will open an issue to track that problem with our status check suite.</details>

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

## Styleguides

### Page Structure

Each page in this documentation is stored directly under the `_pages` directory. It must be a MarkDown (`.md`) file.

#### Front Matter

Each page must have a [Jekyll Front Matter section](https://jekyllrb.com/docs/front-matter/).

##### Example

```MarkDown
---
title: High-Level Process
menu: General
icon: fas fa-sitemap
order: 1
---
```

##### Variables

| Variable | Required | Description |
| --- | :---: | --- |
| `title` | **YES** | The displayed title in the navbar and on the page itself. The filename must match this with all non-alphanumeric characters replaced with dashes. _Example: If the title is `High-Level Process`, the filename must be `High-Level-Process.md`. **Capitalization matters**._ |
| `order` | **YES** | The order in which to display the page. This determines the page's position within its category or within the main navbar if no category is specified. |
| `icon` | no | The page's icon, displayed just before the title in navbar links and the page header. Must be the [full class string](https://fontawesome.com/how-to-use/on-the-web/referencing-icons/basic-use) from one of the [free Font Awesome icons](https://fontawesome.com/icons?d=gallery&m=free). |
| `menu` | no | Must be one of the `menus` in [\_config.yml](https://github.com/aensley/turbo-broccoli/blob/master/_config.yml) if specified. If not specified, it will be treated as a top-level page in the main navbar. |
| `exclude_from_header` | no | Set to `true` if you want to exclude the page from the main navbar. This should almost never be set. |
| `permalink` | no | Set this to override the default permalink of `/:basename`. This should almost never be set. |

#### Headers

Each page should be well-structured with nested levels of headers (h2 - h6). These are used to automatically generate the table of contents on each page. Headers can be added using the following markdown:

```MarkDown
## h2
### h3
#### h4
##### h5
###### h6
```

The `# h1` header is reserved for the page title only and must not be used in page markdown files.

#### MarkDown

Most [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/) features are supported, including tables, lists, images, links, quotes, syntax highlighting, username @mentions, and emojis. The only features unavailable are automatic code/commit/issue links.

### JavaScript

Use StandardJS formatting for all custom JavaScript.

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* When only changing documentation, include `[ci skip]` in the commit title
* Consider starting the commit message with an applicable emoji:
  * :art: `:art:` when improving the format/structure of the code
  * :racehorse: `:racehorse:` when improving performance
  * :non-potable_water: `:non-potable_water:` when plugging memory leaks
  * :memo: `:memo:` when writing docs
  * :penguin: `:penguin:` when fixing something on Linux
  * :apple: `:apple:` when fixing something on macOS
  * :checkered_flag: `:checkered_flag:` when fixing something on Windows
  * :heavy_plus_sign: `:heavy_plus_sign:` when adding a feature or enhancement
  * :bug: `:bug:` when fixing a bug
  * :fire: `:fire:` when removing code or files
  * :green_heart: `:green_heart:` when fixing the CI build
  * :white_check_mark: `:white_check_mark:` when adding tests
  * :lock: `:lock:` when dealing with security
  * :arrow_up: `:arrow_up:` when upgrading dependencies
  * :arrow_down: `:arrow_down:` when downgrading dependencies
  * :shirt: `:shirt:` when removing linter warnings

## Additional Notes

### Issues, Pull Requests, and Labels

[GitHub search](https://help.github.com/articles/searching-issues/) makes it easy to use labels for finding groups of issues or pull requests you're interested in. We  encourage you to read about [other search filters](https://help.github.com/articles/searching-issues/) which will help you write more focused queries.
