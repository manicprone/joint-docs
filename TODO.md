# Joint Kit Docs Planning


## Backlog

* A Joint in Practice: Separate code blocks into steps (by file).
  Also, keep the paragraph text above the code blocks, if needed.
  e.g.

  You can define your data models using the native service:
  | => Use Bookshelf natively
  | => Generate the models --> joint.generate();
  | => Example usage

  -or-

  You can define your models using a JSON descriptor (with a Joint):
  | => Use a model config
  | => Generate the models
  | => Example usage

  -------------------------

  You can hand-roll the methods yourself:
  | => Hand-roll a CRUD set of methods
  | => Example usage

  -or-

  You can configure the methods using a JSON descriptor:
  | => Use a method config
  | => Generate the methods
  | => Example usage

  -------------------------

  You can hand-roll the router yourself:
  | => Hand-roll a router
  | => Provide to your running server

  -or-

  You can define the router using a JSON descriptor:
  | => Use a route config
  | => Generate the router
  | => Provide to your running server --> write complete code

* Put prev / next navigation links between the sections, to make the full doc navigable.
