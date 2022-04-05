---
title: Data binding
---

Contember Admin fully handles data binding between your React components and GraphQL. That means that you don't need to worry about data fetching, updating or saving. You'll just use React components.

## Two pass rendering

Before we can render a component, data binding needs to know what data a component needs. This is done in the phase we call "static render". Every component, that supports data binding, has a static render method, which provides all the information about fields and other component dependencies.

![databinding](/assets/databinding.svg)

