---
title: Configuration
order: 2
---

This page outlines the configuration options available in `_config.yml`.

## Title

```yaml
title: Turbo Broccoli
```

Sets the title of the site. This title is displayed in the browser tab and the footer of the page.

## Author

```yaml
author: aensley
```

Declares the author of the page. Used in the SEO meta tags in the HTML `<head>` section.

## Description

```yaml
description: >
  A Jekyll theme for GitHub Pages. It's fast, and it's good for you.
```

Sets the description of the site. This is displayed in the footer.

## Footer

```yaml
footer: >
  Footer goes here.
```

Sets the footer content.

## Menus

```yaml
menus:
 - Features
```

Sets the menus available in the header navbar.

## Header Links

```yaml
header_links:
  - text: Issues
    link: https://github.com/aensley/turbo-broccoli/issues/
    icon: fas fa-tasks
  - text: Donate
    link: https://andrewensley.com/donate/
    icon: fas fa-donate
```

Custom header links displayed on the right side of the header navbar next to Search.

## Bootswatch Theme

```yaml
bootswatch_theme: materia
```

Sets the Bootswatch Theme of the site. See the [Themes page](Themes) for available options.

## Theme Color

```yaml
theme_color: "#18bc9c"
```

Sets the primary color used in the site icon.

## Logo Image

```yaml
logo_image: 1
```

Set/uncomment this when you have created the site's logo files.

## Banner Image

```yaml
banner_image: /assets/media/banner.png
```

Uncomment and set to the path of a banner image to display at the top of every page.

Maximum displayed width is `825px`. Transparent PNG or GIF recommended.

The beginning slash (representing site-/repo-root) is required.

## Date Format

```yaml
date_format: "%b %-d, %Y"
```

Date format. See: [http://shopify.github.io/liquid/filters/date/](http://shopify.github.io/liquid/filters/date/)

## Scroll Past Content

```yaml
sroll_past_content: 1
```

Set/uncomment this to enable scrolling past page content. This is useful to ensure anchor links scroll to anchors at the bottom of the content.

## Search API

```yaml
api_token: 0123456789abcdef
api_endpoint: https://api.github.com
```

Uncomment `api_token` and set to a Personal Access Token to enable the Search functionality. Any valid access token (with no scopes/privileges enabled) will do.

See: [https://github.com/settings/tokens](https://github.com/settings/tokens)
