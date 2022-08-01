let id = 0;
export class Serie {
    constructor(title, description, genre, seasons){
        this.id = id++;
        this.title = title;
        this.description = description;
        this.genre = genre;
        this.seasons = seasons;
    }
}