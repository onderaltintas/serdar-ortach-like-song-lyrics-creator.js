function SongCreator() {
  this.firstPartWords = [
    ["YAR", "AH", "BAK", "OF", "HEY", "DELİYİM"],
    ["BU BEDEN", "YATAĞIM", "YÜREĞİM", "BU YAZ", "DÖRT YANIM", "RÜYALAR"],
    ["BUZ KESTİ", "ÖZLER SENİ", "ALEV ALEV", "TOZ DUMAN", "KAVRULDU", "DELİK DEŞİK"]
  ];
  this.secondPartWords = [
    ["BİTTİM", "GİTTİN", "SENSİZ", "ŞİMDİ", "YALNIZ", "SONUNDA"],
    ["OLDUM", "GÖNÜL", "CANIM", "DÜNYAM", "RUHUM", "AKLIM"],
    ["DİVANE", "AVARE", "VİRANE", "BİÇARE", "AMADE", "PERVANE"]
  ];
  this.chorusWords = [
    ["E HADİ", "KIZ SEN", "BU GECE", "A CANIM", "DELİ YAR", "SEBEBİM"],
    ["FİKRİMİ", "TENİMİ", "AŞKIMI", "KALBİMİ", "ÖMRÜMÜ", "SEVDAMI"],
    ["BENDEN ÇAL", "SÜRGÜNE SAL", "YOLLARA VUR", "DAĞIT,SAVUR", "ATEŞE AT", "RUHUNA KAT"]
  ];
  
  this.kareokeSong = document.createElement('audio');
  this.kareokeSong.setAttribute('src', 'assets/referenceMusicKareoke.mp3');
}

/*Creating lyrics style is up to coder. This part is subject to change. It is not 4,4,2*/
SongCreator.prototype.createLyrics = function() {
  var firstPart = [];
  var secondPart = [];
  var chorus = [];

  for (var i = 0; i < 4; i++) {
    firstPart.push(createSentence(this.firstPartWords));
  }

  for (var i = 0; i < 4; i++) {
    secondPart.push(createSentence(this.secondPartWords));
  }

  for (var i = 0; i < 2; i++) {
    chorus.push(createSentence(this.chorusWords));
  }

  return [firstPart, secondPart, chorus];
}

SongCreator.prototype.reset = function() {
  this.resetSong()
  document.getElementById("placeForLyrics").innerHTML = "";
}

SongCreator.prototype.start = function() {
  this.reset();
  var lyricsArray = this.createLyrics();
  addToPage(lyricsArray);
  this.playSong();
  kareoke(lyricsArray);
  window.scrollTo(0, document.body.scrollHeight);
}

SongCreator.prototype.playSong = function() {
  this.kareokeSong.play()
}

SongCreator.prototype.resetSong = function() {
  this.kareokeSong.pause()
  this.kareokeSong.currentTime = 0
}

function createSentence(sentenceParts) {
  var sentence = [];
  for (var i = 0; i < sentenceParts.length; i++) {
    var words = sentenceParts[i];
    var chosenWord = words[getRandom(words.length)];
    sentence.push(chosenWord);
  }

  return sentence;
}

function addToPage(lyricsArray) {
  var placeForLyrics = document.getElementById("placeForLyrics");
  var wordCounter = 0;
  for (var partNo = 0; partNo < lyricsArray.length; partNo++) {
    var sentences = lyricsArray[partNo];
    for (var sentenceNo = 0; sentenceNo < sentences.length; sentenceNo++) {
      var words = sentences[sentenceNo];
      for (var wordNo = 0; wordNo < words.length; wordNo++) {
        var wordDom = createWordDom(words[wordNo], "word" + wordCounter);
        placeForLyrics.appendChild(wordDom);
        wordCounter++;
      }

      placeForLyrics.appendChild(document.createElement("br"));
    }
    placeForLyrics.appendChild(document.createElement("br"));
    placeForLyrics.appendChild(document.createElement("br"));
  }
}

function createWordDom(word, domId) {
  var wDom = document.createElement("span");
  wDom.id = domId;
  wDom.classList.add("kareokeWord");
  wDom.innerHTML = word + "&nbsp";
  return wDom;
}

function kareoke(lyricsArray) {
  var kareokeStartTime = 10000;
  setTimeout(function() {
    startKareoke(lyricsArray);
  }, kareokeStartTime);
}

function startKareoke(lyricsArray) {
  var wordCount = 0;
  var delay = 1500;
  for (var i = 0; i < lyricsArray.length; i++) {
    for (var j = 0; j < lyricsArray[i].length; j++) {
      for (var k = 0; k < lyricsArray[i][j].length; k++) {
        wordCount++;
      }
    }
  }

  var currentWord = 0;

  function enlightWord(wordNo) {
    var previousWordNo = wordNo - 1 < 0 ? wordCount - 1 : wordNo - 1;
    document.getElementById("word" + previousWordNo).classList.remove("kareokeWordEnlight");;
    document.getElementById("word" + wordNo).classList.add("kareokeWordEnlight");
    wordNo = (wordNo + 1) % wordCount;
    setTimeout(function() {
      enlightWord(wordNo)
    }, delay);
  }

  enlightWord(currentWord);
}

function getRandom(maxNumber) {
  return Math.round(Math.random() * (maxNumber - 1))
}

var sc = new SongCreator();

document.getElementById("createButton").onclick = function() {
  sc.start();
}

document.getElementById("resetButton").onclick = function() {
  sc.reset();
}