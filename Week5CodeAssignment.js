class Song {
    constructor(song, artist) {
        this.song = song;
        this.artist = artist;
    }
    description() {
        return `${song} by ${artist}`;
    }
}

class Playlist {
    constructor(name) {
        this.name = name;
        this.songs = [];
    }
    addSong(song) {
        if (song instanceof Song) {
            this.songs.push(song);
        } else {
            throw new Error`You must submit a song. Argument is not a song: ${song}`;
        }
    }
    describe() {
        return `${this.name} has ${this.songs.length} songs`
    }
}

class Menu {
    constructor() {
        this.playlists = [];
        this.selectedPlaylist = null;
    }
    start() {
        let selection = this.mainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createPlaylist();
                    break;
                case '2':
                    this.viewPlaylist();
                    break;
                case '3':
                    this.deletePlaylist();
                    break;
                case '4':
                    this.displayAllPlaylists();
                    break;
                default:
                    selection = 0
            }
            selection = this.mainMenuOptions();
        }
        alert("Peace out!");
    }
    mainMenuOptions() {
        return prompt(`
        0) Exit
        1) Create Playlist
        2) View Playlist
        3) Delete Playlist
        4) Show all Playlists
        `)
    }
    playlistMenuOptions(playlistInfo) {
        return prompt(`
        0) Go Back
        1) Add Song
        2) Delete Song
        ----------------
        ${playlistInfo}
        `)
    }
    displayAllPlaylists() {
        let playlistString = '';
        for (let i = 0; i < this.playlists.length; i++) {
            playlistString += i + ') ' + this.playlists[i].name + '\n';
        }
        alert(playlistString);
    }
    createPlaylist() {
        let name = prompt("Please enter the desired Playlist Name.");
        this.playlists.push(new Playlist(name));
    }
    viewPlaylist() {
        let index = prompt('Please enter the index of the Playlist you wish to view');
        if (index > -1 && index < this.playlists.length) {
            this.selectedPlaylist = this.playlists[index];
            let description = "Playlist name: " + this.selectedPlaylist.name + '\n';

            for (let i = 0; i < this.selectedPlaylist.songs.length; i++) {
                description += i + ') ' + this.selectedPlaylist.songs[i].song
                    + ' - ' + this.selectedPlaylist.songs[i].artist + '\n';
            }

            let selection = this.playlistMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createSong();
                    break;
                case '2':
                    this.deleteSong();
            }
        }
    }
    createSong() {
        let song = prompt('Please enter the name of the song:');
        let artist = prompt('Please enter the name of the artist:');
        this.selectedPlaylist.songs.push(new Song(song, artist));
    }
    deleteSong() {
        let index = prompt('Please enter the index of the song you wish to delete:');
        if (index > -1 && index < this.selectedPlaylist.songs.length) {
            this.selectedPlaylist.songs.splice(index, 1);
        }
    }
    deletePlaylist() {
        let index = prompt('Please enter the index of the playlist you wish to delete:');
        if (index > -1 && index < this.playlists.length) {
            this.playlists.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();
