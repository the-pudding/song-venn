/* global d3 */
import loadData from './load-data'
import enterView from 'enter-view'
import * as Annotate from 'd3-svg-annotation';
import isMobile from './utils/is-mobile.js'
import truncate from './utils/truncate';
import howler from 'howler';

// dom variables
let width;
let height;
let fadedOpacity = 0
const mob = isMobile.any()
const howlerList = []
const howlerObj = {}
let currentlyPlayingSong;

function setupHowlerList() {

  const inTextSamples = [{
      artist_song: 'thong',
      song_url: `https://p.scdn.co/mp3-preview/c4b86b4adfe16bfbdad84d1dfbbec5a18ca297ed`
    },
    {
      artist_song: 'eternal',
      song_url: 'https://p.scdn.co/mp3-preview/c558bc461278efa0159e732a1eb8e314ed1758f9'
    }, {
      artist_song: 'cold',
      song_url: 'https://p.scdn.co/mp3-preview/0115e602f170e642fe3c1259650ab38fd3c8a0fc'
    }, {
      artist_song: 'stay',
      song_url: 'https://p.scdn.co/mp3-preview/395ea5f63e7c0375529493a5f4bf5c58a8ff73f0'
    }, {
      artist_song: 'reason',
      song_url: 'https://p.scdn.co/mp3-preview/b88392e350a215b5f6f4cf309b6ceabe925ec1a8'  
    }, {
      artist_song: 'smack',
      song_url: 'https://p.scdn.co/mp3-preview/0ac099ae429cd14e7424bb1d8921a02fc1b3ceeb'
    }, {
      artist_song: 'stayin',
      song_url: 'https://p.scdn.co/mp3-preview/3d1632a9d561aa44fd5d66eb766e002cb2acf6d0'
    }, {
      artist_song: 'low',
      song_url: 'https://p.scdn.co/mp3-preview/dd0a1e5d145ca7da0911584a6161cfe38d4bfa9b'
    }
  ]

  for (let i = 0; i < inTextSamples.length; i++) {
    howlerList[inTextSamples[i].artist_song] = new Howl({
      src: [`${inTextSamples[i].song_url}`],
      format: ['mpeg'],
      preload: false,
      autoUnlock: true,
      volume: 0
    });
  }
}



function setupHowlerPlayback() {

  function vennPlay(howlSong){

    Object.keys(howlerList).forEach(key => howlerList[key].stop());

    if (howlSong === currentlyPlayingSong) {
      howlerList[howlSong].stop()
      currentlyPlayingSong = null
      return
    }

    howlerList[howlSong].once('load', function () {
      howlerList[howlSong].fade(0, .5, 2000);
      howlerList[howlSong].play();
      currentlyPlayingSong = howlSong
    });
    howlerList[howlSong].load()
  }

  d3.selectAll('#cold-hearted').on('click', function(d,i,n) {
    const howlSong = "cold"
    vennPlay(howlSong)
  });

  d3.selectAll('#reason').on('click', function(d,i,n) {
    const howlSong = "reason"
    vennPlay(howlSong)
  });

  d3.selectAll('#stay').on('click', function(d,i,n) {
    const howlSong = "stay"
    vennPlay(howlSong)
  });

  d3.selectAll('#stayin').on('click', function(d,i,n) {
    const howlSong = "stayin"
    vennPlay(howlSong)
  });

  d3.selectAll('#smack').on('click', function(d,i,n) {
    const howlSong = "smack"
    vennPlay(howlSong)
  });

  d3.selectAll('#eternal-flame').on('click', function(d,i,n) {
    const howlSong = "eternal"
    vennPlay(howlSong)
  });

  d3.selectAll('#thong-song').on('click', function(d,i,n) {
    const howlSong = "thong"
    vennPlay(howlSong)
  });


  d3.selectAll('.howler-icon').on('click', function(d,i,n) {

    d3.selectAll('.howler-icon').classed("icon-play",false);
    const el = d3.select(this);
    const howlIcon = n[i]
    const howlSong = howlIcon.getAttribute('data-attribute')

    Object.keys(howlerList).forEach(key => howlerList[key].stop());

    if (howlSong === currentlyPlayingSong) {
      howlerList[howlSong].stop()
      currentlyPlayingSong = null
      return
    }

    howlerList[howlSong].once('load', function () {
      howlerList[howlSong].fade(0, .5, 2000);
      howlerList[howlSong].play();
      currentlyPlayingSong = howlSong
      console.log(el.node());
      el.classed("icon-play",true)
    });
    howlerList[howlSong].load()



  })

}

function init() {
  d3.xml('assets/images/sound.svg')
    .then(svg => {
      d3.selectAll('.howler-icon')
        .append('span')
        .attr('class', 'sound-icon-span')
        .nodes()
        .forEach(n => n.append(svg.documentElement.cloneNode(true)))
    })

  setupHowlerList();
  setupHowlerPlayback();
}

export default {
  init
};
