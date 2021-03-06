import React, {useState, useEffect} from 'react';
import Sidebar from '../components/Sidebar';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import FlastList from 'flatlist-react';

function Locations (){

    const sidebar = useSelector(state => state);
    const [pagintate, setPaginate] = useState(0);
    const [locations, setLocations] = useState([]);
    const [search, setSearch] = useState('');

    const getLocations = async ()=>{
        try {
            const { data } = await Axios.get(`https://pokeapi.co/api/v2/location/?limit=796&offset=0`);
            const newData = data.results.map((item,index)=>{
                return(
                    {
                        name: item.name,
                        id: index + 1
                    }
                )
            })
            setLocations(newData);   
        } catch (error) {
            console.error(error)
        }   
    }

    const nextPaginate = ()=>{
        setPaginate(pagintate + 10);
    }

    const previousPaginate = ()=>{
        setPaginate(pagintate - 10);
    }

    const getValueSearch = (e)=>{
        setSearch(e.target.value)
    }

    useEffect(()=>{
        getLocations();
    },[])

    return(
        <div className='page'>
            <Sidebar />
            <div className={sidebar ? 'content-page' : 'content-page-desactive'} >
                <div className='title'>
                    <h1>Locaciones</h1>
                </div>
                <div className='container body'>
                    <div className='row'>
                        <h6 className='offset-md-1 col-md-6'>Busqueda de locación</h6>
                        <input type='text' className='col-md-8 offset-md-1' id='search' placeholder='Buscar' onChange={getValueSearch} value={search}/>
                        <FlastList 
                            list={search != "" ? locations.filter((text) =>  text.name.toLowerCase().includes(search)) : locations}
                            renderItem={(item,index)=>{
                                if(search != ""){
                                    return(
                                        <div className='col-md-4 my-3' key={index}>
                                            <div className='card'>
                                                <h6>{item.name}</h6>
                                                <Link to={`/LocationMore/${item.id}`} >
                                                    <button className='btn btn-success btn-sm'> Ver mas</button>
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                }else{
                                    if(index >= pagintate && index < pagintate + 10){
                                        return(
                                            <div className='col-md-4 my-3' key={index}>
                                                <div className='card'>
                                                    <h6>{item.name}</h6>
                                                    <Link to={`/LocationMore/${item.id}`} >
                                                        <button className='btn btn-success btn-sm'> Ver mas</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
                <div className='container footer my-2'>
                    <h6 className='mx-3'>{search != "" ? "Todos los resultados" : "Resultados " + (pagintate + 1) + "-" + (pagintate + 10)}</h6>
                    <button className='btn btn-sm btn-primary' onClick={pagintate >= 10 ? previousPaginate : ()=>{}} disabled={search != "" ? true : false}> <AiIcons.AiOutlineArrowLeft /> </button>
                    <button className='btn btn-sm btn-primary mx-2' onClick={pagintate < 786 ?nextPaginate : ()=>{}} disabled={search != "" ? true : false}> <AiIcons.AiOutlineArrowRight /> </button>
                </div>
            </div >
        </div>
    );
}

export default Locations;