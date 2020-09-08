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
      artist_song: 'no-diggity',
      song_url: `https://p.scdn.co/mp3-preview/d887520d295cec271b8396b4c131f5f55348c3a3`
    },
    {
      artist_song: 'the-sign',
      song_url: 'https://p.scdn.co/mp3-preview/304efabb42448c99202a7659e43b502a6324d981'
    }, {
      artist_song: 'wild-wild-west',
      song_url: 'https://p.scdn.co/mp3-preview/3adf0f00d728e3ab23c7dd167dbaedfdcd2ef6fe'
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
