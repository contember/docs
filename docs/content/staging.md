---
title: Staging
---

Contember has a concept called "stages", which you can imagine like a git branches for your data. You work on a stage called *draft* and after you are happy with everything you made, you merge (we call this operation *release*) it into *live* stage. Using this feature you can edit already published post or a content on your front page without showing ongoing changes to the end user.

For each stage there is a database schema in your database. This has some consequences: the good one is that it is very cheap and fast to read data from individual stages. On the other hand releasing changes from one stage to another is not the fastest operation.

## Configuring stages

in `config.yaml` of your instance you can add some stages
```
projects:
  my-blog:
    stages:
      live: ~
      draft:
        base: live
```

It is required that there is a single root stage - *live* in the example. Other stages must have a `base` stage defined.

> Currently it is not recommended to use more then two stages

## Event log

Every modification of your data is stored in an event log. This log is later used to transfer modifications from one stage to another. There is a mechanism in Contember which finds dependencies between individual events so it cannot happen e.g. that you publish a new post without publishing a category you created for this post.

## Diff

Besides Tenant API and Content API, there is a third kind of API - a System API. This one works across all stages, so there is a one System API per project. You find this API on `http://<hostname>/system/<project>`, e.g. http://localhost:1025/system/my-blog  


To get a list of not released events, use `diff` query:
```graphql
query {
  diff(baseStage: "live", headStage: "draft") {
    ok
    result {
       events {
         id
         dependencies
         description
         allowed
         type
       }
    }
  }
}
```

## Release

For releasing some events, use `release` mutation.
```graphql
mutation {
  release(baseStage: "live", headStage: "draft", events: ["91078d72-7a42-47e1-a3ea-9b177475b52a", "85ca70d7-7e31-41eb-bc77-735e7e9c62d1"]) {
    ok
  }
}

```

Don't forget to include all dependent events, otherwise the mutation will fail. It is required that head stage is rebased on the top of base stage

## Rebase

To rebase stages, run following mutation
```graphql
mutation {
  rebaseAll {
    ok
  }
}
``` 

This mutation will recursively traverse all stages and rebase them on their base stage.

So following event log (each letter represents single event)
```text
live:  A -- B -- C
             \
draft          -- D
```  
will be transformed into

```text
live:  A -- B -- C
                  \
draft               -- D
```    

## Conflicts

It is recommended to modify only leaf stages and release individual events into their base stages. But you are allowed to modify even the root stage. But make sure, you are not updating same data (same rows in a table). Otherwise Contember won't be able to resolve this state. 
