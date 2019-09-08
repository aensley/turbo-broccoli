---
title: Themes
icon: fas fa-palette
menu: Features
order: 9
---

## Choose a Theme

Click on a theme to preview it.

When you find a theme you like, enable it by changing the `bootswatch_theme` setting in `_config.yml`.

The value of `bootswatch_theme` must be all lowercase.

### Examples

```yaml
bootswatch_theme: "flatly"
```

```yaml
bootswatch_theme: "materia"
```

```yaml
bootswatch_theme: "slate"
```

<div class="row" id="bootswatchSwitcher"></div>

<script>
(function (d, w) {
    d.addEventListener('DOMContentLoaded', function(){
        $(function(){
            const $bootswatchTheme = $('#bootswatchTheme')
            const $bootswatchSwitcher = $('#bootswatchSwitcher')
            const bootswatchUrl = 'https://stackpath.bootstrapcdn.com/bootswatch/{{ site.versions.bootstrap }}/%THEME%/bootstrap.min.css'
            const themes = [
                'Cerulean',
                'Cosmo',
                'Cyborg',
                'Darkly',
                'Flatly',
                'Journal',
                'Litera',
                'Lumen',
                'Lux',
                'Materia',
                'Minty',
                'Pulse',
                'Sandstone',
                'Simplex',
                'Sketchy',
                'Slate',
                'Solar',
                'Spacelab',
                'Superhero',
                'United',
                'Yeti'
            ]
            themes.forEach(function(theme){
                $bootswatchSwitcher.append(
                    '<div class="col-lg-4 col-sm-6">' +
                        '<a href="#" data-theme="' + theme.toLowerCase() + '">' +
                            '<img src="https://bootswatch.com/' + theme.toLowerCase() + '/thumbnail.png" alt="' + theme + '"/>' +
                        '</a>' +
                    '</div>'
                )
            })
            $('[data-theme]').click(function(e){
                e.stopPropagation()
                $bootswatchTheme.attr('href', bootswatchUrl.replace('%THEME%', $(this).attr('data-theme')))
                return false
            })
        })
    })
})(document, window)
</script>
