import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

import PreviewCardProduct from '../components/PreviewCardProduct';

import './Catalog.css'

class Catalog extends React.PureComponent{
    static propTypes={
        plantsArr: PropTypes.array.isRequired,
        pageNumber: PropTypes.string.isRequired,
        
    }

    state ={
        countOfPlantsOnOnePage: 60,
        filterPrice: "",
    }

    scrollTop = () => {
        window.scrollTo(0, 0);
    };

    showFilterPrice=(EO)=>{
        this.setState({filterPrice: this.newPriceRef.value})
    }

    newPriceRef = null;

    setPriceRef=(ref)=>{
        this.newPriceRef=ref
    }
    reset=()=>{
        this.setState({filterPrice: ""})
        this.newPriceRef.value=""

    }

    render(){
        let plantsArr=[...this.props.plantsArr];
        let plantsArrAfterFilter
        if (this.state.filterPrice){
            plantsArrAfterFilter=plantsArr.filter((plant, i)=>{
                if (plant.price <= this.state.filterPrice ){
                    return plant
                }
                    })
                } else {
                    plantsArrAfterFilter=plantsArr
                }

        let countOfAllPlants=plantsArrAfterFilter.length; //общее кол-во всех элементов 
        let pageLinksArr=[];
        let countOfAllPages=Math.ceil(countOfAllPlants/this.state.countOfPlantsOnOnePage); //общее кол-во  страниц
        for (let i=1; i<=countOfAllPages; i++){ //строим сами теги страниц
            pageLinksArr.push(<li key={i}><NavLink to={`/catalog/${i}`} key={i} className="PaginationLink" activeClassName="ActivePaginationLink">{i}</NavLink></li>)
        }

        let pageNumber=parseInt(this.props.pageNumber) //номер страницы

        let startIndex = (pageNumber-1) * this.state.countOfPlantsOnOnePage; // индекс первого элемента на странице (с какого?) номер страницы минус 1 * количество  элементов на странице
        let endIndex = startIndex + this.state.countOfPlantsOnOnePage //индекс последнего элемента на странице (по какой?) индекс первого товара на странице + кол-во товаров на странице

        let objsPlantOnOnePage = plantsArrAfterFilter.slice(startIndex, endIndex) // элементы на одной странице ( общее количество делим slice от и до НЕ ВКЛЮЧИТЕЛЬНО)

        let plantsArrCode=objsPlantOnOnePage.map( plant=> //все элементы которые отображаются на первой странице
            <PreviewCardProduct key={plant.code} info={plant} pageNumber={pageNumber}/>
            )

        return(
        <div className="Catalog">
            <div className="Filter">
                <div>
                    <label htmlFor="filterPrice" className="LabelFilterPrice">Цена до:</label>
                    <input type="text" name="filterPrice" className="InputFilterPrice"  ref={this.setPriceRef} ></input>
                </div>
                <input type="button" value="Показать Результат" className="FilterButtons" onClick={this.showFilterPrice}/>
                <input type="button" value="Сброс" className="FilterButtons" onClick={this.reset}/>
            </div>
            
            {
                (plantsArrCode.length>0)
                ?
                    <div>
                        <div className="CatalogPage">
                            {plantsArrCode}
                        </div>

                        <ul className="Pagination">
                            { pageLinksArr}
                        </ul>
                    </div>
                :
                    <h3 className="NullResults">Поиск не дал результатов.</h3>
            }
            
        </div>
        )
    }
}

export default withRouter(Catalog )