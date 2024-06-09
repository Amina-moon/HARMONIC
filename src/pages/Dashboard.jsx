import React from 'react'
import styled from 'styled-components'
import MusicCard from '../components/MusicCard';


export const DashboardMain = styled.div`
padding:20px 30px;
padding-bottom:200px;
height:100%;
overflow-y:auto;
dispaly:flex;
flex-direction:column;
gap:20px;

@media (max-width:760px){
  padding:6px 10px;
 
}

`;
export const FilterContainer = styled.div`
dispaly:flex;
flex-direction:column;
border-radius:10px;
padding:20px 30px;
background-color:${({ theme }) => theme.bg};



`;
export const Topic = styled.div`
color:${({ theme }) => theme.text_primary};
margin-bottom:8px;
font-size:24px;
font-weight:900;
display:flex;
justify-content:space-between;
align-items:center;
@media (max-width:760px){
  font-size:18px;
}



`;
const Dashboard = ({ isLoggedIn, setVisible, user }) => {

  return (
    <DashboardMain>
      
        <Topic>
         ANASHID
          
        </Topic>
        <MusicCard isLoggedIn={isLoggedIn} setVisible={setVisible} user={user} />
       
      
      
      
    </DashboardMain>
  )
}

export default Dashboard