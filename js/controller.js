angular.module("SistemaDeMusicas", []);

angular.module("SistemaDeMusicas").controller("sistemaCtrl", function ($scope) {
            $scope.app = "SistemaDeMusicas";            
            $scope.artistas = [];
            $scope.albuns = [];
            $scope.musicas = [];
            $scope.favoritos = []; 
            $scope.statusArtista = "";
            $scope.playlist = [];
            $scope.album = [];



 
$scope.selecionar = function(selected) {
    $scope.selected = selected;
};

function Artista(nomeArtista, imagemArtista){
  this.nomeArtista = nomeArtista;
  this.imagemArtista = imagemArtista;

};
$scope.adicionarArtista = function (nomeArtista, imagemArtista) {
   if($scope.checarArtista(nomeArtista)){
      alert("artista já existente no sistema");
   }
   else {
    var novoArtista = new Artista(nomeArtista, imagemArtista);
    $scope.artistas.push(novoArtista)
    delete $scope.nomeArtista;
    delete $scope.imagemArtista;
  }
 };

 function Musica(nomeMusica, artistaMusica, albumMusica, anoLancamento, duracao){
  this.nome = nomeMusica;
  this.artista = artistaMusica;
  this.album = albumMusica;
  this.anoLancamento = anoLancamento;
  this.duracao = duracao;
 };

function Album(nomeAlbum, autorAlbum) {
    this.musicas = [];
    this.nomeAlbum = nomeAlbum;
    this.autorAlbum = autorAlbum;

    this.adicionar = function(musica) {
      if($scope.checarMusica(musica.nome)){
        alert("Música já existente no álbum");
        delete $scope.musica;
      }
      else{
        this.musicas.push(musica);
         alert("Musica adicionada no sistema");
      }
    }

     
     /* if(this.checarMusica(, musica.nome)){
        alert("Música já existente no álbum");
        delete $scope.musica;
      } else {
        this.musicas.push(musica);
        $scope.musicas.push(angular.copy(musica));
        delete $scope.musica;*/

    
};

  $scope.adicionarMusica = function(nomeMusica, artistaMusica, albumMusica, anoLancamento, duracao) {
    var album = new Album(retornaAlbum());
    var newMusica = new Musica(nomeMusica,artistaMusica,albumMusica,anoLancamento,duracao);
    album = retornaAlbum(newMusica.nomeAlbum, newMusica.artistaMusica);
    album.adicionar(newMusica);
    $scope.musicas.push(newMusica);
   
    delete $scope.nomeMusica;
    delete $scope.artistaMusica;
    delete $scope.albumMusica;
    delete $scope.anoLancamento;
    delete $scope.duracao;
};

$scope.checarMusica = function (nomeMusica) {
    for (i = 0; i < this.musicas.length; i++) {
        if (this.musicas[i].nome ===  nomeMusica) {
            return true;
        }
    }
    return false;

    
};

 retornaAlbum = function (nomeAlbum, autor) {
    for (i = 0; i < $scope.albuns.length; i++) {
      if ($scope.albuns[i].nomeAlbum == nomeAlbum) {
        return $scope.albuns[i];
      }
    }
    var novoAlbum = new Album(nomeAlbum, autor);
    $scope.albuns.push(novoAlbum);
    return novoAlbum;
};

function Favorito(artista) {
  this.artista = artista;
};

$scope.adicionarAosFavoritos = function (artista) {
  var novoFavorito = new Favorito(artista);
  $scope.favoritos.push(novoFavorito);

};

const existeArtistaNosFavoritos = function (nomeDoArtista) {
  for (i = 0; i < $scope.favoritos.length; i++) {
    if ($scope.favoritos[i].nome == nomeDoArtista) {
      return $scope.favoritos[i];
    }
  }
  return null;
};

$scope.excluirFavorito = function (favorito) {
  for (i = 0; i < $scope.favoritos.length; i++) {
    if ($scope.favoritos[i] == favorito) {
      $scope.favoritos.splice(i,1);
      alert("Artista excluído dos favoritos com sucesso");
    }
  }
};


 
$scope.retornaAlbuns = function (autor) {
  album = [];
  for (i = 0; i < $scope.albuns.length; i++) {
    if ($scope.albuns[i].autorAlbum == autor) {
      album.push($scope.albuns[i]);
    }
  }
  return album;
};

$scope.verificaTable = function (array) {
    return array.length > 0;
};



$scope.checarArtista = function(nomeArtista) {
    for (i = 0; i < $scope.artistas.length; i++) {
          if (nomeArtista === $scope.artistas[i].nome) {
            return true;
                      }
                  }
                  return false;
                };

$scope.atualizarInformacoesArtista = function (selectedItem) {
    for (i = 0; i < $scope.artistas.length; i++) {
      if ($scope.artistas[i].nome == selectedItem.nome) {
        $scope.artistas[i].nota = selectedItem.nota;
        $scope.artistas[i].ultimaMusica = selectedItem.ultimaMusica;
      }
    }
}

 $scope.avaliarArtista = function (artista, nota) {
        if (nota < 10 || nota > 0) {
            artista.avaliacaoUsuario = nota;
        }
        else {
            alert("Insira uma nota de 0 à 10.");
        }
    }; 
$scope.alterarUltimaMusica = function (artista, musica) {
    artista.alterarUltimaMusica = musica;
    };

$scope.adicionarMusicaNaPlaylist = function(musica) {
    if ($scope.checarMusica(this.playlist, musica.nome)) {
      alert("Música já existente na playlist!!!");
    } else {
      this.playlist.push(musica);
    }
  };

/*function Playlist(nome) {
  this.musicas = [];
  this.nome = nome;
  this.quantidade = 0;

  this.adicionarMusicaNaPlaylist = function (musica) {
    $scope.playlist.adicionarMusicaNaPlaylist(musica);
    delete musica;
  }
};*/



$scope.excluirMusicaPlaylist = function (musica) {
  for (i = 0; i < $scope.playlist.length; i++) {
    if($scope.playlist[i].nome == musica.nome) {
      $scope.playlist.splice(i,1);
      alert("música excluída da playlist!");
    }
  }
};

$scope.excluirPlaylist = function (playlist) {
  for (i = 0; i < $scope.playlists.length; i++) {
    if ($scope.playlists[i].nome == playlist.nome) {
      $scope.playlists.splice(i,1);
      alert("Playlist excluída!!");
    }
  }
};


$scope.verificaPlaylist = function (nomePlaylist) {
    for (i = 0; i < $scope.playlists.length; i++) {
      if ($scope.playlists[i].nome == nomePlaylist) {
        alert("Playlist já existe!!");
      }
    
    
    else {
        var novaPlaylist = new Playlist(nomePlaylist);
        $scope.playlists.push(novaPlaylist);
        return newPLaylist;
    }
    }

};

$scope.retornaMusicasPlaylist = function (playlist) {
    return playlist.playlist;
};

$scope.retornaPlaylists = function (nomePlaylist) {
  playlist = [];
  for (i = 0; i < $scope.playlists.length; i++) {
    if ($scope.playlists[i].nome == nomePlaylist) {
      playlist.push($scope.playlists[i]);
    }
  }
  return playlist;
};

$scope.retornaPlaylists = function (nomePlaylist) {
  playlist = [];
  for (i = 0; i < $scope.playlists.length; i++) {
    if ($scope.playlists[i].nome == nomePlaylist) {
      playlist.push($scope.playlists[i]);
    }
  }
  return playlist;
};

$scope.pesquisaArtista = function(nomeArtista) {
  for (i = 0; i < $scope.artistas.length; i++) {
          if (nomeArtista === $scope.artistas[i].nome) {
            return $scope.artistas[i];
          }
              
  return null;
  }
};

});