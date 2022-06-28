import React from "react";

export class Narcos1Function extends React.Component{

        HandleChange=(e)=>{
            this.setState({SelectedData:e.target.value})
            var ar1=[]
            for(var episode of this.state.data._embedded.episodes){
                if(episode.season==e.target.value){
                    ar1.push(episode)
                }
                else if(e.target.value=="all"){
                    ar1.push(episode)
                }
            }
            console.log(ar1)
            this.setState({EpisodeData:ar1})       
        }
        OnClickSortAscendName=()=>{
            var ar2=this.state.data._embedded.episodes
            ar2.sort((a,b)=>
                a.name>b.name?1:-1)
            this.setState({EpisodeData:ar2})
        }
        OnClickSortDescendName=()=>{
            var ar2=this.state.data._embedded.episodes
            ar2.sort((a,b)=>
                a.name<b.name?1:-1)
            this.setState({EpisodeData:ar2})
        }
        OnClickSortAscendTime=()=>{
            var ar2=this.state.data._embedded.episodes
            ar2.sort((a,b)=>
                a.runtime>b.runtime?1:-1)
            this.setState({EpisodeData:ar2})
        }
        OnClickSortDescendTime=()=>{
            var ar2=this.state.data._embedded.episodes
            ar2.sort((a,b)=>
                a.runtime<b.runtime?1:-1)
            this.setState({EpisodeData:ar2})
        }

}