import React from "react";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { Button } from "react-bootstrap"
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { SearchRounded } from "@mui/icons-material";
import "./narcos1.css"
import parse from 'html-react-parser'

import { Narcos1Function } from "./narcos1Functions";
export default class Narcos extends React.Component {
    constructor() {
        super()
        this.state = {
            data: {},
            NumberOfSeason: [],
            EpisodeData: [],
            SelectedData: {},
            SearchResult: {},
            Searched: [],
        }
    }
    componentDidMount() {
        fetch("http://api.tvmaze.com/singlesearch/shows?q=narcos&embed=episodes")
            .then(val => val.json())
            .then(value => {
                this.setState({ data: value })
                var arr = []
                for (var x of value._embedded.episodes) {
                    if (!arr.includes(x.season)) {
                        arr.push(x.season)
                    }
                }
                this.setState({ NumberOfSeason: arr })
                this.setState({ EpisodeData: value._embedded.episodes })
            })
    }
    HandleChange = (e) => {
        this.setState({ SelectedData: e.target.value })
        var ar1 = []
        for (var episode of this.state.data._embedded.episodes) {
            if (episode.season == e.target.value) {
                ar1.push(episode)
            }
            else if (e.target.value == "all") {
                ar1.push(episode)
            }
        }
        console.log(ar1)
        this.setState({ EpisodeData: ar1 })
    };
    OnClickSortAscendName = () => {
        var ar2 = this.state.EpisodeData
        ar2.sort((a, b) =>
            a.name > b.name ? 1 : -1)
        this.setState({ EpisodeData: ar2 })
    }
    OnClickSortDescendName = () => {
        var ar2 = this.state.EpisodeData
        ar2.sort((a, b) =>
            a.name < b.name ? 1 : -1)
        this.setState({ EpisodeData: ar2 })
    }
    OnClickSortAscendTime = () => {
        var ar2 = this.state.EpisodeData
        this.state.EpisodeData.sort((a, b) =>
            a.runtime > b.runtime ? 1 : -1)
        this.setState({ EpisodeData: ar2 })
    }
    OnClickSortDescendTime = () => {
        var ar2 = this.state.EpisodeData
        ar2.sort((a, b) =>
            a.runtime < b.runtime ? 1 : -1)
        this.setState({ EpisodeData: ar2 })
    }
    HandleChangeSearch = (e) => {
        this.setState({ SearchResult: e.target.value })
    }
    OnClickSearch = () => {
        var ar = []
        var ar2 = ""
        {
            this.state.EpisodeData.map((e) => {
                if (e.name.toLowerCase().includes(this.state.SearchResult.toLowerCase()) ||
                    e.summary.toLowerCase().includes(this.state.SearchResult.toLowerCase())) {
                    ar.push(e.season, ".", e.number, " ", e.name, <br />)
                }
            })
        }
        if (ar.length == 0) {
            ar.push("Word you are looking for not found")
        }
        this.setState({ Searched: ar })
    }
    render() {
        const Item = styled(Paper)(({ theme }) => ({
            backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            ...theme.typography.body2,
            padding: theme.spacing(1),
            color: theme.palette.text.secondary,
        }));
        return (
            <>
                <div className="nrcsback">
                    {
                        Object.keys(this.state.data).length > 0 ?
                            <div>
                                <Grid container spacing={2}>
                                    <Grid item xs={7}>
                                    </Grid>
                                    <Grid item xs={5}><br />
                                        Search Here &nbsp;
                                        <input type='text' onChange={this.HandleChangeSearch} />&nbsp;
                                        <Button onClick={this.OnClickSearch}><SearchRounded color="dark"
                                            fontSize="large" /></Button><br /><br />
                                        <h4>{this.state.Searched}</h4><br />
                                    </Grid>
                                </Grid>
                                <h1>{this.state.data.name}🎥</h1><br />

                                <select value={this.state.SelectedData} onChange={this.HandleChange}>
                                    <option value="all">All Season</option>
                                    {this.state.NumberOfSeason.map((e) => {
                                        return (<option value={e}>
                                            Season {e}
                                        </option>)
                                    })}
                                </select>&nbsp;
                                {this.state.data.premiered.split("-")[0]}<br /><br />
                                <Button><PlayArrowIcon fontSize="large" />Episode 9<br /> Watch Again</Button>&nbsp;
                                <AddCircleIcon fontSize="large" color="disabled" />
                                <CelebrationIcon fontSize="large" color="disabled" /><br /><br />
                                {parse(this.state.data.summary)}<br /><br />
                                Genres:         {this.state.data.genres}<br />
                                Audio Language: {this.state.data.language}<br /><br /><br />
                                <Grid container spacing={2}>
                                    <Grid item xs={2}>
                                        Sort <br />
                                    </Grid>
                                    <Grid item xs={8}>
                                        Name:&nbsp;
                                        <Button variant="success" onClick={this.OnClickSortAscendName}>A→Z</Button>&nbsp;
                                        <Button variant="success" onClick={this.OnClickSortDescendName}>Z→A</Button>&nbsp;
                                        Runtime:&nbsp;
                                        <Button variant="success" onClick={this.OnClickSortAscendTime}>0→9</Button>&nbsp;
                                        <Button variant="success" onClick={this.OnClickSortDescendTime}>9→0</Button>
                                    </Grid>
                                </Grid><br />
                                {this.state.EpisodeData.map((e) => {
                                    return <>
                                        <Grid container spacing={2} className="nrcsepi">
                                            <Grid item xs={3}>
                                                <img src={e.image.medium} alt="narcos_episode_image"></img>
                                            </Grid>
                                            <Grid item xs={9}>
                                                <h4><PlayCircleIcon color="primary" fontSize="large" />
                                                    {e.season}.{e.number}.{e.name}</h4>
                                                {e.airdate}&nbsp;{e.runtime}&nbsp;{'\u1F51E'}<br />
                                                {parse(e.summary)}<h5 color="blue">Watch Party</h5><br /><br />
                                            </Grid>
                                        </Grid>
                                    </>
                                })}
                            </div> : <div><h3>Try Again </h3></div>
                    }</div>
            </>)
    }
}
