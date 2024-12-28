import { Music, MusicPlayer, someFunction } from "./music";

jest.mock("uuid", () => ({
  v4: () => 1,
}));

// jest mock 테스트를 위해서 대체함
// module에서 import 해오는 것들을 대체합니다.
jest.mock("./music", () => ({
  ...jest.requireActual("./music"),
  someFunction: jest.fn(),
}));

describe("music player 클래스 테스트", () => {
  describe("add Length with Callback", () => {
    it("음악을 넣으면 length가 추가된다.", () => {});
    it("음악을 넣으면 callback이 호출된다.", () => {});
  });

  describe("giveIdToMusic", () => {
    it("음악을 넣으면 id가 추가된다.", () => {});
  });

  let musicPlayer: MusicPlayer;

  // Fake Object
  // 테스트 위해 썼던 데이터
  const music: Music = {
    artist: "뉴진스",
    genre: "팝",
    releaseDate: "2023-01-01",
    title: "hype boy",
  };

  // BeforeEach, AfterEach

  // hook
  beforeEach(() => {
    // 공유자원,중복 코드,인스턴스 등 초기화
    musicPlayer = new MusicPlayer([]);
  });

  afterEach(() => {
    // mocking 초기화
    jest.clearAllMocks();
  });

  // BeforeAll
  //BeforeEach
  it("음악을 추가하면 음악 리스트에 추가된다.", () => {
    // Arrange

    const output = [music];

    // Act 음악을 추가해봄
    const actual = musicPlayer.addMusic(music);

    // toBe가 아니라 toEqual을 사용해야 함
    // toBe는 객체의 주소값을 비교하기 때문에 실패함
    // toBe 원시값 비교
    // toEqual 객체,배열 비교
    // toBe, toEqual,toThrow => "matcher";
    expect(actual).toEqual(output);

    // expect(actual).toHaveLength(1);
    // expect(actual).not.toEqual([]);
    // expect(actual).not.toHaveLength(0);
    // expect(actual).toContain(newMusic);
  });
  // AfterEach

  it("음악을 넣고 getMusicList를 호출하면 음악 리스트를 반환한다.", () => {
    // Arrange

    musicPlayer.addMusic(music);
    const output = [music];

    // Act
    const actual = musicPlayer.getMusicList();

    // Assert
    expect(actual).toEqual(output);
  });

  it("addMusic을 호출하지 않고 getMusicList를 호출하면 빈 배열을 반환한다.", () => {
    const actual = musicPlayer.getMusicList();

    expect(actual).toEqual([]);
  });

  it("음악을 추가하고 아티스트로 검색을 할 수 있다", () => {
    // arrange
    musicPlayer.addMusic(music);

    // act
    const actual = musicPlayer.getMusicByArtist(music.artist);

    // assert
    expect(actual).toEqual(music);
  });

  it("음악을 추가하지 않고 아티스트로 검색을 할 수 없다", () => {
    // arrange

    // act
    const actual = musicPlayer.getMusicByArtist(music.artist);

    // assert
    expect(actual).toBeUndefined();
  });

  it("playMusic을 호출하면 현재 음악이 바뀐다.", () => {
    // arrange
    musicPlayer.playMusic(music);

    //act
    const actual = musicPlayer.getCurrentMusic();

    // assert
    expect(actual).toEqual(music);
  });

  it("음악을 재생하지 않고 현재음악을 호출하면 null이 반환된다.", () => {
    // arrange
    // 없음

    // act
    const acutal = musicPlayer.getCurrentMusic();

    // assert
    expect(acutal).toBeNull();
  });

  it("음악을 재생하면 현재 음악을 리턴한다.", () => {
    // arrange

    const actual = musicPlayer.playMusic(music);

    expect(actual).toEqual(music);
  });

  it("음악을 재생하다가 멈추면 null이 리턴됩니다.", () => {
    // arrange
    musicPlayer.playMusic(music);

    // act
    const actual = musicPlayer.stopMusic();

    // assert
    expect(actual).toBeNull();
  });

  it("음악이 재생중이 않을때 nextMusic을 호출하면 에러가 발생한다", () => {
    // arrange

    expect(() => musicPlayer.nextMusic()).toThrow();
  });

  it("nextMusic을 호출하면 다음 음악이 재생된다", () => {
    // arrange
    const firstMusic: Music = {
      artist: "뉴진스",
      genre: "팝",
      releaseDate: "2023-01-01",
      title: "첫번째 음악",
    };

    const secondMusic: Music = {
      artist: "뉴진스",
      genre: "팝",
      releaseDate: "2023-01-01",
      title: "두번째 음악",
    };

    const thirdMusic: Music = {
      artist: "뉴진스",
      genre: "팝",
      releaseDate: "2023-01-01",
      title: "세번째 음악",
    };
    // musicList 음악추가 ( 초기화 ) [firstMusic,secondMusic,thirdMusic]
    musicPlayer.addMusic(firstMusic);
    musicPlayer.addMusic(secondMusic);
    musicPlayer.addMusic(thirdMusic);
    // 첫번째 음악 재생  currentMusic = firstMusic
    musicPlayer.playMusic(firstMusic);

    // act
    const actual = musicPlayer.nextMusic();

    // assert
    expect(actual).toEqual(secondMusic);
  });

  it("마지막 음악을 재생중일때 nextMusic을 호출하면 첫번째 음악이 재생된다.", () => {
    const firstMusic: Music = {
      artist: "뉴진스",
      genre: "팝",
      releaseDate: "2023-01-01",
      title: "첫번째 음악",
    };

    const secondMusic: Music = {
      artist: "뉴진스",
      genre: "팝",
      releaseDate: "2023-01-01",
      title: "두번째 음악",
    };

    const thirdMusic: Music = {
      artist: "뉴진스",
      genre: "팝",
      releaseDate: "2023-01-01",
      title: "세번째 음악",
    };

    musicPlayer.addMusic(firstMusic);
    musicPlayer.addMusic(secondMusic);
    musicPlayer.addMusic(thirdMusic);

    musicPlayer.playMusic(thirdMusic);

    // --- 여기까지 arrange

    // act firstMusic이어야함
    const actual = musicPlayer.nextMusic();

    // assert
    expect(actual).toEqual(firstMusic);
  });

  it("첫번째 음악을 재생중 일 때, prevMusic을 호출하면 가장 뒤에 있는 음악이 재생된다.", () => {
    // arrange
    const firstMusic: Music = {
      artist: "뉴진스",
      genre: "POP",
      releaseDate: "2017-01-01",
      title: "Attention",
    };

    const secondMusic: Music = {
      artist: "뉴진스",
      genre: "POP",
      releaseDate: "2017-01-01",
      title: "Hype Boy",
    };

    const thirdMusic: Music = {
      artist: "뉴진스",
      genre: "POP",
      releaseDate: "2017-01-01",
      title: "Cookie",
    };

    musicPlayer.addMusic(firstMusic);
    musicPlayer.addMusic(secondMusic);
    musicPlayer.addMusic(thirdMusic);
    musicPlayer.playMusic(firstMusic);

    // act
    const actual = musicPlayer.prevMusic();

    // assert
    expect(actual).toEqual(thirdMusic);
  });

  // 에러, 예외부터 테스트 코드 작성
  it("음악 리스트가 비어있을때 삭제를 하면 에러를 던진다.", () => {
    const musicToDelete: Music = {
      artist: "뉴진스",
      genre: "POP",
      releaseDate: "2017-01-01",
      title: "Attention",
    };

    expect(() => musicPlayer.removeMusic(musicToDelete)).toThrow();
  });

  it("삭제할 음악이 음악 리스트에 없으면 에러를 던진다.", () => {
    const firstMusic: Music = {
      artist: "뉴진스",
      genre: "POP",
      releaseDate: "2017-01-01",
      title: "Attention",
    };

    const secondMusic: Music = {
      artist: "뉴진스",
      genre: "POP",
      releaseDate: "2017-01-01",
      title: "Hype Boy",
    };

    const thirdMusic: Music = {
      artist: "뉴진스",
      genre: "POP",
      releaseDate: "2017-01-01",
      title: "Cookie",
    };

    musicPlayer.addMusic(firstMusic);
    musicPlayer.addMusic(secondMusic);
    musicPlayer.addMusic(thirdMusic);

    const musicToDelete: Music = {
      artist: "뉴진스",
      genre: "POP",
      releaseDate: "2017-01-01",
      title: "Super Shy",
    };

    expect(() => musicPlayer.removeMusic(musicToDelete)).toThrow();
  });

  it("삭제할 음악이 음악 리스트에 있으면 음악이 삭제되고 삭제한 음악을 리턴한다", () => {
    const firstMusic: Music = {
      artist: "뉴진스",
      genre: "POP",
      releaseDate: "2017-01-01",
      title: "Attention",
    };

    const secondMusic: Music = {
      artist: "뉴진스",
      genre: "POP",
      releaseDate: "2017-01-01",
      title: "Hype Boy",
    };

    const thirdMusic: Music = {
      artist: "뉴진스",
      genre: "POP",
      releaseDate: "2017-01-01",
      title: "Cookie",
    };

    musicPlayer.addMusic(firstMusic);
    musicPlayer.addMusic(secondMusic);
    musicPlayer.addMusic(thirdMusic);

    // -- 여기까지 arrange

    // act

    const actual = musicPlayer.removeMusic(thirdMusic);

    expect(actual).toEqual(thirdMusic);
    expect(musicPlayer.getMusicList()).not.toContain(thirdMusic);
  });

  it("something test", () => {
    // Fake 데이터 완전한 객체
    const firstMusic: Music = {
      artist: "뉴진스",
      genre: "POP",
      releaseDate: "2017-01-01",
      title: "Attention",
    };

    // 일부 필드만 존재
    const stub: Pick<Music, "artist" | "title"> = {
      title: "title",
      artist: "artist",
    };

    const actual = musicPlayer.something(stub as any);
  });

  it("printWithCallback test", () => {
    // mock 함수
    // 함수는 함수인데, 무슨일을 하는지 딱히 구현은 없음
    // 근데 파라미터로 넣어서 이 함수에 대한 여러가지를 테스트 할 수 있음
    const callbackMock = jest.fn();

    // Fake 함수
    // const actual = musicPlayer.addLengthWithCallback(music, (music) => {});

    // mocking
    const actual = musicPlayer.addLengthWithCallback(music, callbackMock);

    // expect(actual).toEqual({
    //   title: music.title,
    //   artist: music.artist,
    //   length: Object.keys(music).length,
    // });

    // // mocking 함수가 내부적으로 트래킹을 하고 있어서 그것을 테스트 할 수 있음
    // expect(callbackMock).toHaveBeenCalled();
    // expect(callbackMock).toHaveBeenCalledWith(music);
  });

  it("give id to Music", () => {
    const music: Music = {
      artist: "뉴진스",
      genre: "팝",
      releaseDate: "2023-01-01",
      title: "hype boy",
    };
    // uuid mocking
    // import 하는 모듈을 모킹 -> 실제 객체가 아니라 다른 객체로 바꿔치기

    const actual = musicPlayer.giveIdToMusic(music);

    expect(actual).toEqual({
      ...music,
      id: 1,
    });
  });

  it("add length with callback 로그 잘 뜨는지 확인", () => {
    const logSpy = jest.spyOn(console, "log");
    const musicSpy = jest.spyOn(musicPlayer as any, "somethingPrivate");

    const actual = musicPlayer.addLengthWithCallback(music);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(music);
    expect(musicSpy).toHaveBeenCalled();
  });

  it("Promise 함수 테스트 - 성공", () => {
    const music: Music = {
      artist: "뉴진스",
      genre: "팝",
      releaseDate: "2023-01-01",
      title: "Attention",
    };

    return musicPlayer.noSuperShy(music).then((actual) => {
      expect(actual).toEqual(music);
    });
  });

  it("Promise 함수 테스트 - 실패", () => {
    const music: Music = {
      artist: "뉴진스",
      genre: "팝",
      releaseDate: "2023-01-01",
      title: "Super Shy",
    };

    return musicPlayer
      .noSuperShy(music)
      .then((actual) => {
        expect(actual).toEqual(music);
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Shy Boy Not Allowed");
      });
  });

  it("Async/ Await 방식 프로미스트 테스트 - 성공", async () => {
    // Fake Object
    const music: Music = {
      artist: "뉴진스",
      genre: "팝",
      releaseDate: "2023-01-01",
      title: "Attention",
    };

    const actual = await musicPlayer.noSuperShy(music);
    expect(actual).toEqual(music);

    await expect(musicPlayer.noSuperShy(music)).resolves.toEqual(music);
  });

  it("Async/ Await 방식 프로미스트 테스트 - 실패", async () => {
    const music: Music = {
      artist: "뉴진스",
      genre: "팝",
      releaseDate: "2023-01-01",
      title: "Super Shy",
    };
    try {
      await musicPlayer.noSuperShy(music);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Shy Boy Not Allowed");
    }

    await expect(musicPlayer.noSuperShy(music)).rejects.toThrow();
  });

  it("callback 함수 테스트 성공", (done) => {
    const music: Music = {
      artist: "뉴진스",
      genre: "팝",
      releaseDate: "2023-01-01",
      title: "Super Shy",
    };
    const callback = (err: any, music: Music) => {
      if (err) {
        console.log("에러");
        console.log(err);
        return;
      }

      console.log("성공");
      console.log(music);
      expect(music.title).toBe("Super Shy");
      done();
    };

    musicPlayer.noMoreAttention(music, callback);
  });
  it("callback 함수 테스트 실패", (done) => {
    const music: Music = {
      artist: "뉴진스",
      genre: "팝",
      releaseDate: "2023-01-01",
      title: "attention",
    };
    const callback = (err: any, music: Music) => {
      if (err) {
        console.log("에러");
        console.log(err);
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe("Attention Not Allowed");
        done();
        return;
      }

      console.log("성공");
      console.log(music);
      expect(music.title).toBe("Super Shy");
      done();
    };

    musicPlayer.noMoreAttention(music, callback);
  });
});
