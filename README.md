# Turbo Broccoli

[![License](https://img.shields.io/github/license/aensley/turbo-broccoli)](LICENSE)
[![Build Status](https://travis-ci.com/aensley/turbo-broccoli.svg?branch=master)](https://travis-ci.com/aensley/turbo-broccoli)
[![Maintainability](https://api.codeclimate.com/v1/badges/a0ae0b1e563a50f4fa09/maintainability)](https://codeclimate.com/github/aensley/turbo-broccoli/maintainability)

A Jekyll theme for GitHub Pages. It's fast, and it's good for you.

## Purpose

Turbo Broccoli is a simple theme intended primarily for technical documentation or training. It is based on [Bootstrap 4](https://getbootstrap.com/), supporting [Bootswatch themes](https://bootswatch.com/) and [Font Awesome 5 icons](https://fontawesome.com/)

## Features

Features include:

* Responsive layout thanks to [Bootstrap 4](https://getbootstrap.com/)
* [Bootswatch theme support](https://bootswatch.com/)
* [Font Awesome 5 icons](https://fontawesome.com/)
* Automatic Table of Contents for each page powered by [Tocbot](https://tscanlin.github.io/tocbot/)
* Search capability powered by the GitHub API
* Simple YouTube embeds
* Image viewer
* [Favicon support](https://realfavicongenerator.net/)
* [Clipboard support](https://clipboardjs.com/)
* [DataTables support](https://datatables.net/)
* Print view
* Custom navbar Links
* Buttons to encourage page editing and sharing

### Favicon

To create an icon for your site:

1. Upload your square, transparent high-quality logo file to: [realfavicongenerator.net](https://realfavicongenerator.net/)
2. When you have created and downloaded your complete icon package, place its contents in the directory: `/assets/icon/`
3. Set the site's **theme_color** in `_config.yml` to the same color value used on the Favicon Generator.
4. Set the site's **logo_image** in `_config.yml` to `1`.

### Page Structure

Each page is intended to be stored directly under the `_pages` directory. It must be a MarkDown (`.md`) file.

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
| `order` | **YES** | The order in which to display the page. This determines the page's position within its menu or within the main navbar if no menu is specified. |
| `icon` | no | The page's icon, displayed just before the title in navbar links and the page header. Must be the [full class string](https://fontawesome.com/how-to-use/on-the-web/referencing-icons/basic-use) from one of the [free Font Awesome 5 icons](https://fontawesome.com/icons?d=gallery&m=free). |
| `menu` | no | Must be one of the `menus` in [\_config.yml](https://github.com/aensley/turbo-broccoli/blob/master/_config.yml) if specified. If not specified, it will be treated as a top-level page in the main navbar. |
| `exclude_from_header` | no | Set to `true` if you want to exclude the page from the main navbar. This should almost never be set. |
| `permalink` | no | Set this to override the default permalink of `/:basename`. This should almost never be set. |

#### Headings

Each page should be well-structured with nested levels of headings (h2 - h6). These are used to automatically generate the table of contents on each page. Headings can be added using the following markdown:

```MarkDown
## h2
### h3
#### h4
##### h5
###### h6
```

The `# h1` heading is reserved for the page title only and must not be used in page markdown files.

#### MarkDown

Most [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/) features are supported, including tables, lists, images, links, quotes, syntax highlighting, username @mentions, and emojis. The only features unavailable are automatic code/commit/issue links.
