# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "turbo-broccoli"
  spec.version       = "0.1"
  spec.authors       = ["aensley"]
  spec.email         = ["aensley@users.noreply.github.com"]

  spec.summary       = "A Jekyll theme for GitHub Pages. It's fast, and it's good for you."
  spec.homepage      = "https://github.com/aensley/turbo-broccoli"
  spec.license       = "MIT"

  spec.metadata["plugin_type"] = "theme"

  spec.files = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r!^(assets|_(includes|layouts|sass)/|(LICENSE|README)((\.(txt|md|markdown)|$)))!i)
  end

  spec.add_runtime_dependency "jekyll", ">= 3.5", "<= 5.0"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.12"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.6"

  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.3"
  spec.add_runtime_dependency "jekyll-mentions", "~> 1.5"
  spec.add_runtime_dependency "jekyll-redirect-from", "~> 0.15"
  spec.add_runtime_dependency "jemoji", "~> 0.11"

  spec.add_development_dependency "bundler", "~> 2.0"
end
