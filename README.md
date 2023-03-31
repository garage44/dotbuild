# Dotbuild

Dotbuild is a simple Vue/lit-html task-based developer toolchain for frontend devs who 
care about configuration by code, simplicitity and conventions where convenient. It is 
slightly inspired by the old Gulp taskrunner, but just runs Promise-based tasks without 
the streams paradigm. It utilizes developer tools like [esbuild](https://esbuild.github.io/) 
and [sass](https://sass-lang.com/), trying to reuse existing tools where possible, and use 
the Platform™ where feasible.

## New project

```bash
pnpm i @garage44/dotbuild --global
mkdir project;cd project
pnpm init # Add "type": "module"
pnpm dotbuild boilerplate
pnpm dotbuild dev
```

