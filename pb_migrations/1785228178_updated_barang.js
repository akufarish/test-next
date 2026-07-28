/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3342096275")

  // add field
  collection.fields.addAt(6, new Field({
    "help": "",
    "hidden": false,
    "id": "file1083423450",
    "maxSelect": 0,
    "maxSize": 0,
    "mimeTypes": null,
    "name": "gambar",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": null,
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3342096275")

  // remove field
  collection.fields.removeById("file1083423450")

  return app.save(collection)
})
