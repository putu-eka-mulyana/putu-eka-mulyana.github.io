const dbPromised = idb.open("teamsFootball", 1, function(upgradeDb) {
    const teamSObjectStore = upgradeDb.createObjectStore("teams", {
      keyPath: 'id'
    });
    teamSObjectStore.createIndex("name", "name", {
        unique: false
    });
});
function AddFavorit(team) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        store.put(team);
        return tx.complete;
      })
      .then(function() {
        let msg ='Anda berhasil menambahkan ke favarit';
        M.toast({html: msg,classes:'green darken-3'});
      }).catch(()=>{
        let msg ='Team Ini sudah ditambahkan ke Favorit';
        M.toast({html: msg,classes:'yellow darken-4'})
      })
  }
  function getAllTeamFavorit() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("teams", "readonly");
          var store = tx.objectStore("teams");
          return store.getAll();
        })
        .then(function(data) {
          resolve(data);
        });
    });
  }
  function deleteTeam(id) {
    dbPromised.then(function(db) {
        var tx = db.transaction('teams', 'readwrite');
        var store = tx.objectStore('teams');
        store.delete(Number(id));
        return tx.complete;
      }).then(function() {
        getFavorit()
        let msg ='Team Ini sudah dihapus ke Favorit';
        M.toast({html: msg,classes:'yellow darken-4'})
      });
  }