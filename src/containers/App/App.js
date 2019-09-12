import React, { Component } from 'react';
import axios from 'axios';
import axiosTiming from 'axios-timing';
import localStorage from 'local-storage';
import * as config from '../../config';
import ResultList from '../../components/ResultList/ResultList';
import Controls from '../../components/UI/PageControl/PageControl';
import Spinner from '../../components/UI/Spinner/Spinner';
import Search from '../../components/UI/Search/Search';
import { sortWorker } from '../../workers/SortWorkers';
import Sort from '../Sort/Sort';
import Palette from '../Palette/Palette';
import './App.css';
class App extends Component {
  state = {
    selectedTheme: null,
    isFirstSearch: true,
    searchResults: null,
    initialArray:null,
    searchInfo: null,
    totalPages: null,
    totalHits:null,
    totalSnippets:null,
    currentPage: null,
    loadingTime: null,
    loading: false
  }

  componentDidMount = () => {
    axiosTiming(axios, (time) => this.setState({loadingTime:(time/1000).toFixed(2)}));
  }

  searchHandler = () => {
    let query = document.getElementsByClassName('SearchBar')[0].value.replace(/ /g, '_');
    if(query !== ''){
      this.setState({isFirstSearch:false, loading:true});
      axios.get(config.searchURL + query)
          .then(res => {
            let results = res.data.query;
            if(results.search.length !== 0){
              results.search.map(el => el.url = config.redirectURL + el.pageid);
              let pageArray = sortWorker('relevance', false, results.search);
              this.setState({
                loading:false,
                initialArray:results.search,
                searchResults:pageArray,
                totalHits: results.searchinfo.totalhits,
                totalSnippets: results.search.length,
                totalPages: pageArray.length,
                currentPage:1 
              });
            }
            else{
              results = null
              this.setState({loading:false, searchResults:results});
            }
          })
          .catch(err => console.log(err));
      }
  }

  changePageHandler = (page) => {
    this.setState({currentPage:page});
  }

  changeThemeHandler = (color) => {
    localStorage.set('selectedTheme', color);
    this.setState({selectedTheme:color});
  }

  sortArrayHandler = (type, isDirectionChanged) => {
    let pageArray = sortWorker(type, isDirectionChanged, this.state.initialArray.slice(0));
    this.setState({searchResults:pageArray, totalPages:pageArray.length});
  }

  render() {
    let results = null;
    if(this.state.loading)
      results = <Spinner />;
    else if(this.state.searchResults !== null){
      results = 
      <div>
        <div className='info'>
          Всего результатов: {this.state.totalHits} ({this.state.loadingTime} сек.), показано:{this.state.totalSnippets}
        </div>
        <Sort data={this.state.searchResults} changed={this.sortArrayHandler}></Sort>
        <Controls totalpages={this.state.totalPages} pagechange={this.changePageHandler} current={this.state.currentPage}/>
        <ResultList data={this.state.searchResults[this.state.currentPage-1]} />
        <Controls totalpages={this.state.totalPages} pagechange={this.changePageHandler} current={this.state.currentPage}/>
      </div>
    }
    else if(!this.state.isFirstSearch)
      results = <div className='error'>По вашему запросу ничего не найдено:(</div>
    return (
      <div className={`App ${this.state.selectedTheme}`}>
        <Palette change={this.changeThemeHandler}/>
        <Search start={this.state.isFirstSearch} search={this.searchHandler}/>
        {results}
      </div>
    );
  }
}

export default App;