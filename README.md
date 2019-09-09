# Turbo Broccoli

[![License](https://img.shields.io/github/license/aensley/turbo-broccoli)](LICENSE)
[![Build Status](https://travis-ci.com/aensley/turbo-broccoli.svg?branch=master)](https://travis-ci.com/aensley/turbo-broccoli)
[![Maintainability](https://api.codeclimate.com/v1/badges/a0ae0b1e563a50f4fa09/maintainability)](https://codeclimate.com/github/aensley/turbo-broccoli/maintainability)
[![JavaScript Style](https://img.shields.io/badge/JS-standard-brightgreen?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABLUExURUxpcfPgR/PgR+bURfThR/PgR/PgR/XiR/PgR/ThR/PgR/PgR/PgR/HfR/ThR+PQRJGHN+zZRsO0P6GVOX93NayfPMu7QdbFQnFqMxQPmaUAAAAOdFJOUwAjbtNHA+kX1cGKBI8DvvajnAAAAIdJREFUGNNljwEPhCAIha00te4ERK3//0sD61q33hiDb0PfM0a12hitM7eGz5zSvAzX6seQusLoZXU2plvRfo0PiXQmkAaTF9A459xqlY4KJkQuiAULcwcBTm1ABEGBvpCZS9OPfqDKCTwAVWwFH4D3ivsFujHYSEqNubf1Hm75C3cGinbt4wF3+QpVhYZHvgAAAFd6VFh0UmF3IHByb2ZpbGUgdHlwZSBpcHRjAAB4nOPyDAhxVigoyk/LzEnlUgADIwsuYwsTIxNLkxQDEyBEgDTDZAMjs1Qgy9jUyMTMxBzEB8uASKBKLgDqFxF08kI1lQAAAABJRU5ErkJggg==)](https://standardjs.com)
[![Stylelint Standard](https://img.shields.io/badge/stylelint-standard-brightgreen?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xMkMEa+wAAAVESURBVGhD1Zl5yGZTHMdfg7FP9j2GssU0f6ApohBSJDRZomRNScmS7R80ZQ1lz5qsM4lCFAkhBo0t/GUp/pgh+75+Po/nvJ3nvL9zn/s+7/u888y3PjP3vef8lnvvuef+znnGGrQWbAabd9kEZsGwZQxjpbjmYC6T0oZwLbwLy7r/vwg7wbBlDGPlsc3FnFrJK74H/oJ/M/6Gk0BtDwfBOp2/pqa1QV9zO3/9H8NYeWxzMSdza9Q28Bj8A7mDxF2gjocf4EHYCwYZWtrsCQ+Avk4EZYwotjmZmzmG2hGegcg48R5sDF5AusivYBH4VNpqO7gStNWHvrwAfRsjj1lijubao93hJYgMcn6C/eBYyJ+Sx+/D6TAHVgPvcI7nbDsVTLK096bo2xjpfA1zNeeO9oc3IeoYcTEcB3kCid/gMrgVHoGHu3h8G1wKv0Jpp68TQN9lWw1zNvexxyFKpsbTcBqUL5p47g5Ynp1LfA23Qzk5iPHPAH2XbTW0MffOeHoIIscRH8L5EPUf9AK0uxD0XbZF6MOcx9+FjeAGcAhEBjkfwQVQu5MOH/t8AyYtHn8Mt0DtyV0E2pVtJeZorubcI+d0E/sWIsNE7QJM4i04GHaGeQW7gPP9Uigvou0FmJuxq9+fLeBViIwT0QV8Dr68W0M/bQWXgDbJvu0FmJs5hloffPzl3SlJF2C/78APj3fYabKt7LsH3An6aHsB9nMYmmuP/JxfBX9CZJjjWD4ZlsChMBsi+VFaCAfCmp4IpO0hoK9TQN9RzBxzNFdz7si74QzQ5gWWz2BvcA4ed1LID9f14EvtuD0catKHvvSp7yhmibmac+ep+4+f9ahjxB/gnfoEdoVIlr95WXIO1KQPfelT33msJq6A8WFr3f0CRB1r+BL79azpCHgdHB4TapdM+oim5CaeB3Pu0b7wJUQGNSwPavLuWPv0K7n1EfmuYY7mGupcmMxjfAdcPQ0qbfUR+Y4wN3OsagOw5o6MI76H6t1oIW31EfmOMDdzbJTzsy9V5CDCumhQaRv5jPAlN7dWcnHxM0SOSp6A2regSdpoG/kscY2QVmyt5DToVzlyVuLc3TTL1KRN23nfXCa9M+Gyr81CxxfrKCilvUPERfq6niikTZsJ4w3Q10A6DCyFI8c5bnvkWh3uBttcgbmCK6VN6afE2OYwsCwJLod+Bd4rkM8O5fg+C3LZV5vcR4kxjW0OU9Km8CxEQRIrYD7k2gcWw41QlsD2jVZtOcacyjemRwvgC4gCiUWbuw2l1oDoDtpXm8iXGMuY06qz4XeIAsq9MF5cNcg+9o18iDGMNe1aD9yJi4KKez0TCqxA9mnavDKGsYYiS9/azsGP0Nmn6SP72Dfyoe9aiT5tckqsJeAio5/sE9nq0x2/ocvl4U0QJfEkNJUVttknstVnbek57doWXoMyiU9hB1Au9G8GtwvT3r5t9int9FXddR6W3P8p53JnkCPBmebR7jlXWy7YlW3lTKYPfc24TNK9oHI5eDVYSrip69+2u4uhroG8r236aDP9DkVu7z0FeVIvg9PgbuDOxHng0tK9HNvyvtpO2CKcafkLTT6uHRJlWaHK8kEbbUdCZ0LaV7JEcPu9lOdS+WBfbUZG1vv3Qbq790NeA3nsudRu32iNsFLlz6OpRPgAtoQkjz1nm31m4ufagXQM+IvjL+CeaJLHnrPNPiMry+frwDvt9Jjksedss89Iy/1/9/GfAzduxWPP2bZKyCHzNjjWxeN8SI28/LK6I3F0F49X2td2ULmetfY/oHu8SsqaaIgl8tjYf1yzYkACwpraAAAAAElFTkSuQmCC)](https://github.com/stylelint/stylelint-config-standard)
[![Markdownlint Standard](https://img.shields.io/badge/markdownlint-standard-brightgreen)](https://github.com/markdownlint/markdownlint)
[![EditorConfig](https://img.shields.io/badge/-EditorConfig-blue?logo=data:image/png;base64,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)](.editorconfig)

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
1. When you have created and downloaded your complete icon package, place its contents in the directory: `/assets/icon/`
1. Set the site's **theme_color** in `_config.yml` to the same color value used on the Favicon Generator.
1. Set the site's **logo_image** in `_config.yml` to `1`.

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
