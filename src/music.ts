import { v4 } from "uuid";
// v4: uuid 라는 라이브러리가
// 랜덤한 아이드를 만들기 위해 쓰는 함수

// create music interface
export interface Music {
  title: string;
  artist: string;
  releaseDate: string;
  genre: string;
}

// create music class
export class MusicPlayer {
  private musicList: Music[] = [];
  private currentMusic: Music | null = null;

  constructor(musicList: Music[]) {
    this.musicList = musicList;
  }

  playMusic(music: Music) {
    this.currentMusic = music;
    return this.currentMusic;
  }

  getCurrentMusic() {
    return this.currentMusic;
  }

  stopMusic() {
    this.currentMusic = null;
    return this.currentMusic;
  }

  nextMusic() {
    if (this.currentMusic === null) {
      throw new Error("음악을 재생하고 있지 않습니다.");
    }

    const currentIndex = this.musicList.indexOf(this.currentMusic);

    if (currentIndex === this.musicList.length - 1) {
      this.currentMusic = this.musicList[0];
      //   this.currentMusic = null;
    } else {
      this.currentMusic = this.musicList[currentIndex + 1];
    }
    return this.currentMusic;
  }

  prevMusic() {
    if (this.currentMusic === null) {
      throw new Error("음악을 재생하고 있지 않습니다.");
    }
    const currentIndex = this.musicList.indexOf(this.currentMusic);

    if (currentIndex === 0) {
      this.currentMusic = this.musicList[this.musicList.length - 1];
    } else {
      this.currentMusic = this.musicList[currentIndex - 1];
    }
    return this.currentMusic;
  }

  addMusic(music: Music) {
    this.musicList.push(music);
    return this.musicList;
  }

  getMusicList() {
    return this.musicList;
  }

  getMusicByArtist(artist: string) {
    return this.musicList.find((music) => music.artist === artist);
  }

  // 요구사항
  // 1. 음악 리스트가 비어있을때 삭제를 하면 에러를 던진다. ㅇㅇ
  // 2. 삭제할 음악이 음악 리스트에 없으면 에러를 발생시킨다. ㅇㅇ
  // 3. 삭제할 음악이 음악 리스트에 있으면 해당 음악을 삭제하고 삭제된 음악을 리턴한다. ㅇㅇ
  removeMusic(music: Music) {
    if (this.musicList.length === 0) {
      throw new Error("음악 리스트가 비어있습니다.");
    }

    const found = this.musicList.find((m) => m === music);
    if (found === undefined) {
      throw new Error("삭제할 음악이 음악 리스트에 없습니다.");
    }

    const deleted = this.musicList.splice(this.musicList.indexOf(music), 1)[0];

    return deleted;
  }

  something(music: Music) {
    return `${music.title} + ${music.artist}`;
  }

  private somethingPrivate() {
    console.log("private");
  }

  addLengthWithCallback(music: Music, callback?: any) {
    console.log(music);

    if (callback) {
      callback(music);
    }

    this.somethingPrivate();

    return {
      title: music.title,
      artist: music.artist,
      length: Object.keys(music).length,
    };
  }

  giveIdToMusic(music: Music) {
    return {
      ...music,
      id: v4(),
    };
  }

  async noSuperShy(music: Music) {
    const regex = /super shy/gi;
    if (regex.test(music.title)) {
      return Promise.reject(new Error("Shy Boy Not Allowed"));
    }

    return Promise.resolve(music);
  }

  noMoreAttention(music: Music, callback: (err: any, music: Music) => void) {
    const regex = /attention/gi;
    if (regex.test(music.title)) {
      callback(new Error("Attention Not Allowed"), music);

      return;
    }

    callback(null, music);
  }
}

export const someFunction = () => {
  console.log("someFunction");
};
