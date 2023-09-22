# Node CRUD - Not finished yet

Problem :

- Get detail (not displaying)

- Edit data (not working)

- Save data (not working)

- Delete data (not working)

#### Update

CRUD all working now

- Get detail:

```
db.query(sql, (err, row) => {
    ...
});
```

`row` parameter is an array with an object inside, so we need one row for fetch array element that is an object

```
db.query(sql, (err, row) => {
    ...

    const kontak = row[0]
});
```

If showing on console :

```
console.log(row)
console.log(row[0])
```
result:
```
[ RowDataPacket { id: 1, nama: 'John', nohp: '29348759' } ]
RowDataPacket { id: 1, nama: 'John', nohp: '29348759' }
```

- Edit data (same with get detail)

- Save data (no problem)

- Delete data
```
app.delete("/:id/delete", (req, res) => {
  ...
});
```

Change the method with `get`

```
app.get("/:id/delete", (req, res) => {
  ...
});
```
