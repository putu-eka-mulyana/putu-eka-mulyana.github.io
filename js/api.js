const url = "https://api.football-data.org/v2/";
const token = "c2f6acd4b35b4a63a124916a6ae3afd8";

function json(response) { return response.json(); }

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}
function getTeam() {
  if ('caches' in window) {
    caches.match(`${url}teams`).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var Items = "";
          data.teams.forEach(item => {
            if (item.crestUrl !== null) {
              Items += `
                    <div class="col s12 l6 xl6 ">
                    <div class="card hoverable">
                    <div class="card-image">
                        <img class="my-responsive-img" src="${item.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="${item.name}">
                        <a class="btn-floating halfway-fab waves-effect waves-light red" onclick="save('${item.id}')"><i class="material-icons">favorite</i></a>
                      </div>
            
                      <div class="card-content">  
                      <ul class="collection">
                          <li class="collection-item"><span class="badge">${item.name}</span>Nama Team</li>
                          <li class="collection-item"><span class="badge">${item.website}</span>Website</li>
                          <li class="collection-item"><span class="badge">${item.phone}</span>Kontak</li>
                          <li class="collection-item"><span class="badge">${item.address}</span>Alamat</li>
                          <li class="collection-item"><span class="badge">${item.founded}</span>Tahun Berdiri</li>
                        </ul>
                          </div>
                    </div>
                  </div>
                    `
            }
          });
          document.getElementById('teamlist').innerHTML = Items;
        })
      }
    })
  }
  fetch(`${url}teams`, {
    method: "GET",
    headers: {
      'X-Auth-Token': token
    }
  })
    .then(status)
    .then(json)
    .then(function (response) {
      var Items = "";
      response.teams.forEach(item => {
        if (item.crestUrl !== null) {
          Items += `
            <div class="col s12 l6 xl6 ">
            <div class="card hoverable">
            <div class="card-image">
                <img class="my-responsive-img" src="${item.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="${item.name}">
                <a class="btn-floating halfway-fab waves-effect waves-light red" onclick="save('${item.id}')"><i class="material-icons">favorite</i></a>
              </div>
    
              <div class="card-content">  
              <ul class="collection">
                  <li class="collection-item"><span class="badge">${item.name}</span>Nama Team</li>
                  <li class="collection-item"><span class="badge">${item.website}</span>Website</li>
                  <li class="collection-item"><span class="badge">${item.phone}</span>Kontak</li>
                  <li class="collection-item"><span class="badge">${item.address}</span>Alamat</li>
                  <li class="collection-item"><span class="badge">${item.founded}</span>Tahun Berdiri</li>
                </ul>
                  </div>
            </div>
          </div>
            `
        }
      });
      document.getElementById('teamlist').innerHTML = Items;
    })
}

function getKopetensi() {
  if ('caches' in window) {
    caches.match(`${url}competitions`).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          console.log(data);
          var Items = "";
          data.competitions.forEach(item => {
            if (item.currentSeason !== null) {
              Items += `
                    <tr>
                          <td>${item.name}</td>
                          <td>${item.area.name}</td>
                          <td>${item.numberOfAvailableSeasons}</td>
                          <td>${item.currentSeason.startDate}</td>
                          <td>${item.currentSeason.endDate}</td>
                      </tr>
                    `
            }
          });
          document.getElementById('tabelKopotensi').innerHTML = Items;
        })
      }
    })
  }
  fetch(`${url}competitions`, {
    method: "GET",
    headers: {
      'X-Auth-Token': token
    }
  })
    .then(status)
    .then(json)
    .then(function (response) {
      var Items = "";
      response.competitions.forEach(item => {
        if (item.currentSeason !== null) {
          Items += `
                <tr>
                <td>${item.name}</td>
                <td>${item.area.name}</td>
                <td>${item.numberOfAvailableSeasons}</td>
                <td>${item.currentSeason.startDate}</td>
                <td>${item.currentSeason.endDate}</td>
              </tr>
            `
        }
      });
      document.getElementById('tabelKopotensi').innerHTML = Items;
    })
}
function getTeamById(id) {
  return new Promise(function (resolve, reject) {
    fetch(`${url}teams/${id}`, {
      method: "GET",
      headers: {
        'X-Auth-Token': token
      }
    })
      .then(status)
      .then(json)
      .then(function (response) {
        resolve(response)
      })
  })
}
function getFavorit() {
  getAllTeamFavorit().then(function(data){
    var Items="";
    data.forEach(item => {
      Items += `
            <div class="col s12 l6 xl6 ">
            <div class="card hoverable">
            <div class="card-image">
                <img class="my-responsive-img" src="${item.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="${item.name}">
                <a class="btn-floating halfway-fab waves-effect waves-light red" onclick="onDelete('${item.id}')"><i class="material-icons">clear</i></a>
              </div>
    
              <div class="card-content">  
              <ul class="collection">
                  <li class="collection-item"><span class="badge">${item.name}</span>Nama Team</li>
                  <li class="collection-item"><span class="badge">${item.website}</span>Website</li>
                  <li class="collection-item"><span class="badge">${item.phone}</span>Kontak</li>
                  <li class="collection-item"><span class="badge">${item.address}</span>Alamat</li>
                  <li class="collection-item"><span class="badge">${item.founded}</span>Tahun Berdiri</li>
                </ul>
                  </div>
            </div>
          </div>
       `
    });
    document.getElementById('teamfavorit').innerHTML = Items;
  })
}