function save(e){
    if (navigator.onLine) {
        let item = getTeamById(e)
        item.then(function(data){
            AddFavorit(data)
        })
    } else {
        let msg ='Anda sedang offline tidak bisa menambahakan team ke favorit';
        M.toast({html: msg,classes:'yellow darken-4'})
    }
}
function onDelete(e) {
    deleteTeam(e)
}