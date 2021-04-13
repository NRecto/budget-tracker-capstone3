import React, {useContext} from "react";
import LineChart from '../../../components/LineCharts';
import UserContext from '../../../UserContext';


export default function balanceTrend({data}) {
    
    const { user } = useContext(UserContext);

    const newData = data.filter( data => data.user === user.id)
    return (
        <React.Fragment>
            <LineChart rawData={newData} />
        </React.Fragment>
    )
}

export async function getStaticProps(){
    const res = await fetch('http://localhost:4000/api/ledger')
    const data = await res.json();

    return{
        props: {
            data
        }
    }
}