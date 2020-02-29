import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let defaultStyle = {
  color: '#282c34'
};
let fakeServerData = {
  user: {
    name: 'Aanchal',
    playlists: [
      {
        name: 'My favorites',
        songs: [
        {name:'BonBon', duration: 1345},
        {name:'Alone Pt2',duration: 1236},
        {name:'Despacito',duration:7000}
      ]
      },
      {
        name: 'Electric',
        songs: [
        {name:'Bad Boy', duration:1345},
        {name: 'Sucker', duration:1236},
        {name:'16 Shots',duration:7000}
      ]
      },
      {
        name: 'Slow',
        songs: [
        {name:'Thoushand years',duration:1345},
        {name:'Attention',duration:1236},
        {name:'Beautiful',duration:7000}
      ]
      },
      {
        name: 'Pop',
        songs: [
        {name:'Addicted', duration:1345},
        {name:'Ghost Town',duration:1236},
        {name:'Never close our eyes',duration:7000}
      ]
      }
    ]
  }
}
class PlaylistCounter extends Component{
  render(){
    return(
      <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
        <h2>{this.props.playlists && this.props.playlists.length} Playlist</h2>
      </div>
    );     
  }
}
class Hours extends Component{
  render(){
    let allsongs = this.props.playlists.reduce((songs, eachPlaylist)=> {
      return songs.concat(eachPlaylist.songs)
    }, [])
    let totalduration = allsongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    },0)
    return(
      <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
        <h2>{Math.round(totalduration/60)} hours</h2>
      </div>
    );     
  }
}

class Filter extends Component {
  render(){
    return(
      <div style={defaultStyle}>
        <img/>
        <input type="text" onKeyUp={event => 
          this.props.onTextChange(event.target.value)}/>
        Filter
      </div>
    );
  }
}
class Playlist extends Component{
  render(){
    let playlist = this.props.playlist
    return(
      <div style={{...defaultStyle, display: 'inline-block', width: "25%"}}>
        <img />
        <h3>{playlist.name} </h3>
        <ul>
          {playlist.songs.map(song =>
            <li>{song.name}</li>
            )}
          </ul>
      </div>
    );
  }
}

class App extends Component {  
  constructor() {
    super();
    this.state= {
      serverData: {},
      filterString: ''
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    },1000);  
  }
  render(){
    let playlistToRender = this.state.serverData.user ? this.state.serverData.user.playlists
    .filter(playlist =>
      playlist.name.toLowerCase().includes(
        this.state.filterString.toLowerCase())
    ) : []
    return (
      <div className="App">
        {this.state.serverData.user ?
      <div>
          <h1 style={{...defaultStyle, 'font-size': '54px'}}>
            {this.state.serverData.user.name}'s Dulcet Beats
          </h1>
          <PlaylistCounter playlists= {playlistToRender}/>
          <Hours playlists= {playlistToRender}/>
          <Filter onTextChange={text => this.
            setState({filterString: text
            })}/>
          {playlistToRender.map(playlist =>
            <Playlist playlist={playlist} />
            )}      
      </div> : <h1 style={{defaultStyle,}}>Loading...</h1>
      }
      </div>
    );
  }
}        
export default App;
