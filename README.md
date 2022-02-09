# EMPTY_MEAN_STACK
### A basic empty mean stack ready to code !

Don't forget to create a user in mongo db for your express server.
In mongo container execute following instructions :
```
> mongo
> use admin
> db.auth("root", "example")
> use MEAN
> db.createUser({user:"client", pwd: "client", roles:[{role: "readWrite", db: "MEAN"}]})
```

From there, everything will be fine and you may use mongo now.
